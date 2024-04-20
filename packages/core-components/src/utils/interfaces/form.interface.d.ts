export interface InputChangeEvent {
  value: string | undefined | null;
}

export interface RadioEventDetail<T = any> {
  value: T;
  checked: boolean;
}

export interface CheckboxEventDetail<T = any> {
  value: T;
  checked: boolean;
}

export interface SearchClickEventDetail<T = any> {
  searchTerm: string;
}

export interface OptionSelectedEventDetail<T = any> {
  selectedOption: string;
}

export interface DateSelectedEventDetail {
  selectedDate: Date;
}

export interface MultiSelectOptionEventDetail {
  selected: boolean;
  selectedOption: string;
}

export interface InputClear<T = any> {}

export interface EscapePressed<T = any> {}

export interface HTMLB2bFormElement {
  error?: string;
  invalid?: boolean;
  disabled?: boolean;
  hint?: string;
  groupDisabled?: boolean;
}

export interface ToggleButtonEventDetail<T = any> {
  value: T;
}
export interface ChipComponentEventDetail<T = any> {
  value: T;
}
export interface CalendarEventDetail<T = any> {
  selectedDate: Date;
}
