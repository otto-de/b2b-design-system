import { newE2EPage } from '@stencil/core/testing';

describe('B2B Tooltip', () => {
  const expectToBeVisibleAfterTransition = async (page, tooltipDiv) => {
    await page.$eval('b2b-tooltip', el => {
      const tooltipElm = el.shadowRoot.querySelector('div');
      tooltipElm.addEventListener('transitioned', () => {
        expect(tooltipDiv.isVisible()).toBe(true);
      });
    });
  };

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-tooltip content="I am a tooltip">trigger</b2b-tooltip>',
    );

    const element = await page.find('b2b-tooltip');
    expect(element).toHaveClass('hydrated');

    const tooltipDiv = await page.find('b2b-tooltip >>> div');
    expect(await tooltipDiv.isVisible()).toBe(false);
  });

  it('appears on hover when no trigger is specified', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-tooltip content="I am a tooltip">trigger</b2b-tooltip>',
    );

    const trigger = await page.find('b2b-tooltip >>> span');

    await trigger.hover();

    await page.waitForChanges();

    const tooltipDiv = await page.find('b2b-tooltip >>> div');
    expect(await tooltipDiv.isVisible()).toBe(true);
  });

  it('appears on focus when a focusable element is slotted and the trigger is set to focus', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-tooltip content="I am a tooltip" trigger="focus"><button>Focus me</button></b2b-tooltip>',
    );

    const tooltipDiv = await page.find('b2b-tooltip >>> div');
    expect(await tooltipDiv.isVisible()).toBe(false);

    await page.keyboard.press('Tab');

    await page.waitForChanges();

    await expectToBeVisibleAfterTransition(page, tooltipDiv);
  });

  it('does not appear on hover when the trigger is set to focus', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-tooltip content="I am a tooltip" trigger="focus"><button>Focus me</button></b2b-tooltip>',
    );
    const tooltipDiv = await page.find('b2b-tooltip >>> div');
    const trigger = await page.find('b2b-tooltip >>> span');

    await trigger.hover();

    await page.waitForChanges();

    expect(await tooltipDiv.isVisible()).toBe(false);
  });

  it('does not appear on hover when the trigger is set to custom', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-tooltip content="I am a tooltip" trigger="custom"><button>Focus me</button></b2b-tooltip>',
    );
    const tooltipDiv = await page.find('b2b-tooltip >>> div');
    const trigger = await page.find('b2b-tooltip >>> span');

    await trigger.hover();

    await page.waitForChanges();

    expect(await tooltipDiv.isVisible()).toBe(false);
  });

  it('appears when the trigger is set to custom and the opened property changes', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-tooltip content="I am a tooltip" trigger="custom" opened="false"><button>Focus me</button></b2b-tooltip>',
    );
    const element = await page.find('b2b-tooltip');
    const tooltipDiv = await page.find('b2b-tooltip >>> div');

    element.setAttribute('opened', true);

    await page.waitForChanges();

    await expectToBeVisibleAfterTransition(page, tooltipDiv);
  });
});
