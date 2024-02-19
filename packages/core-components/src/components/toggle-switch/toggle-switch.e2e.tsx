import { newE2EPage } from '@stencil/core/testing';

describe('B2B-InputList', () => {
  it('should render toggle-switch', async () => {
    const page = await newE2EPage();

    await page.setContent(`
      <b2b-toggle-switch
      label="label"
      disabled="false"
      state="true"></b2b-toggle-switch>
    `);
    const toggleSwitch = await page.find('b2b-toggle-switch');

    expect(toggleSwitch).not.toBeNull();
  });

  it('should render toggle-switch with given label on left by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <b2b-toggle-switch
      label="IT-test-label"
      disabled="false"
      state="true"></b2b-toggle-switch>
    `);

    const label = await page.find(
      'b2b-toggle-switch >>> .b2b-toggle__text-left',
    );
    expect(label.textContent).toBe('IT-test-label');
  });

  it('should render toggle-switch with label on right', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <b2b-toggle-switch
      label="IT-test-label-right"
      label-position="right"
      disabled="false"
      state="true"></b2b-toggle-switch>
    `);

    const label = await page.find(
      'b2b-toggle-switch >>> .b2b-toggle__text-right',
    );
    expect(label.textContent).toBe('IT-test-label-right');
  });

  it('should render disabled toggle-switch', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <b2b-toggle-switch
      label="IT-test-label-right"
      label-position="right"
      disabled="true"
      state="true"></b2b-toggle-switch>
    `);

    const toggleSwitch = await page.find('b2b-toggle-switch');

    let disabledAttribute = toggleSwitch.getAttribute('disabled');
    expect(disabledAttribute).not.toBeNull();
  });
});
