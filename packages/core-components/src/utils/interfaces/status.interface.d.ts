export type CloseEventTrigger = 'CLOSE_BUTTON' | 'ESCAPE_KEY' | 'BACKDROP';

export interface BeforeCloseEventDetail {
  trigger: CloseEventTrigger;
}
