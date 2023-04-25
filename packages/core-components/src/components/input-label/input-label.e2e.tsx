import { newE2EPage } from '@stencil/core/testing';

describe('b2b-input-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-input-label for="testId">A label</b2b-input-label>',
    );
    const element = await page.find('b2b-input-label');
    expect(element).toHaveClass('hydrated');
    expect(element).toBeDefined();
  });
});
