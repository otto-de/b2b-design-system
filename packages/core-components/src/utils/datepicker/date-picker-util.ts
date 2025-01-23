export class DateUtils {
  static isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  static isDisabledDate(
    givenDate: Date,
    options: {
      disableDates?: Date[];
      disablePastDates?: boolean;
      disableFutureDates?: boolean;
      disableWeekends?: boolean;
      todayWithoutTime?: Date;
      disableEvery?: string[];
    },
  ): boolean {
    const {
      disableDates = [],
      disablePastDates = false,
      disableFutureDates = false,
      disableWeekends = false,
      todayWithoutTime = new Date(),
      disableEvery = [],
    } = options;

    const isExplicitlyDisabled =
      disableDates.length > 0 &&
      disableDates.some(disabledDate =>
        this.isSameDate(disabledDate, givenDate),
      );

    const dayNameToIndex: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };

    const isPastDate = disablePastDates && givenDate < todayWithoutTime;
    const isFutureDate = disableFutureDates && givenDate > todayWithoutTime;
    const isWeekend =
      disableWeekends && (givenDate.getDay() === 0 || givenDate.getDay() === 6);

    const isDayToDisable =
      disableEvery.length > 0 &&
      disableEvery.some(day => dayNameToIndex[day] === givenDate.getDay());

    return (
      isExplicitlyDisabled ||
      isPastDate ||
      isFutureDate ||
      isWeekend ||
      isDayToDisable
    );
  }

  static parseStringToDateArray(value: string): Date[] {
    return value
      .split(',')
      .map(date => date.trim())
      .map(dateStr => {
        const [day, month, year] = dateStr.split('.').map(Number);
        return new Date(year, month - 1, day);
      });
  }
}
