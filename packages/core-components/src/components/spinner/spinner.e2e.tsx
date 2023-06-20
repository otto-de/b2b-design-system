import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Spinner', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-spinner></b2b-spinner>`);
  });

  it('should render spinner component', async () => {
    const element = await page.find('b2b-spinner');
    expect(element).not.toBeNull();
  });
});
