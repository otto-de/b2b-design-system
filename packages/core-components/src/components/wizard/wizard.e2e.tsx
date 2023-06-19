import { newE2EPage } from '@stencil/core/testing';
import { WizardStatus } from '../../utils/types/wizard.types';

describe('B2B-Wizard', () => {
  let page;

  const b2bWizardRender = (
    custom = false,
    activeStep = 3,
  ) => `<b2b-wizard active-step='${activeStep}' custom='${custom}'>
        <b2b-wizard-step>This is the text</b2b-wizard-step>
        <b2b-wizard-step>This is the text</b2b-wizard-step>
        <b2b-wizard-step>This is the text</b2b-wizard-step>
        <b2b-wizard-step>This is the text</b2b-wizard-step>
        <b2b-wizard-step>This is the text</b2b-wizard-step>
        <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(b2bWizardRender());
  });

  it('should render wizard component', async () => {
    const element = await page.find('b2b-wizard');
    expect(element).not.toBeNull();
  });

  it('should render steps in order for default mode', async () => {
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    await Promise.all(
      steps.map(async (step, index) => {
        const stepNumber = await step.getProperty('step');
        const expectedStep = (index + 1).toString();
        expect(stepNumber).toBe(expectedStep);
      }),
    );
  });

  it('should render active step with pending state', async () => {
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    const activeStep = steps[2];

    const stepState = await activeStep.getProperty('state');
    expect(stepState).toBe(WizardStatus.ACTIVE);
  });

  it('should render incomplete steps with default state', async () => {
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    const incompleteSteps = [steps[3], steps[4], steps[5]];
    await Promise.all(
      incompleteSteps.map(async step => {
        const stepState = await step.getProperty('state');
        expect(stepState).toBe(WizardStatus.DEFAULT);
      }),
    );
  });

  it('should render completed steps with completed state', async () => {
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    const incompleteSteps = [steps[0], steps[1]];
    await Promise.all(
      incompleteSteps.map(async step => {
        const stepState = await step.getProperty('state');
        expect(stepState).toBe(WizardStatus.COMPLETE);
      }),
    );
  });

  it('should not set steps state and order for custom mode', async () => {
    page = await newE2EPage();
    await page.setContent(b2bWizardRender(true));
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    await Promise.all(
      steps.map(async step => {
        // Expect default values
        const stepNumber = await step.getProperty('step');
        expect(stepNumber).toBe('1');
        const stepState = await step.getProperty('state');
        expect(stepState).toBe(WizardStatus.ACTIVE);
      }),
    );
  });

  it('should render all steps completed when active-step is zero', async () => {
    page = await newE2EPage();
    await page.setContent(b2bWizardRender(false, 0));
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');

    await Promise.all(
      steps.map(async step => {
        const stepState = await step.getProperty('state');
        expect(stepState).toBe(WizardStatus.COMPLETE);
      }),
    );
  });

  it('should be emitting a warning if rendering more than 6 steps', async () => {
    global.console.warn = jest.fn();

    page = await newE2EPage();
    await page.setContent(
      `<b2b-wizard>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
          <b2b-wizard-step>This is the text</b2b-wizard-step>
      </b2b-wizard>`,
    );

    expect(console.warn).toBeCalled();
  });

  it('should be emitting an error if active-step is higher than total steps', async () => {
    global.console.error = jest.fn();

    page = await newE2EPage();
    await page.setContent(b2bWizardRender(false, 8));

    expect(console.error).toBeCalled();
  });
});
