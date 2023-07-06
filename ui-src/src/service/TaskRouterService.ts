import ApiService from './ApiService';
import { EncodedParams } from '../types/Params';
import { ErrorManager, FlexPluginErrorType } from '../utils/ErrorManager';

interface GetWorkerChannelsResponse {
  success: boolean;
  workerChannels: Array<WorkerChannelCapacityResponse>;
}

export interface WorkerChannelCapacityResponse {
  accountSid: string;
  assignedTasks: number;
  available: boolean;
  availableCapacityPercentage: number;
  configuredCapacity: number;
  dateCreated: string;
  dateUpdated: string;
  sid: string;
  taskChannelSid: string;
  taskChannelUniqueName: string;
  workerSid: string;
  workspaceSid: string;
  url: string;
}
interface UpdateWorkerChannelResponse {
  success: boolean;
  message?: string;
  workerChannelCapacity: WorkerChannelCapacityResponse;
}

class TaskRouterService extends ApiService {
  getWorkerChannels = async (workerSid: string): Promise<Array<WorkerChannelCapacityResponse>> => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        workerSid: encodeURIComponent(workerSid),
        Token: encodeURIComponent(this.manager.user.token),
      };

      this.fetchJsonWithReject<GetWorkerChannelsResponse>(
        `${this.serverlessDomain}/supervisorCapacity/get-worker-channels`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      )
        .then((response: GetWorkerChannelsResponse) => {
          if (response && response.workerChannels) {
            resolve(response.workerChannels);
          }
          resolve([]);
        })
        .catch((e) => {
          console.error(`Could not get worker channel for the worker ${workerSid}`, e);
          ErrorManager.createAndProcessError(`Could not get worker channel for the worker ${workerSid}\r\n`, {
            type: FlexPluginErrorType.serverless,
            description:
              e instanceof Error ? `${e.message}` : `Could not get worker channel for the worker ${workerSid}\r\n`,
            context: 'Plugin.TaskRouterService',
            wrappedError: e,
          });
          reject(e);
        });
    });
  };

  updateWorkerChannel = async (
    workerSid: string,
    workerChannelSid: string,
    capacity: number,
    available: boolean,
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const encodedParams: EncodedParams = {
        Token: encodeURIComponent(this.manager.user.token),
        workerSid: encodeURIComponent(workerSid),
        workerChannelSid: encodeURIComponent(workerChannelSid),
        capacity: encodeURIComponent(capacity),
        available: encodeURIComponent(available),
      };

      return this.fetchJsonWithReject<UpdateWorkerChannelResponse>(
        `${this.serverlessDomain}/supervisorCapacity/update-worker-channel`,
        {
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: this.buildBody(encodedParams),
        },
      )
        .then((response: UpdateWorkerChannelResponse) => {
          resolve(response.success);
        })
        .catch((e) => {
          console.error(`Could not update worker channels for the worker ${workerSid}`, e);
          ErrorManager.createAndProcessError(`Could not update worker channels for the worker ${workerSid}\r\n`, {
            type: FlexPluginErrorType.serverless,
            description:
              e instanceof Error ? `${e.message}` : `Could not update worker channels for the worker ${workerSid}\r\n`,
            context: 'Plugin.TaskRouterService',
            wrappedError: e,
          });
          reject(e);
        });
    });
  };
}

export default new TaskRouterService();
