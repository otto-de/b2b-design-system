import { newE2EPage } from '@stencil/core/testing';
import { WizardStatus } from '../../utils/types/wizard.types';

describe('B2B-Wizard', () => {
  let page;

  it('should render wizard component', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="3" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const element = await page.find('b2b-wizard');
    expect(element).not.toBeNull();
  });

  it('should render steps in order for default mode', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="3" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    steps.map(async (step, index) => {
      const stepNumber = await step.getProperty('step');
      const expectedStep = (index + 1).toString();
      expect(stepNumber).toBe(expectedStep);
    });
  });

  it('should render active step with pending state', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="3" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    const activeStep = steps[2];

    const stepState = await activeStep.getProperty('state');
    expect(stepState).toBe(WizardStatus.PENDING);
  });

  it('should render incomplete steps with default state', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="3" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    const incompleteSteps = [steps[3], steps[4], steps[5]];
    incompleteSteps.map(async step => {
      const stepState = await step.getProperty('state');
      expect(stepState).toBe(WizardStatus.DEFAULT);
    });
  });

  it('should render completed steps with completed state', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="3" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    const incompleteSteps = [steps[0], steps[1]];

    incompleteSteps.map(async step => {
      const stepState = await step.getProperty('state');
      expect(stepState).toBe(WizardStatus.COMPLETED);
    });
  });

  it('should not set steps state and order for custom mode', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="3" check-icon custom>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');
    steps.map(async step => {
      // Expect default values
      const stepNumber = await step.getProperty('step');
      expect(stepNumber).toBe('1');
    });
    steps.map(async step => {
      const stepState = await step.getProperty('state');
      expect(stepState).toBe(WizardStatus.PENDING);
    });
  });

  it('should render all steps completed when active-step is zero', async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-wizard active-step="0" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);
    const steps = await page.findAll('b2b-wizard b2b-wizard-step');

    steps.map(async step => {
      const stepState = await step.getProperty('state');
      expect(stepState).toBe(WizardStatus.COMPLETED);
    });
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
    await page.setContent(`<b2b-wizard active-step="7" check-icon>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
      <b2b-wizard-step>This is the text</b2b-wizard-step>
    </b2b-wizard>`);

    expect(console.error).toBeCalled();
  });
});
