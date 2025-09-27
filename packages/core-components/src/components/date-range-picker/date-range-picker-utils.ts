// #region Dateish

/**
 * A `Date`-like value.
 */
export type Dateish = string | Date | DateTuple;

/**
 * The main constituents of the date part of a `Date`.
 */
export type DateTuple = readonly [number, number, number];

/**
 * Splits the given date string into its constituent parts.
 * @param date The date to split.
 * @returns A tuple of the given year, month and day of the given date (Month and days are 1-indexed).
 */
export function splitDate(date: Dateish): DateTuple;
export function splitDate(date: Dateish | undefined): DateTuple | undefined;
export function splitDate(date: Dateish): DateTuple {
  if (date == null) {
    return undefined;
  } else if (typeof date === 'string') {
    if (date.includes('T')) {
      try {
        return splitDate(new Date(date));
      } catch {
        throw new Error(`Invalid date: ${date}`);
      }
    }

    const parts = date.split('.').map(Number);
    if (parts.length !== 3) {
      throw new Error(`Invalid date: ${date}`);
    }
    const [day, month, year] = date.split('.').map(Number);
    return [year, month, day];
  } else if (isDateTuple(date)) {
    return date;
  } else if (date instanceof Date && !Number.isNaN(date.valueOf())) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  } else {
    throw new Error(`Invalid date: ${date}`);
  }
}

/**
 * Converts the given date in a number to simplify comparisons.
 * @param date The date to convert.
 * @returns The given date as a number for comparisons .
 */
export function dateAsNumber(date: Dateish): number;
export function dateAsNumber(date: Dateish | undefined): number | undefined;
export function dateAsNumber(date: Dateish): number {
  if (date == null) {
    return undefined;
  } else {
    const [year, month, day] = splitDate(date);
    return year * 10000 + month * 100 + day;
  }
}

/**
 * Checks whether the given value is a `DateTuple`.
 * @param value The value to check.
 * @returns True, if the value is a `DateTuple`. False otherwise.
 */
function isDateTuple(value: unknown): value is DateTuple {
  return Array.isArray(value) && value.length === 3;
}

export function toDate(date: Dateish): Date;
export function toDate(date: Dateish | undefined): Date | undefined;
export function toDate(date: Dateish | undefined): Date | undefined {
  if (date == null) {
    return undefined;
  } else {
    const [year, month, day] = splitDate(date);
    return new Date(year, month - 1, day);
  }
}

export function toDateString(date: Dateish, nullDefault?: string): string;
export function toDateString(
  date: Dateish | undefined,
  nullDefault: string,
): string;
export function toDateString(
  date: Dateish | undefined,
  nullDefault?: string,
): string | undefined;
export function toDateString(date: Dateish, nullDefault?: string): string {
  if (date == null) {
    return nullDefault;
  } else {
    const [year, month, day] = splitDate(date);
    return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
  }
}

/**
 * Checks whether the given dates are exactly equal (down to the ms).
 * @param first The first date to compare.
 * @param second The second date to compare.
 * @returns True, if both values are exactly equal or both nullish. False otherwise.
 */
function isDateEqual(first?: Date, second?: Date): boolean {
  return first?.valueOf() === second?.valueOf();
}

// #endregion
// #region DateRange

/**
 * A readonly tuple of two `Date`s.
 */
export type DateRange = readonly [Date, Date];

/**
 * A readonly tuple of two `Date`-ish values.
 */
export type DatishRange = readonly [Dateish, Dateish];

/**
 * Parses the given input as a `DateRange`.
 * @param range The input to parse.
 * @returns The parsed date range. May be `undefined` if the input is nullish.
 */
export function toDateRange(
  range: string | readonly [Dateish, Dateish],
): DateRange;
export function toDateRange(
  range: undefined | string | readonly [Dateish, Dateish],
): undefined | DateRange;
export function toDateRange(
  range: undefined | string | readonly [Dateish, Dateish],
): undefined | DateRange {
  if (range == null) {
    return undefined;
  } else if (typeof range === 'string') {
    try {
      return toDateRange(JSON.parse(range));
    } catch {
      let parts = range.split('-');
      if (parts.length !== 2) {
        parts = range.split(' - ');
        if (parts.length !== 2) {
          throw new Error(`Invalid date range: ${range}`);
        }
      }
      return toDateRange([parts[0], parts[1]]);
    }
  } else if (Array.isArray(range) && range.length === 2) {
    const [start, end] = range;
    return [toDate(start), toDate(end)];
  } else {
    throw new Error(`Invalid date range: ${range}`);
  }
}

/**
 *Converts the given date range into a string.
 * @param range The value to convert.
 * @param nullDefault The value to use in case the input is nullish.
 * @returns A string representation of the given input.
 */
export function toDateRangeString(
  range: DatishRange,
  nullDefault?: string,
): string;
export function toDateRangeString(
  range: DatishRange | undefined,
  nullDefault: string,
): string;
export function toDateRangeString(
  range: DatishRange | undefined,
  nullDefault?: string,
): string | undefined;
export function toDateRangeString(
  range: DatishRange | undefined,
  nullDefault?: string,
): string | undefined {
  if (range == null) {
    return nullDefault;
  } else {
    return `${toDateString(range[0], '??.??.????')} - ${toDateString(range[1], '??.??.????')}`;
  }
}

/**
 * Checks whether the given date ranges are exactly equal (down to the ms).
 * @param first The first date range to compare.
 * @param second The second date range to compare.
 * @returns True, if both values are exactly equal or both nullish. False otherwise.
 */
export function isDateRangeEqual(
  first: DateRange | undefined,
  second: DateRange | undefined,
): boolean {
  if (first == null) {
    return second == null;
  } else if (second == null) {
    return false;
  }

  return isDateEqual(first[0], second[0]) && isDateEqual(first[1], second[1]);
}

// #endregion
