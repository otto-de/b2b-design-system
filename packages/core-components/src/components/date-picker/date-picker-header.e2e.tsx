import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Date-Picker-Header', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-date-picker-header></b2b-date-picker-header>`);
  });

  it('should emit previous button click event', async () => {
    const previousMonthSpy = await page.spyOnEvent(
      'b2b-date-picker-previous-month',
    );

    const clickableInputComponent = await page.find(
      'b2b-date-picker-header >>> .b2b-date-picker-nav--left',
    );

    await clickableInputComponent.click();
    page.waitForChanges();

    expect(previousMonthSpy).toHaveReceivedEvent();
  });
  it('should emit next button click event', async () => {
    const nextMonthSpy = await page.spyOnEvent('b2b-date-picker-next-month');

    const clickableInputComponent = await page.find(
      'b2b-date-picker-header >>> .b2b-date-picker-nav--right',
    );

    await clickableInputComponent.click();
    page.waitForChanges();

    expect(nextMonthSpy).toHaveReceivedEvent();
  });

  it('should emit months date picker view selected event', async () => {
    const viewChangedSpy = await page.spyOnEvent(
      'b2b-date-picker-view-changed',
    );

    const clickableInputComponent = await page.find(
      'b2b-date-picker-header >>> .b2b-date-picker-month',
    );

    await clickableInputComponent.click();
    page.waitForChanges();

    expect(viewChangedSpy).toHaveReceivedEvent();
    expect(viewChangedSpy).toHaveReceivedEventDetail({ value: 'Months' });
  });

  it('should emit years date picker view selected event', async () => {
    const viewChangedSpy = await page.spyOnEvent(
      'b2b-date-picker-view-changed',
    );

    const clickableInputComponent = await page.find(
      'b2b-date-picker-header >>> .b2b-date-picker-year',
    );

    await clickableInputComponent.click();
    page.waitForChanges();

    expect(viewChangedSpy).toHaveReceivedEvent();
    expect(viewChangedSpy).toHaveReceivedEventDetail({ value: 'Years' });
  });
});
