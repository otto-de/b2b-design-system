import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Breadcrumb', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-breadcrumb>
            <b2b-breadcrumb-item value="one">First Page</b2b-breadcrumb-item>
            <b2b-breadcrumb-item value="two" active>Second Page</b2b-breadcrumb-item>
            <b2b-breadcrumb-item value="three" href="test">Last Page</b2b-breadcrumb-item>
        </b2b-breadcrumb>`);
  });

  it('should render the breadcrumb', async () => {
    const element = await page.find('b2b-breadcrumb');
    const items = await page.findAll('b2b-breadcrumb-item');

    expect(element).toBeDefined();
    expect(items).toBeDefined();
    expect(items.length).toBe(3);
  });

  it('should emit when an item is clicked', async () => {
    const selectEventSpy = await page.spyOnEvent('b2b-selected');
    const item = await page.find({ text: 'First Page' });

    await item.click();
    await page.waitForChanges();

    expect(selectEventSpy).toHaveReceivedEventDetail({ value: 'one' });
    expect(await item.getProperty('active')).toBe(true);
  });

  it('should not emit when an item with a link is clicked', async () => {
    const selectEventSpy = await page.spyOnEvent('b2b-selected');
    const item = await page.find({ text: 'Last Page' });

    await item.click();
    await page.waitForChanges();

    expect(selectEventSpy).not.toHaveReceivedEvent();
  });

  it('should not emit when an item is currently selected and clicked', async () => {
    const selectEventSpy = await page.spyOnEvent('b2b-selected');
    const item = await page.find({ text: 'Second Page' });

    await item.click();
    await page.waitForChanges();

    expect(selectEventSpy).not.toHaveReceivedEvent();
  });

  it('should change state of all other items when an item that is not currently selected is clicked', async () => {
    const item = await page.find({ text: 'First Page' });

    await item.click();
    await page.waitForChanges();

    const second = await page.find({ text: 'Second Page' });
    const third = await page.find({ text: 'Last Page' });

    expect(await second.getProperty('active')).toBe(false);
    expect(await third.getProperty('active')).toBe(false);
  });
});
