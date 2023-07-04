import { Component, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'b2b-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class BreadCrumbComponent {
  @Element() host: HTMLB2bBreadcrumbElement;

  componentWillRender() {
    this.setStepsState();
  }

  private setStepsState = () => {
    const steps = this.getChildSteps();
    const last = steps.length - 1;
    steps.map((step: HTMLB2bBreadcrumbItemElement, index) => {
      step.isLast = index === last;
    });
  };

  private getChildSteps = () => {
    return Array.from(this.host.querySelectorAll('b2b-breadcrumb-item'));
  };

  render() {
    return (
      <Host>
        <div class="obc_breadcrumb-nav">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
