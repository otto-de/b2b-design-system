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

export interface HTMLB2bFormElement {
  error?: string;
  invalid?: boolean;
  disabled?: boolean;
  hint?: string;
}

export interface ToggleButtonEventDetail<T = any> {
  value: T;
}
