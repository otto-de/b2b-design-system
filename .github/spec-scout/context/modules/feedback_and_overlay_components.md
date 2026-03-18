# Module: feedback_and_overlay_components

## Module Ownership
- **Primary Responsibility:** Provide all status/feedback and overlay UI components — `b2b-alert`, `b2b-snackbar`, `b2b-modal`, `b2b-tooltip`, `b2b-flyout-menu`, `b2b-progress-bar`, `b2b-spinner`, and `b2b-shimmer` — each as a self-contained Stencil Web Component that communicates system or interaction state to the user via visual overlays, indicators, or inline messages.
- **Explicit Non-Responsibilities:** Does not own user-input or selection controls (owned by `form_components`); does not own icon SVG rendering (owned by `icon_system`); does not own navigation tabs, pagination, or breadcrumbs (owned by `navigation_components`); does not own focus-trap implementation (`shared_utilities` — consumed as boundary); does not own design tokens (`tokens`).
- **Integration Boundaries:**
  - `consumes ← tokens` (build-time): Component SCSS consumes token CSS custom properties for colours, spacing, and sizing.
  - `consumes ← icon_system` (runtime): `b2b-alert` and `b2b-snackbar` render `<b2b-icon-100>` elements internally to display type-specific icons. `b2b-modal` renders `<b2b-icon-100 icon="b2b_icon-close">` in its header. `b2b-flyout-menu` trigger slot accepts `b2b-icon` or icon-based elements.
  - `consumes ← shared_utilities/focus-trap` (runtime): `b2b-modal` uses `queryShadowRoot`, `isFocusable`, and `isHidden` from `utils/focus-trap.ts` to implement keyboard focus containment.
  - `consumes ← shared_utilities/utils.ts` (runtime): `b2b-flyout-menu` uses `isClickOutside` for outside-click detection to close the menu.
  - `consumes ← shared_utilities/status.interface` (compile-time): `b2b-modal` imports `BeforeCloseEventDetail` and `CloseEventTrigger` from `utils/interfaces/status.interface.d.ts`.
  - `consumes ← layout_and_content_components` (runtime): `b2b-modal` renders `<b2b-headline>` internally for its header title.
  - `produces → react_components` (indirect): All components included in the Stencil React output-target proxy generation.

---

## Entry Points

| Tag | Component | Primary Role |
|-----|-----------|-------------|
| `<b2b-alert>` | `AlertComponent` | Inline status message (info/success/warning/error) with optional close button |
| `<b2b-snackbar>` | `SnackbarComponent` | Transient toast notification with optional auto-dismiss timer and CTA |
| `<b2b-modal>` | `ModalComponent` | Full-screen overlay dialog with focus trapping, backdrop/ESC/button dismiss, and header/body/footer slots |
| `<b2b-tooltip>` | `B2BTooltipComponent` | Contextual floating tooltip triggered by hover, focus, or manual `opened` prop |
| `<b2b-flyout-menu>` | `FlyoutMenuComponent` | Anchored dropdown menu with keyboard navigation for slotted `b2b-flyout-menu-option` children |
| `<b2b-progress-bar>` | `ProgressBarComponent` | Linear progress indicator with optional label (below or side placement) |
| `<b2b-spinner>` | `SpinnerComponent` | Animated loading indicator at three sizes and three colour variants |
| `<b2b-shimmer>` | `ShimmerComponent` | Skeleton loading placeholder with configurable dimensions; replaces slotted content while `loading=true` |

---

## FLOW 1: Alert — Open & Close

- **Trigger:** Consumer sets `opened=true` on `<b2b-alert>`.
- **Steps:**
  1. `@Watch('opened')` reflects the new value; `b2b-alert--open` CSS class is applied/removed to show/hide.
  2. For `size='large'`, text content from the default slot is rendered; icon is auto-selected by type (`b2b_icon-info`, `b2b_icon-success`, etc.) via `b2b-icon-100`. Setting `customIcon=true` on `size='small'` allows a slotted custom icon instead.
  3. Close button renders only if `hasCloseButton=true` AND `size='large'` AND `type !== 'error'` (errors cannot be dismissed).
  4. User clicks close button: `this.opened = false`; `b2b-close` event emitted with `void`.
- **Exit Point:** Alert hidden; `b2b-close` event dispatched to consumer.
- **Impacted Areas:** `src/components/alert/alert.tsx`, `src/components/alert/alert.scss`.

---

## FLOW 2: Snackbar — Timed Auto-Dismiss

- **Trigger:** Consumer sets `opened=true` on `<b2b-snackbar>`.
- **Steps:**
  1. `@Watch('opened')` → `open()` called → if `timed=true` and `type !== 'error'`, `startTimer()` begins a `window.setTimeout` for `duration` ms (default 5000ms).
  2. User hovers over snackbar: `handleMouseEnter` computes elapsed time, subtracts from `remainingTime`, clears the timer (pause-on-hover).
  3. User moves cursor away: `handleMouseLeave` → `startTimer()` restarts with `remainingTime`.
  4. Timer expires (or user clicks close icon): `close()` — sets `opened=false`, emits `b2b-close`, clears timer.
  5. Optional CTA: if `hasAction=true`, a labelled link (`actionLabel`) is rendered; click emits `b2b-action-click` event.
  6. Error snackbars (`type='error'`) ignore `timed` and stay until manually closed.
  7. `disconnectedCallback` clears any pending `timeoutId` to prevent memory leaks.
