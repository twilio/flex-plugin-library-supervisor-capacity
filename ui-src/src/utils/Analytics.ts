import FlexTelemetry from '@twilio/flex-ui-telemetry';
import packageJSON from '../../package.json';

export enum Event {
  WORKER_CHANNELS_SET = 'Worker Channels Set',
}

export const Analytics = new FlexTelemetry({
  source: 'flexui',
  role: packageJSON.name,
  plugin: packageJSON.name,
  pluginVersion: packageJSON.version,
  originalPluginName: packageJSON.id,
});
