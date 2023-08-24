import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Label', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-label>Neutral</b2b-label>`);
  });

  it('should render the label component', async () => {
    const element = await page.find('b2b-label');
    expect(element).not.toBeNull();
    expect(element).toEqualText('Neutral');
  });

  it('should present the label component in the default style', async () => {
    const element = await page.find('b2b-label >>> span');
    expect(element).toHaveClass('b2b-label--neutral');
  });
});
