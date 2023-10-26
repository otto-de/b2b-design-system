import {
  Component,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
  Element,
  Listen,
} from '@stencil/core';
import { TabChangeEventDetail } from '../../utils/interfaces/interaction.interface';

const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const HOME = 'Home';
const END = 'End';

@Component({
  tag: 'b2b-tab-group',
  shadow: true,
})
export class B2bTabGroupComponent {
  @Element() hostElement: HTMLB2bTabGroupElement;

  /** Determines if the Tab Group will do it's own navigation. Per default, it will use internal navigation.
   * Set it to true if you want to use external, route-based navigation. */
  @Prop() useRouter: boolean = false;

  /** Emits the previous and the next tab panel whenever a new panel is selected. */
  @Event({ eventName: 'b2b-selected' })
  b2bSelected: EventEmitter<TabChangeEventDetail>;

  @Listen('click')
  handleClick(event: MouseEvent) {
    if (this.useRouter) {
      return;
    } else {
      const nextTab = event.target as HTMLB2bTabElement;
      if (nextTab.getAttribute('role') != 'tab') {
        return;
      }
      this.selectTab(nextTab);
    }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    if (this.useRouter) {
      return;
    } else {
      const target = event.target as HTMLB2bTabElement;
      let nextTab;

      if (target.getAttribute('role') !== 'tab') {
        return;
      }

      // Do not handle modifier shortcuts typically used by assistive technology
      if (event.altKey) {
        return;
      }

      switch (event.key) {
        case ARROW_LEFT:
          nextTab = this.getPreviousTab();
          break;
        case ARROW_RIGHT:
          nextTab = this.getNextTab();
          break;
        case HOME:
          nextTab = this.getFirstTab();
          break;
        case END:
          nextTab = this.getLastTab();
          break;
        default:
          return;
      }

      event.preventDefault();
      this.selectTab(nextTab);
    }
  }

  componentDidRender() {
    Promise.all([
      customElements.whenDefined('b2b-tab'),
      customElements.whenDefined('b2b-tab-panel'),
    ]).then(() => {
      if (!this.useRouter) {
        this.linkPanels();
      }
    });
  }

  private getPreviousTab = (): HTMLB2bTabElement => {
    const tabs = this.getAllEnabledTabs();
    const index = tabs.findIndex(tab => tab.selected) - 1;
    return index === -1 ? tabs[tabs.length - 1] : tabs[index];
  };

  private getNextTab = (): HTMLB2bTabElement => {
    const tabs = this.getAllEnabledTabs();
    const index = tabs.findIndex(tab => tab.selected) + 1;
    return tabs[index % tabs.length];
  };

  private getFirstTab = (): HTMLB2bTabElement => {
    const tabs = this.getAllEnabledTabs();
    return tabs[0];
  };

  private getLastTab = (): HTMLB2bTabElement => {
    const tabs = this.getAllEnabledTabs();
    return tabs[tabs.length - 1];
  };

  private getAllEnabledTabs = (): HTMLB2bTabElement[] => {
    return Array.from(
      this.hostElement.querySelectorAll('b2b-tab:not([disabled])'),
    );
  };

  private getAllPanels = (): HTMLB2bTabPanelElement[] => {
    return Array.from(this.hostElement.querySelectorAll('b2b-tab-panel'));
  };

  private linkPanels = () => {
    const tabs = this.getAllEnabledTabs();
    const selectedTab = tabs.find(x => x.selected);

    tabs.forEach(tab => {
      const panel = tab.nextElementSibling;
      tab.setAttribute('aria-controls', panel.id);
      panel.setAttribute('aria-labelledby', tab.id);
    });

    if (selectedTab != null || undefined) {
      this.selectTab(selectedTab);
    } else {
      this.selectTab(tabs[0]);
    }
  };

  private findPanelForTab = (
    tab: HTMLB2bTabElement,
  ): HTMLB2bTabPanelElement => {
    const panelId = tab.getAttribute('aria-controls');
    return this.hostElement.querySelector(`#${panelId}`);
  };

  private selectTab = (nextTab: HTMLB2bTabElement) => {
    const nextPanel = this.findPanelForTab(nextTab);
    const previousTab = this.getPreviousTab();
    this.reset();
    nextPanel.hidden = false;
    nextTab.selected = true;

    this.b2bSelected.emit({ previousTab: previousTab, nextTab: nextTab });
  };

  private reset = () => {
    const tabs = this.getAllEnabledTabs();
    const panels = this.getAllPanels();

    tabs.forEach(tab => (tab.selected = false));
    panels.forEach(panel => (panel.hidden = true));
  };

  render() {
    return (
      <Host>
        <slot name="tab" />
        <b2b-separator></b2b-separator>
        <slot name="panel" />
      </Host>
    );
  }
}
