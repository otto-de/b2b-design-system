import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Radio-Group', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
            <b2b-radio-group label="test label" name="test-group">
                <b2b-radio-button label="one" value="one" name="test-group" id="one" hint="test" error="test"></b2b-radio-button>
                <b2b-radio-button label="two" value="two" name="test-group" id="two"</b2b-radio-button>
            </b2b-radio-group>
        `);
  });

  it('should render the radio group component', async () => {
    const element = await page.find('b2b-radio-group');
    expect(element).not.toBeNull;
  });

  it('should have all radio buttons unchecked by default and check a radio button', async () => {
    const element = await page.find('b2b-radio-button');
    expect(element).not.toHaveAttribute('checked');

    element.setAttribute('checked', true);

    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
  });

  it('should receive a custom event', async () => {
    const element = await page.find('b2b-radio-button >>> div > input');
    expect(element).not.toBeNull;

    const b2bChange = await page.spyOnEvent('b2b-change');
    expect(b2bChange).not.toBeNull;

    await element.click();

    await page.waitForChanges();

    expect(b2bChange).toHaveReceivedEvent();
  });

  it('should emit a custom event when a radio button is checked', async () => {
    const element = await page.find('b2b-radio-button');
    expect(element).not.toBeNull;

    const b2bGroupChange = await page.spyOnEvent('b2b-group-change');
    expect(b2bGroupChange).not.toBeNull;

    await element.click();

    await page.waitForChanges();

    expect(b2bGroupChange).toHaveReceivedEvent();
  });

  it('should not emit an event when the checked radio is already selected', async () => {
    const firstRadio = await page.find({ text: 'one' });
    const changeSpy = await page.spyOnEvent('b2b-group-change');

    await firstRadio.click();
    await firstRadio.click();
    await page.waitForChanges();

    expect(changeSpy).toHaveReceivedEventTimes(1);
  });

  it('should disable all radio when the property is specified', async () => {
    const parentElement = await page.find('b2b-radio-group');
    const element = await page.find('b2b-radio-button >>> .b2b-radio');

    expect(element).not.toHaveClass('b2b-radio--disabled');

    parentElement.setProperty('disabled', true);

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-radio--disabled');
  });

  it('should set all radio buttons to invalid when the property is specified', async () => {
    const parentElement = await page.find('b2b-radio-group');
    const element = await page.find('b2b-radio-button >>> .b2b-radio');

    expect(element).not.toHaveClass('b2b-radio--error');

    parentElement.setProperty('invalid', true);

    await page.waitForChanges();

    expect(element).toHaveClass('b2b-radio--error');
  });

  it('should remove all children hint texts when the component is rendered', async () => {
    const element = await page.find('b2b-radio-button');
    const error = element.error;
    const hint = element.hint;

    expect(hint).not.toBeDefined;
    expect(error).not.toBeDefined;
  });
});
