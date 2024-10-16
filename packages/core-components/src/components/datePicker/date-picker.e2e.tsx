import { newE2EPage } from '@stencil/core/testing';

//ToDo Rewrite the tests so that the next, previous button and date selection scenarios are also tested
describe('B2B-Date-Picker', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-date-picker></b2b-date-picker>`);
  });

  it('should render the date picker component', async () => {
    const datePicker = await page.find('b2b-date-picker');
    const clickableInputComponent = await page.find(
      'b2b-date-picker >>> div.b2b-date-picker-input-wrapper',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(datePicker).not.toBeNull();
  });

  it('should render the datepicker component when date picker icon is clicked', async () => {
    const datePicker = await page.find('b2b-date-picker');
    const clickableInputComponent = await page.find(
      'b2b-date-picker >>> div.b2b-date-picker-input-wrapper',
    );

    await clickableInputComponent.click();
    await page.waitForChanges();

    const datePickerComponent = await page.find(
      'b2b-date-picker >>> .b2b-date-picker-body',
    );
    const datePickerHeader = await page.find(
      'b2b-date-picker >>> .b2b-date-picker-body >>> b2b-date-picker-header',
    );
    const datePickerDays = await page.find(
      'b2b-date-picker >>> .b2b-date-picker-body >>> b2b-date-picker-days',
    );

    expect(clickableInputComponent).not.toBeNull();
    expect(datePicker).not.toBeNull();

    expect(datePickerComponent).not.toBeNull();
    expect(datePickerHeader).not.toBeNull();
    expect(datePickerDays).not.toBeNull();
    expect(await datePickerComponent.isVisible()).toBe(true);
    expect(await datePickerHeader.isVisible()).toBe(true);
    expect(await datePickerDays.isVisible()).toBe(true);
  });

  it('should disable past dates', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-date-picker disable-past-dates=true></b2b-date-picker>`,
    );
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const prevDay = yesterday.getDate();

    if (prevDay > 0 && prevDay >= 30) {
      const prevDayElement = await page.find({ text: prevDay.toString() });
      expect(prevDayElement.className).toBe(
        'b2b-date-picker-day b2b-date-picker-day--disabled',
      );
    }
  });
  it('should disable future dates', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-date-picker disable-future-dates=true></b2b-date-picker>`,
    );
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const nextDay = tomorrow.getDate();

    if (nextDay > 0 && nextDay !== 1) {
      const nextDayElement = await page.find({ text: nextDay.toString() });
      expect(nextDayElement.className).toBe(
        'b2b-date-picker-day b2b-date-picker-day--disabled',
      );
    }
  });
  it('should disable weekends dates', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-date-picker disable-weekends=true></b2b-date-picker>`,
    );
    const previousSunday = new Date().getDate() - (new Date().getDay() % 0);

    if (previousSunday > 0) {
      const prevDayElement = await page.find({
        text: previousSunday.toString(),
      });
      expect(prevDayElement.className).toBe(
        'b2b-date-picker-day b2b-date-picker-day--disabled',
      );
    }
  });
});
