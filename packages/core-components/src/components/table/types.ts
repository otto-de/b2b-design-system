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

export const TableSortDirections = {
  NOT: 'not-sorted',
  ASC: 'ascending',
  DESC: 'descending',
} as const;
export type TableSortDirections = 
  (typeof TableSortDirections)[keyof typeof TableSortDirections];
