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

export interface BreadCrumbChangeEventDetail<T = any> {
  value: T;
}

export interface ToggleChipEventDetail<T = string> {
  value: T;
}

export interface ToggleSwitchEventDetail<T = boolean> {
  value: T;
}