- **Exit Point:** Snackbar hidden; `b2b-close` emitted (timer or manual close); `b2b-action-click` emitted on CTA click.
- **Impacted Areas:** `src/components/snackbar/snackbar.tsx`.

---

## FLOW 3: Modal — Open, Focus Trap, & Dismissal

- **Trigger:** Consumer sets `opened=true` on `<b2b-modal>`.
- **Steps:**
  1. `@Watch('opened')` → `open()`: sets `isOpen=true`, applies `b2b-modal--open` CSS.
  2. `componentDidLoad`: `queryShadowRoot` (from `shared_utilities/focus-trap`) traverses the shadow DOM to collect all focusable elements (excluding hidden and `data-focus-trap-edge` sentinel elements) into `this.focusableElements`.
  3. `componentDidRender`: `attemptFocus` moves focus to the first focusable element inside the modal dialog.
  4. Two sentinel `div[data-focus-trap-edge]` elements bracket the dialog; `onFocus` on the top sentinel wraps to the last focusable element; bottom sentinel wraps to the first — creating a keyboard focus loop.
  5. Dismiss triggers:
     - **Close button click** → `emitBeforeClose('CLOSE_BUTTON')` → emits `b2b-before-close` with `{ trigger }`. If the event is `preventDefault()`-ed by the consumer, the modal stays open. Otherwise `opened=false` → `close()` → `b2b-close` emitted.
     - **Escape key** (`@Listen('keydown')`) → `emitBeforeClose('ESCAPE_KEY')` if `escDismiss=true`.
     - **Backdrop click** → `emitBeforeClose('BACKDROP')` if `backdropDismiss=true`.
- **Exit Point:** Modal hidden; `b2b-before-close` (cancellable) then `b2b-close` emitted.
- **Impacted Areas:** `src/components/modal/modal.tsx`, `src/utils/focus-trap.ts`, `src/utils/interfaces/status.interface.d.ts`.

---

## FLOW 4: Tooltip — Visibility by Trigger Mode

- **Trigger:** User interaction with the element slotted inside `<b2b-tooltip>`.
- **Steps:**
  1. `connectedCallback`: the first non-`[slot]` child element is stored as `triggerEl`. `focus` and `blur` event listeners are attached manually (capture phase) to support Shadow DOM focus traversal.
  2. **Hover trigger**: `onMouseEnter`/`onMouseLeave` on the Host set `opened=true/false`.
  3. **Focus trigger**: `onFocus`/`onBlur` events on `triggerEl` set `opened=true/false`.
  4. **Custom trigger**: consumer sets `opened` prop directly; component reflects it via `@Watch('opened')`.
  5. Tooltip position (`left`/`right`/`top`/`bottom`) drives CSS class applied to the tooltip content container.
  6. Content from `content` prop or named `content` slot is rendered inside the tooltip bubble.
  7. `disconnectedCallback`: removes manually registered focus/blur listeners to prevent leaks.
- **Exit Point:** Tooltip visible/hidden based on trigger; no events emitted.
- **Impacted Areas:** `src/components/tooltip/tooltip.tsx`.

---

## FLOW 5: Flyout Menu — Keyboard-Navigable Menu

- **Trigger:** User clicks or focuses the trigger element slotted inside `<b2b-flyout-menu>`.
- **Steps:**
  1. `connectedCallback`: first non-`[option]` child element is stored as `triggerEl`. Click and blur listeners attached manually (capture phase).
  2. Trigger click → `toggleMenu()`: flips `opened` state. `isClickOutside` check via `@Listen('keydown')` and document-level listeners close the menu when focus moves away.
  3. Keyboard navigation (`@Listen('keydown')`):
     - `ArrowDown`/`ArrowUp`: moves `tabindex=0` among `b2b-flyout-menu-option` children (cycling through via focus shift).
     - `Home`/`End`: jump to first/last option.
     - `Escape`/`Tab`: close menu, return focus to trigger.
  4. Option selection delegates to the individual `b2b-flyout-menu-option` element; the flyout does not emit a selection event itself.
  5. Blur on trigger (`blurMenu`) closes the menu unless focus has moved to an option within it.
- **Exit Point:** Menu opened/closed; keyboard focus managed within menu options; no module-level selection event.
- **Impacted Areas:** `src/components/flyout-menu/flyout-menu.tsx`, `src/utils/utils.ts` (`isClickOutside`).

---

## FLOW 6: Progress Bar — Value Display

- **Trigger:** Consumer sets `progress` (0–100) and optional `label` props on `<b2b-progress-bar>`.
- **Steps:**
  1. `getProgress()` clamps input: values < 0 → 0; values > 100 → 100; NaN → 0.
  2. Inner `b2b-progress-bar__progress` div width is set inline to `${progress}%`.
  3. Label rendered conditionally based on `labelType` (`below` | `side`) and `labelPosition` (`left` | `right`).
- **Exit Point:** Visual progress bar rendered with label; no events emitted.
- **Impacted Areas:** `src/components/progress-bar/progress-bar.tsx`.

---

## FLOW 7: Shimmer — Loading State Placeholder

- **Trigger:** Consumer sets `loading=true` and provides `width` + `height` dimensions.
- **Steps:**
  1. When `loading=true`: renders a `div.b2b-shimmer` with inline `width`/`height` styles; animated shimmer effect via SCSS `@keyframes`.
  2. When `loading=false`: renders the default slot (actual content) in place of the shimmer.
- **Exit Point:** Shimmer placeholder shown while loading; real content shown when loaded.
- **Impacted Areas:** `src/components/shimmer/shimmer.tsx`.
