import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Progress-bar', () => {
  it('should render b2b progress bar', async () => {
    const page = await newE2EPage();
    await page.setContent("<b2b-progress-bar progress='80' />");

    const element = await page.find('b2b-progress-bar');
    expect(element).not.toBeNull();

    const label = await page.find(
      'b2b-progress-bar >>> .b2b-progress-bar__label-none',
    );
    expect(label).not.toBeNull();
  });

  it('should render b2b progress bar with label on bottom left', async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<b2b-progress-bar progress='70' label='Label below to the left' label-type='below' label-position='left' />",
    );

    const element = await page.find('b2b-progress-bar');
    expect(element).not.toBeNull();

    const label = await page.find(
      'b2b-progress-bar >>> .b2b-progress-bar__label__left-below',
    );

    expect(label.textContent).toBe('Label below to the left');
  });

  it('should render b2b progress bar with label on bottom right', async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<b2b-progress-bar progress='70' label='Label below to the right' label-type='below' label-position='right' />",
    );

    const element = await page.find('b2b-progress-bar');
    expect(element).not.toBeNull();

    const label = await page.find(
      'b2b-progress-bar >>> .b2b-progress-bar__label__right-below',
    );

    expect(label.textContent).toBe('Label below to the right');
  });

  it('should render b2b progress bar with label on left side', async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<b2b-progress-bar progress='70' label='Label on the left side' label-type='side' label-position='left' />",
    );

    const element = await page.find('b2b-progress-bar');
    expect(element).not.toBeNull();

    const label = await page.find(
      'b2b-progress-bar >>> .b2b-progress-bar__label__left-side',
    );

    expect(label.textContent).toBe('Label on the left side');
  });

  it('should render b2b progress bar with label on right side', async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<b2b-progress-bar progress='70' label='Label on the right side' label-type='side' label-position='right' />",
    );

    const element = await page.find('b2b-progress-bar');
    expect(element).not.toBeNull();

    const label = await page.find(
      'b2b-progress-bar >>> .b2b-progress-bar__label__right-side',
    );

    expect(label.textContent).toBe('Label on the right side');
  });
});
