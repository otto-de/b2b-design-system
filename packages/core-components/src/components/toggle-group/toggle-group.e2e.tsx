import { newE2EPage } from '@stencil/core/testing';

describe('b2b-toggle-group', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-toggle-group name="toggle-group-1">
          <b2b-toggle-button name="toggle-group-1" value="1" label="One"></b2b-toggle-button>
          <b2b-toggle-button name="toggle-group-1" value="2" label="Two"></b2b-toggle-button>
        </b2b-toggle-group>`,
    );
  });

  it('should render the toggle group', async () => {
    const element = await page.find('b2b-toggle-group');
    expect(element).not.toBeNull();
  });

  it('should emit an event when a button is checked', async () => {
    const firstButton = await page.find({ text: 'Two' });
    const changeSpy = await page.spyOnEvent('b2b-group-change');

    await firstButton.click();

    await page.waitForChanges();

    expect(changeSpy).toHaveReceivedEvent();
    expect(changeSpy).toHaveReceivedEventDetail({ value: '2' });
  });

  it('should not emit an event when the checked button is already selected', async () => {
    const firstButton = await page.find({ text: 'Two' });
    const changeSpy = await page.spyOnEvent('b2b-group-change');

    await firstButton.click();
    await firstButton.click();

    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEventTimes(1);
  });

  it('should not select any buttons if the group is disabled', async () => {
    const element = await page.find('b2b-toggle-group');
    const changeSpy = await page.spyOnEvent('b2b-group-change');

    await element.setProperty('disabled', true);
    await page.waitForChanges();

    const button = await page.find({ text: 'One' });

    await button.click();
    await page.waitForChanges();

    expect(changeSpy).not.toHaveReceivedEvent();
  });

  it('should navigate and select a button by using a keyboard', async () => {
    await page.keyboard.press('Tab');
    await page.waitForChanges();
    await page.keyboard.press('Space');
    await page.waitForChanges();

    const element = await page.find('b2b-toggle-button');
    const checked = await element.getProperty('checked');

    expect(checked).toBe(true);
  });

  it('should select first element if none other is pre-selected ', async () => {
    const firstButton = await page.find('b2b-toggle-button');
    const isSelected = await firstButton.getProperty('checked');
    expect(isSelected).toBe(true);
  });

  it('should not select first element if any element is pre-selected ', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-toggle-group name="toggle-group-1">
          <b2b-toggle-button name="toggle-group-1" value="1" label="One"></b2b-toggle-button>
          <b2b-toggle-button checked name="toggle-group-1" value="2" label="Two"></b2b-toggle-button>
        </b2b-toggle-group>`,
    );
    const firstButton = await page.find('b2b-toggle-button');

    const isSelected = await firstButton.getProperty('checked');
    expect(isSelected).toBe(false);
  });
});
