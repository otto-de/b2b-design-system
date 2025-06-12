import { newE2EPage } from '@stencil/core/testing';

describe('b2b-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<b2b-checkbox label="test"></b2b-checkbox>');

    const element = await page.find('b2b-checkbox');

    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('checked');
  });

  it('can be checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<b2b-checkbox label="test"></b2b-checkbox>');

    const container = await page.find('b2b-checkbox');
    let element = await page.find('b2b-checkbox >>> .b2b-checkbox');

    expect(element).not.toHaveClass('b2b-checkbox--checked');

    await container.click();

    await page.waitForChanges();

    element = await page.find('b2b-checkbox >>> .b2b-checkbox');
    expect(element).toHaveClass('b2b-checkbox--checked');
  });

  it('can be indeterminate and will change to checked once clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-checkbox label="test" indeterminate></b2b-checkbox>',
    );

    const container = await page.find('b2b-checkbox');
    let element = await page.find('b2b-checkbox >>> .b2b-checkbox');

    expect(element).toHaveClass('b2b-checkbox--indeterminate');

    await container.click();

    await page.waitForChanges();

    element = await page.find('b2b-checkbox >>> .b2b-checkbox');
    expect(element).toHaveClass('b2b-checkbox--checked');
  });

  it('use label slot if provided', async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<b2b-checkbox><span slot="label">Custom label</span></b2b-checkbox>',
    );

    const element = await page.find('span');

    expect(element).toEqualText('Custom label');
  });
});
