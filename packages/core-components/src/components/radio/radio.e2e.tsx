import { newE2EPage } from '@stencil/core/testing';

describe('b2b-radio', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      '<b2b-radio-button label="test" value="one"></b2b-radio-button>',
    );
  });

  it('renders', async () => {
    const element = await page.find('b2b-radio-button');

    expect(element).toBeDefined();
  });

  it('emits when clicked', async () => {
    const spy = await page.spyOnEvent('b2b-change');
    const element = await page.find('b2b-radio-button');

    await element.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
  });

  it('should not emit when radio is already selected', async () => {
    const spy = await page.spyOnEvent('b2b-change');
    const element = await page.find('b2b-radio-button');

    await element.click();
    await element.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('should not emit when radio is disabled', async () => {
    const spy = await page.spyOnEvent('b2b-change');
    const element = await page.find('b2b-radio-button');

    await element.setProperty('disabled', true);
    await page.waitForChanges();

    await element.click();
    await page.waitForChanges();

    expect(spy).not.toHaveReceivedEvent();
  });

  it('should use label slot if provided', async () => {
    const slotPage = await newE2EPage();
    await slotPage.setContent(`
      <b2b-radio-button value="one">
        <span slot="label">Custom label</span>
      </b2b-radio-button>`);

    const element = await slotPage.find('span');

    expect(element).toEqualText('Custom label');
  });
});
