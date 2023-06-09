export type PaginationEventDirection = 'PREVIOUS' | 'NEXT';

export interface PageChangeEventDetail {
  lastSelectedPage: number;
  currentPage: number;
  direction?: PaginationEventDirection;
}

export interface TabChangeEventDetail {
  previousTab: HTMLB2bTabElement;
  nextTab: HTMLB2bTabElement;
}

export interface ColumnSortChangeEventDetail {
  sortedColumn: string;
  sortDirection: string;
}
