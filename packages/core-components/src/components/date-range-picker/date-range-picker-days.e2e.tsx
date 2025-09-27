import type { E2EPage } from '@stencil/core/testing';
import { newE2EPage } from '@stencil/core/testing';

describe('B2B-Date-Range-Picker-Days', () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('should emit the clicked date', async () => {
    await page.setContent(
      `<b2b-date-range-picker-days viewed-date="01.01.2025"></b2b-date-range-picker-days>`,
    );
    await page.waitForChanges();

    const dateSelectedSpy = await page.spyOnEvent('b2b-date-selected');

    const dayComponent = await page.find(
      'b2b-date-range-picker-days >>> .b2b-date-range-picker-day',
    );
    await dayComponent.click();
    page.waitForChanges();

    expect(dateSelectedSpy).toHaveReceivedEvent();
    expect(dateSelectedSpy).toHaveReceivedEventDetail({
      selectedDate: new Date(2025, 0, 1).toISOString(), // Must be a string due to node-to-browser "serialization"
    });
  });
});
