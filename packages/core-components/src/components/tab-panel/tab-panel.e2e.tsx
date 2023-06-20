import { newE2EPage } from '@stencil/core/testing';

describe('B2B Tab Panel', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-tab-panel name="tab-1">Tab 1</b2b-tab-panel>`);
  });

  it('should render the tab panel', async () => {
    const element = await page.find('b2b-tab-panel');
    expect(element).not.toBeNull();
  });
});
