export type WizardSteps = '1' | '2' | '3' | '4' | '5' | '6';

export const WizardStatus = {
  DEFAULT: 'default',
  COMPLETED: 'completed',
  PENDING: 'pending',
  DISABLED: 'disabled',
} as const;
export type WizardStatus = (typeof WizardStatus)[keyof typeof WizardStatus];
