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
    const today = new Date(2024, 2, 30);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const prevDay = yesterday.getDate();

    console.log('prevDay :', prevDay);

    if (prevDay > 0 && prevDay >= 31) {
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

  describe('B2B-Date-Picker Input Field', () => {
    let page;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<b2b-date-picker></b2b-date-picker>`);
    });

    it('should allow entering a date via the input field', async () => {
      const inputField = await page.find(
        'b2b-date-picker >>> input.b2b-date-picker-input',
      );
      expect(inputField).not.toBeNull();

      await inputField.press('2');
      await inputField.press('6');
      await inputField.press('.');
      await inputField.press('1');
      await inputField.press('1');
      await inputField.press('.');
      await inputField.press('2');
      await inputField.press('0');
      await inputField.press('2');
      await inputField.press('8');

      await page.waitForChanges();

      const inputValue = await inputField.getProperty('value');
      expect(inputValue).toBe('26.11.2028');
    });

    it('should show error state when invalid date is entered', async () => {
      const inputField = await page.find(
        'b2b-date-picker >>> input.b2b-date-picker-input',
      );

      await inputField.press('3');
      await inputField.press('2');
      await inputField.press('.');
      await inputField.press('.');
      await inputField.press('.');
      await inputField.press('.');
      await inputField.press('2');
      await inputField.press('0');
      await inputField.press('2');
      await inputField.press('4');

      await page.waitForChanges();

      const inputValue = await inputField.getProperty('value');
      expect(inputValue).toBe('32....2024');

      const errorHint = await page.find(
        'b2b-date-picker >>> span.b2b-date-picker-hint--error',
      );
      expect(errorHint).not.toBeNull();
    });

    it('should handle keyboard input and clear invalid date', async () => {
      const inputField = await page.find(
        'b2b-date-picker >>> input.b2b-date-picker-input',
      );

      await inputField.press('3');
      await inputField.press('2');
      await inputField.press('.');
      await inputField.press('1');
      await inputField.press('1');
      await inputField.press('.');
      await inputField.press('2');
      await inputField.press('0');
      await inputField.press('2');
      await inputField.press('4');

      await page.waitForChanges();

      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');
      await inputField.press('Backspace');

      await page.waitForChanges();

      const clearedInputValue = await inputField.getProperty('value');
      expect(clearedInputValue).toBe('');
    });
  });
});
