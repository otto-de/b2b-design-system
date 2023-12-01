import { newE2EPage } from '@stencil/core/testing';

describe('b2b-toggle-chip', () => {
  let page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-toggle-chip label="test-chip" name="chip-1" value="chip-1"></b2b-toggle-chip>`,
    );
  });

  it('renders', async () => {
    const element = await page.find('b2b-toggle-chip');

    expect(element).not.toBeNull();
  });

  it('emits the assigned value when clicked', async () => {
    const element = await page.find('b2b-toggle-chip');
    const selectedSpy = await page.spyOnEvent('b2b-selected');

    await element.click();
    await page.waitForChanges();

    expect(await element.getProperty('active')).toBe(true);
    expect(selectedSpy).toHaveReceivedEventDetail({ value: 'chip-1' });
  });

  it('emits the assigned value when navigated with a keyboard', async () => {
    const element = await page.find('b2b-toggle-chip');
    const selectedSpy = await page.spyOnEvent('b2b-selected');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(await element.getProperty('active')).toBe(true);
    expect(selectedSpy).toHaveReceivedEventDetail({ value: 'chip-1' });
  });
  it('does not emit if it is already active', async () => {
    const element = await page.find('b2b-toggle-chip');
    const selectedSpy = await page.spyOnEvent('b2b-selected');

    await element.setProperty('active', true);
    await page.waitForChanges();
    await element.click();
    await page.waitForChanges();

    expect(selectedSpy).not.toHaveReceivedEvent();
  });
  it('does not emit if it is disabled', async () => {
    const element = await page.find('b2b-toggle-chip');
    const selectedSpy = await page.spyOnEvent('b2b-selected');

    await element.setAttribute('disabled', true);
    await page.waitForChanges();
    await element.click();
    await page.waitForChanges();

    expect(selectedSpy).not.toHaveReceivedEvent();
  });
});
