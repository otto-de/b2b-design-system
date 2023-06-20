import { newE2EPage } from '@stencil/core/testing';

describe('b2b-toggle-button', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-toggle-button checked="false" name="toggle-1" label="Unselected" value="1"></b2b-toggle-button>`,
    );
  });
  it('renders', async () => {
    const element = await page.find('b2b-toggle-button');
    expect(element).not.toBeNull();
  });

  it('checks the button when selected', async () => {
    const element = await page.find('b2b-toggle-button');

    await element.click();

    await page.waitForChanges();

    const check = await element.getProperty('checked');

    expect(check).toBe(true);
  });

  it('emits its value when selected', async () => {
    const element = await page.find('b2b-toggle-button');
    const spy = await page.spyOnEvent('b2b-change');

    await element.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEvent();
    expect(spy).toHaveReceivedEventDetail({ value: '1' });
  });

  it('should not emit when a button is disabled', async () => {
    const element = await page.find('b2b-toggle-button');

    await element.setProperty('disabled', true);
    await page.waitForChanges();

    const spy = await page.spyOnEvent('b2b-change');

    await element.click();
    await page.waitForChanges();

    expect(spy).not.toHaveReceivedEvent();
  });

  it('should not emit when a button is already selected', async () => {
    const element = await page.find('b2b-toggle-button');
    const spy = await page.spyOnEvent('b2b-change');

    await element.click();
    await element.click();
    await page.waitForChanges();

    expect(spy).toHaveReceivedEventTimes(1);
  });
});
