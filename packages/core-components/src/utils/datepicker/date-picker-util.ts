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
      disableDatesUntil?: Date;
      disableDatesFrom?: Date;
    },
  ): boolean {
    const {
      disableDates = [],
      disablePastDates = false,
      disableFutureDates = false,
      disableWeekends = false,
      todayWithoutTime = new Date(),
      disableEvery = [],
      disableDatesUntil,
      disableDatesFrom,
    } = options;

    const dayNameToIndex: Record<string, number> = {
      So: 0,
      Mo: 1,
      Di: 2,
      Mi: 3,
      Do: 4,
      Fr: 5,
      Sa: 6,
    };

    const isExplicitlyDisabled =
      disableDates.length > 0 &&
      disableDates.some(disabledDate =>
        this.isSameDate(disabledDate, givenDate),
      );

    const isPastDate = disablePastDates && givenDate < todayWithoutTime;
    const isFutureDate = disableFutureDates && givenDate > todayWithoutTime;
    const isWeekend =
      disableWeekends && (givenDate.getDay() === 0 || givenDate.getDay() === 6);

    const isDayToDisable =
      disableEvery.length > 0 &&
      disableEvery.some(day => dayNameToIndex[day] === givenDate.getDay());

    const isBeforeDisableUntil = givenDate <= disableDatesUntil;
    const isAfterDisableFrom = givenDate >= disableDatesFrom;

    return (
      isExplicitlyDisabled ||
      isPastDate ||
      isFutureDate ||
      isWeekend ||
      isDayToDisable ||
      isBeforeDisableUntil ||
      isAfterDisableFrom
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
