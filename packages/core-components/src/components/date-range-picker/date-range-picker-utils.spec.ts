// #region Dateish

import type { Dateish, DateRange, DateTuple } from './date-range-picker-utils';
import {
  dateAsNumber,
  isDateRangeEqual,
  splitDate,
  toDateRange,
  toDateRangeString,
  toDateString,
} from './date-range-picker-utils';

describe('Dateish', () => {
  describe('splitDate', () => {
    const values: [
      input: Dateish | undefined,
      expected: DateTuple | undefined | Error,
    ][] = [
      [undefined, undefined],
      [null, undefined],
      [new Date(2025, 0, 1), [2025, 1, 1]],
      [new Date(2025, 0, 1).toISOString(), [2025, 1, 1]],
      ['01.01.2025', [2025, 1, 1]],
      ['1.1.2025', [2025, 1, 1]],
      ['', new Error('Invalid date: ')],
      ['2025-01-01', new Error('Invalid date: 2025-01-01')],
    ];
    it.each(values)('should handle %o', (input, expected) => {
      if (expected === undefined) {
        expect(splitDate(input)).toBeUndefined();
      } else if (expected instanceof Error) {
        expect(() => splitDate(input)).toThrow(expected);
      } else {
        const actual = splitDate(input);
        expect(actual).toBeDefined();
        expect(Array.isArray(actual)).toBe(true);
        expect(actual).toHaveLength(3);
        expect(actual).toStrictEqual(expected);
      }
    });
  });

  describe('dateAsNumber', () => {
    const values: [
      input: Dateish | undefined,
      expected: number | undefined | Error,
    ][] = [
      [undefined, undefined],
      [null, undefined],
      [new Date(2025, 0, 1), 20250101],
      [new Date(2025, 0, 1).toISOString(), 20250101],
      ['01.01.2025', 20250101],
      ['1.1.2025', 20250101],
      ['', new Error('Invalid date: ')],
      ['2025-01-01', new Error('Invalid date: 2025-01-01')],
    ];
    it.each(values)('should handle %o', (input, expected) => {
      if (expected === undefined) {
        expect(dateAsNumber(input)).toBeUndefined();
      } else if (expected instanceof Error) {
        expect(() => dateAsNumber(input)).toThrow(expected);
      } else {
        expect(dateAsNumber(input)).toBe(expected);
      }
    });
  });

  describe('toDateString', () => {
    const values: [
      input: Dateish | undefined,
      expected: string | undefined | Error,
    ][] = [
      [undefined, undefined],
      [null, undefined],
      [new Date(2025, 0, 1), '01.01.2025'],
      [new Date(2025, 0, 1).toISOString(), '01.01.2025'],
      ['01.01.2025', '01.01.2025'],
      ['1.1.2025', '01.01.2025'],
      ['', new Error('Invalid date: ')],
      ['2025-01-01', new Error('Invalid date: 2025-01-01')],
    ];
    it.each(values)('should handle %o', (input, expected) => {
      if (expected === undefined) {
        expect(toDateString(input)).toBeUndefined();
        expect(toDateString(input, 'default')).toBe('default');
      } else if (expected instanceof Error) {
        expect(() => toDateString(input)).toThrow(expected);
        expect(() => toDateString(input, 'default')).toThrow(expected);
      } else {
        expect(toDateString(input)).toBe(expected);
        expect(toDateString(input, 'default')).toBe(expected);
      }
    });
  });
});

// #endregion
// #region DateRange

describe('DateRange', () => {
  describe('toDateRange', () => {
    const values: [
      input: string | readonly [Dateish, Dateish] | undefined,
      expected: DateRange | undefined | Error,
    ][] = [
      [undefined, undefined],
      [null, undefined],
      [
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
      ],
      [
        [
          new Date(2025, 0, 1).toISOString(),
          new Date(2025, 0, 1).toISOString(),
        ],
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
      ],
      [
        ['01.01.2025', '01.01.2025'],
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
      ],
      [
        ['1.1.2025', '1.1.2025'],
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
      ],
      ['1.1.2025-1.1.2025', [new Date(2025, 0, 1), new Date(2025, 0, 1)]],
      [
        `${new Date(2025, 0, 1).toISOString()} - ${new Date(2025, 0, 1).toISOString()}`,
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
      ],
      [
        JSON.stringify([
          new Date(2025, 0, 1).toISOString(),
          new Date(2025, 0, 1).toISOString(),
        ]),
        [new Date(2025, 0, 1), new Date(2025, 0, 1)],
      ],
      ['', new Error('Invalid date range: ')],
      ['2025-01-01', new Error('Invalid date range: 2025-01-01')],
      [
        '2025-01-01-2025-01-01',
        new Error('Invalid date range: 2025-01-01-2025-01-01'),
      ],
      [
        JSON.stringify([
          new Date(Date.UTC(2025, 0, 1)).toISOString(),
          new Date(Date.UTC(2025, 0, 1)).toISOString(),
          new Date(Date.UTC(2025, 0, 1)).toISOString(),
        ]),
        new Error(
          'Invalid date range: ["2025-01-01T00:00:00.000Z","2025-01-01T00:00:00.000Z","2025-01-01T00:00:00.000Z"]',
        ),
      ],
    ];
    it.each(values)('should handle %o', (input, expected) => {
      if (expected === undefined) {
        expect(toDateRange(input)).toBeUndefined();
      } else if (expected instanceof Error) {
        expect(() => toDateRange(input)).toThrow(expected);
      } else {
        expect(toDateRange(input)).toStrictEqual(expected);
      }
    });
  });

  describe('toDateString', () => {
    const values: [
      input: DateRange | undefined,
      expected: string | undefined | Error,
    ][] = [
      [undefined, undefined],
      [null, undefined],
      [[new Date(2025, 0, 1), new Date(2025, 0, 1)], '01.01.2025 - 01.01.2025'],
    ];
    it.each(values)('should handle %o', (input, expected) => {
      if (expected === undefined) {
        expect(toDateRangeString(input)).toBeUndefined();
        expect(toDateRangeString(input, 'default')).toBe('default');
      } else if (expected instanceof Error) {
        expect(() => toDateRangeString(input)).toThrow(expected);
        expect(() => toDateRangeString(input, 'default')).toThrow(expected);
      } else {
        expect(toDateRangeString(input)).toBe(expected);
        expect(toDateRangeString(input, 'default')).toBe(expected);
      }
    });
  });

  describe('isDateRangeEqual', () => {
    const values: [
      first: DateRange | undefined,
      second: DateRange | undefined,
      expected: boolean,
    ][] = [
      [undefined, undefined, true],
      [null, undefined, true],
      [
        [new Date(2025, 0, 1), new Date(2025, 0, 2)],
        [new Date(2025, 0, 1), new Date(2025, 0, 2)],
        true,
      ],
      [
        [new Date(2025, 0, 1), new Date(2025, 0, 2)],
        [new Date(2025, 0, 1), new Date(2025, 1, 2)],
        false,
      ],
      [[new Date(2025, 0, 1), new Date(2025, 0, 2)], undefined, false],
    ];
    it.each(values)('should handle %o', (first, second, expected) => {
      expect(isDateRangeEqual(first, second)).toBe(expected);
      expect(isDateRangeEqual(second, first)).toBe(expected);
    });
  });
});

// #endregion
