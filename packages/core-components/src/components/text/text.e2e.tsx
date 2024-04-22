import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Text', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-text>Text</b2b-text>`);
  });

  it('should render text component', async () => {
    const element = await page.find('b2b-text');
    expect(element).not.toBeNull();
    expect(element).toEqualText('Text');
  });
});
