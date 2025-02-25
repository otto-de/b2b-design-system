import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Shimmer', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      '<b2b-shimmer loading="true" width="100" height="100"></b2b-shimmer>',
    );
  });

  it('should render shimmer component', async () => {
    const element = await page.find('b2b-shimmer');
    expect(element).toBeDefined();
  });

  it('should show slot content if loading is false', async () => {
    const page = await newE2EPage();
    await page.setContent('<b2b-shimmer><h1>dummy content</h1></b2b-shimmer>');

    const element = await page.find('h1');

    expect(element).toEqualText('dummy content');
  });
});
