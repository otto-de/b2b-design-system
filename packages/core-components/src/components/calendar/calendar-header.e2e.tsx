import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Calendar-Header', () => {
  let page;
  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`<b2b-calendar-header></b2b-calendar-header>`);
  });

  it('should emit previous button click event', async () => {
    const previousMonthSpy = await page.spyOnEvent(
      'b2b-calendar-previous-month',
    );

    const clickableInputComponent = await page.find(
      'b2b-calendar-header >>> .b2b-calendar-nav--left',
    );

    await clickableInputComponent.click();
    page.waitForChanges();

    expect(previousMonthSpy).toHaveReceivedEvent();
  });
  it('should emit next button click event', async () => {
    const nextMonthSpy = await page.spyOnEvent('b2b-calendar-next-month');

    const clickableInputComponent = await page.find(
      'b2b-calendar-header >>> .b2b-calendar-nav--right',
    );

    await clickableInputComponent.click();
    page.waitForChanges();

    expect(nextMonthSpy).toHaveReceivedEvent();
  });
});
