import { Component, h, Host } from '@stencil/core';
let i = 0;
@Component({
  tag: 'b2b-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true,
})
export class B2bTabPanelComponent {
  private generatedId: number = i++;

  render() {
    return (
      <Host id={`b2b-tab-panel-${this.generatedId}`} role="tabpanel">
        <div class="b2b-tab-panel">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
