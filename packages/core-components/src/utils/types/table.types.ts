export const TableSizes = {
  EQUAL: 'equal',
  EXPAND: 'expand',
} as const;
export type TableSizes = (typeof TableSizes)[keyof typeof TableSizes];

export const TableRowgroupTypes = {
  HEADER: 'header',
  BODY: 'body',
  FOOTER: 'footer',
} as const;
export type TableRowgroupTypes =
  (typeof TableRowgroupTypes)[keyof typeof TableRowgroupTypes];

export const ContentAlignment = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
} as const;
export type ContentAlignment =
  (typeof ContentAlignment)[keyof typeof ContentAlignment];
export const SortIconAlignment = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
} as const;
export type SortIconAlignment =
  (typeof SortIconAlignment)[keyof typeof SortIconAlignment];

export const TableSortDirections = {
  NOT: 'not-sorted',
  ASC: 'ascending',
  DESC: 'descending',
} as const;
export type TableSortDirections =
  (typeof TableSortDirections)[keyof typeof TableSortDirections];

export const TableAccordionRowTypes = {
  PARENT: 'parent',
  CHILD: 'child',
  HEADER: 'header',
} as const;
export type TableAccordionRowTypes =
  (typeof TableAccordionRowTypes)[keyof typeof TableAccordionRowTypes];

export const TableCheckboxTypes = {
  HEADER: 'header',
  ROW: 'row',
} as const;
export type TableCheckboxTypes =
  (typeof TableCheckboxTypes)[keyof typeof TableCheckboxTypes];

export const TableColourOptions = {
  DEFAULT: 'default',
  SELECTED: 'selected',
  GROUP: 'group',
} as const;
export type TableColourOptions = 'default' | 'selected' | 'group';
