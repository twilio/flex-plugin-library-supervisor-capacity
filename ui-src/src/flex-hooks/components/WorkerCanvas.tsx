import * as Flex from '@twilio/flex-ui';

import CapacityContainer from '../../components/CapacityContainer/CapacityContainer';

export default function addCapacityToWorkerCanvas(flex: typeof Flex, _manager: Flex.Manager) {
  flex.WorkerCanvas.Content.add(<CapacityContainer key="worker-capacity-container" />);
}
