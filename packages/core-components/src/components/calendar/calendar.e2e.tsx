import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Calendar', () => {
  let page;
  // let today = new Date();
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-calendar></b2b-calendar>`);
  });

  it('should render the calendar component', async () => {
    const calendar = await page.find('b2b-calendar');
    const clickableInputComponent = await page.find(
      'b2b-calendar >>> div.b2b-calender-input-wrapper',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(calendar).not.toBeNull();
  });

  it('should render the datepicker component when calender icon is clicked', async () => {
    const calendar = await page.find('b2b-calendar');
    const clickableInputComponent = await page.find(
      'b2b-calendar >>> div.b2b-calender-input-wrapper',
    );

    await clickableInputComponent.click();
    await page.waitForChanges();

    const datePickerComponent = await page.find(
      'b2b-calendar >>> .b2b-datepicker',
    );
    const datePickerHeader = await page.find(
      'b2b-calendar >>> .b2b-datepicker >>> b2b-calendar-header',
    );
    const datePickerDays = await page.find(
      'b2b-calendar >>> .b2b-datepicker >>> b2b-calender-days',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(calendar).not.toBeNull();

    expect(datePickerComponent).not.toBeNull();
    expect(datePickerHeader).not.toBeNull();
    expect(datePickerDays).not.toBeNull();
    expect(await datePickerComponent.isVisible()).toBe(true);
    expect(await datePickerHeader.isVisible()).toBe(true);
    expect(await datePickerDays.isVisible()).toBe(true);
  });
});
