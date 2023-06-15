import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomizePasteElements from './utils/PasteThemeProvider';
import addCapacityToWorkerCanvas from './flex-hooks/components/WorkerCanvas'
const PLUGIN_NAME = 'SupervisorCapacity';

export default class SupervisorCapacity extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof Flex }
   */
  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    const initializers = [
      CustomizePasteElements,
      addCapacityToWorkerCanvas
    ];

    initializers.forEach((initializer) => initializer(flex, manager));
  }
}
