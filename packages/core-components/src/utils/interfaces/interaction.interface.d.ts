import { CalendarView } from '../../components/calendar/calendar.types';

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
export interface EscapePressed<T = any> {}
export interface PreviousMonth<T = any> {}
export interface NextMonth<T = any> {}
export interface CalendarViewChangedEventDetail<T = CalendarView> {
  value: T;
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
