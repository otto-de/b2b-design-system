import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Headline', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-headline>Headline</b2b-headline>`);
  });

  it('should render headline component', async () => {
    const element = await page.find('b2b-headline');
    expect(element).not.toBeNull;
    expect(element).toEqualText('Headline');
  });
});
