import { newE2EPage } from '@stencil/core/testing';

describe('B2B Tab', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-tab>Tab 1</b2b-tab>`);
  });

  it('should render the tab component', async () => {
    const element = await page.find('b2b-tab');
    expect(element).not.toBeNull;
  });

  it('should emit when selected changes', async () => {
    const selectedSpy = await page.spyOnEvent('b2b-change');

    await page.$eval('b2b-tab', (element: any) => {
      element.selected = true;
    });

    await page.waitForChanges();

    expect(selectedSpy).toHaveReceivedEvent();
  });

  it('should focus on the tab if it is selected', async () => {
    const element = await page.find('b2b-tab');
    const selectedBefore = await element.getProperty('selected');
    expect(selectedBefore).toBe(false);

    await page.$eval('b2b-tab', (element: any) => {
      element.selected = true;
    });

    await page.waitForChanges();

    const selectedAfter = await element.getProperty('selected');

    expect(selectedAfter).toBe(true);

    const focus = await page.evaluate(() => {
      return document.activeElement.ariaSelected;
    });
    expect(focus).not.toBeNull;
  });
});
