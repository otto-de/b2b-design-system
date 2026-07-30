import componentsArgs from './components-args.json';
import { replacePropControls } from './replace-prop-controls';

/**
 * Generic story wrapper that auto-sizes its height when a child web component
 * opens a dropdown/popover.
 *
 * Usage in a story render:
 *   html`<b2b-story-open-wrapper data-open-class=".my-component--open">
 *          <my-component>...</my-component>
 *        </b2b-story-open-wrapper>`
 *
 * Attributes:
 *   data-open-class   CSS class selector to watch for inside the child's
 *                     shadow root (required).
 *   data-open-height  padding-bottom applied while open (default: "320px").
 */
class B2bStoryOpenWrapper extends HTMLElement {
  private _observer: MutationObserver | null = null;

  connectedCallback() {
    if (!this.style.display) this.style.display = 'inline-block';
    this.style.transition = 'padding-bottom 0.15s ease';
    requestAnimationFrame(() => this._init());
  }

  disconnectedCallback() {
    this._observer?.disconnect();
  }

  private _init() {
    const watchChildSelector = this.dataset.watchChild;
    const shadowChildSelector = this.dataset.shadowChild;

    const primary: Element | null = watchChildSelector
      ? this.querySelector(watchChildSelector)
      : this.firstElementChild;
    if (!primary) return;

    const setupFromEl = (el: Element) => {
      if (!el.shadowRoot) {
        customElements.whenDefined(el.localName).then(() => setupFromEl(el));
        return;
      }
      if (shadowChildSelector) {
        const nested = el.shadowRoot.querySelector(shadowChildSelector);
        if (nested) {
          nested.shadowRoot
            ? this._setupObserver(nested.shadowRoot)
            : customElements
                .whenDefined(nested.localName)
                .then(
                  () =>
                    nested.shadowRoot && this._setupObserver(nested.shadowRoot),
                );
        } else {
          const childWatcher = new MutationObserver(() => {
            const n = el.shadowRoot?.querySelector(shadowChildSelector!);
            if (!n) return;
            childWatcher.disconnect();
            n.shadowRoot
              ? this._setupObserver(n.shadowRoot)
              : customElements
                  .whenDefined(n.localName)
                  .then(
                    () => n.shadowRoot && this._setupObserver(n.shadowRoot),
                  );
          });
          childWatcher.observe(el.shadowRoot, {
            childList: true,
            subtree: true,
          });
        }
      } else {
        this._setupObserver(el.shadowRoot);
      }
    };

    setupFromEl(primary);
  }

  private _setupObserver(root: ShadowRoot) {
    const openClass = this.dataset.openClass;
    const openHeight = this.dataset.openHeight ?? '320px';
    if (!openClass) return;

    this._observer?.disconnect();
    const update = () => {
      this.style.paddingBottom = root.querySelector(openClass)
        ? openHeight
        : '0px';
    };
    this._observer = new MutationObserver(update);
    this._observer.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
    update();
  }
}

if (!customElements.get('b2b-story-open-wrapper')) {
  customElements.define('b2b-story-open-wrapper', B2bStoryOpenWrapper);
}

/**
 * Default controls can be changed by passing a controls object like so:
 * `{ 'attribute-name': 'control-type' }`
 *
 * Example: `{ 'steps': 'select' }`
 * For all the control types see https://storybook.js.org/docs/react/essentials/controls#annotation
 */
export const getArgTypes = (componentTag: string, controls?: any) => {
  const componentDocs = (componentsArgs as Record<string, any>)[componentTag];
  return replacePropControls(componentDocs, controls);
};

/**
 * Function to hide all arguments from a single story.
 * I wasn't able to find a way to do this in Storybook.
 * This can be used like so:
 * storyName.argTypes = hideAllControls(storyArgTypes);
 * If you find a better way, remove this function and use Storybook solution
 */
export const hideAllControls = (argTypes: any) => {
  const argsWithHiddenControls: Record<string, any> = {};
  Object.keys(argTypes).map(key => {
    argsWithHiddenControls[key] = { table: { disable: true } };
  });
  return argsWithHiddenControls;
};
