import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Paragraph', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-paragraph>Paragraph</b2b-paragraph>`);
  });

  it('should render paragraph component', async () => {
    const element = await page.find('b2b-paragraph');
    expect(element).not.toBeNull();
    expect(element).toEqualText('Paragraph');
  });
});
