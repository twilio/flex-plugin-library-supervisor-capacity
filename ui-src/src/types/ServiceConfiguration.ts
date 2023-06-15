import * as Flex from '@twilio/flex-ui';
export type SupervisorCapacityRule = {
  min: number;
  max: number;
};

export type SupervisorCapacityRules = {
  [key: string]: SupervisorCapacityRule;
};

export interface SupervisorCapacityConfig {
  enabled: boolean;
  rules: SupervisorCapacityRules | null;
}

type FlexUIAttributes = Flex.ServiceConfiguration['ui_attributes'];

export interface UIAttributes extends FlexUIAttributes {
  custom_data: any;
}
const { custom_data } = Flex.Manager.getInstance().configuration as UIAttributes;

export const { rules } = custom_data?.features?.supervisor_capacity || {};
