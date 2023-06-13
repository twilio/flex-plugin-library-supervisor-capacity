import * as Flex from '@twilio/flex-ui';
import packageJSON from '../../package.json';

const flexManager = window?.Twilio?.Flex?.Manager?.getInstance();

export enum FlexPluginErrorType {
  action = 'ActionFramework',
  serverless = 'Serverless',
  programabelComponents = 'ProgramableComponents',
}

export enum FlexErrorSeverity {
  normal = 'normal',
  severe = 'severe',
}

export type FlexPluginErrorContents = {
  type?: FlexPluginErrorType | string;
  wrappedError?: Error | string | unknown;
  context?: string;
  description?: string;
  severity?: FlexErrorSeverity;
};

export class FlexPluginError extends Error {
  public content: FlexPluginErrorContents & {
    type: FlexPluginErrorType | string;
    severity: FlexErrorSeverity;
  };

  public time: Date;

  constructor(message: string, content: FlexPluginErrorContents = {}) {
    super(message);
    this.content = {
      ...content,
      type: content.type || 'LibraryPlugin',
      severity: content.severity || FlexErrorSeverity.normal,
    };
    this.time = new Date();
    Object.setPrototypeOf(this, FlexPluginError.prototype);
  }
}

class ErrorManagerImpl {
  public processError(error: FlexPluginError, showNotification: boolean): FlexPluginError {
    try {
      console.log(`Library Plugin: ${error}\nType: ${error.content.type}\nContext:${error.content.context}`);
      const pluginError = new Flex.FlexError(error.message, {
        plugin: { name: packageJSON.name, version: packageJSON.version },
        description: error.content.description,
      });
      if (flexManager?.reportErrorEvent) {
        flexManager.reportErrorEvent(pluginError);
      }
      if (showNotification) {
        Flex.Notifications.showNotification('LibraryPlugin', {
          error: error,
        });
      }
    } catch (e) {
      // Do not throw, let's avoid Inceptions
    }

    return error;
  }

  public createAndProcessError(
    message: string,
    content: FlexPluginErrorContents = {},
    showNotification: boolean = true,
  ): FlexPluginError {
    const error = new FlexPluginError(message, content);
    return this.processError(error, showNotification);
  }
}

export const ErrorManager = new ErrorManagerImpl();
