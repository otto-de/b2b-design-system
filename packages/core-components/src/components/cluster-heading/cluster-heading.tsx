import {
  Component,
  h,
  Prop,
  State,
  Event,
  EventEmitter,
  Host,
} from '@stencil/core';

/**
 * Cluster Heading component for content separation and optional accordion functionality.
 * Provides a standardized way to create section headings with collapsible content.
 */
@Component({
  tag: 'b2b-cluster-heading',
  styleUrl: 'cluster-heading.scss',
  shadow: true,
})
export class ClusterHeadingComponent {
  /** The label text displayed in the heading. */
  @Prop() label!: string;

  /** Whether the heading has accordion functionality. Per default, it is false. */
  @Prop() collapsible: boolean = false;

  /** The default state of the accordion (open or closed). Only applies when collapsible is true. Per default, it is true (open). */
  @Prop() open: boolean = true;

  /** Whether the heading is in error state. Shows label in error color. Per default, it is false. */
  @Prop() error: boolean = false;

  /** Whether the heading should take full width. Per default, it is true. */
  @Prop() fullWidth: boolean = true;

  /** Internal state tracking whether the accordion is currently open. */
  @State() private isOpen: boolean = true;

  /** Emits when the accordion state changes. Emits the new open state (true/false). */
  @Event({ eventName: 'b2b-toggle' })
  b2bToggle: EventEmitter<boolean>;

  private contentId = `cluster-heading-content-${Math.random().toString(36).substr(2, 9)}`;
  private headingId = `cluster-heading-${Math.random().toString(36).substr(2, 9)}`;

  connectedCallback() {
    this.isOpen = this.open;
  }

  private handleHeaderClick = () => {
    if (this.collapsible) {
      this.toggleAccordion();
    }
  };

  private handleHeaderKeydown = (event: KeyboardEvent) => {
    if (this.collapsible && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.toggleAccordion();
    }
  };

  private toggleAccordion = () => {
    this.isOpen = !this.isOpen;
    this.b2bToggle.emit(this.isOpen);
  };

  render() {
    const headerClasses = {
      'b2b-cluster-heading__header': true,
      'b2b-cluster-heading__header--collapsible': this.collapsible,
      'b2b-cluster-heading__header--error': this.error,
    };

    const hostClasses = {
      'b2b-cluster-heading': true,
      'b2b-cluster-heading--full-width': this.fullWidth,
    };

    return (
      <Host class={hostClasses}>
        <div
          id={this.headingId}
          class={headerClasses}
          role={this.collapsible ? 'button' : null}
          tabIndex={this.collapsible ? 0 : null}
          aria-expanded={this.collapsible ? String(this.isOpen) : null}
          aria-controls={this.collapsible ? this.contentId : null}
          onClick={this.handleHeaderClick}
          onKeyDown={this.handleHeaderKeydown}>
          <span class="b2b-cluster-heading__label">{this.label}</span>
          {this.collapsible && (
            <b2b-icon
              icon={this.isOpen ? 'b2b_icon-arrow-up' : 'b2b_icon-arrow-down'}
              color="inherit"
              class="b2b-cluster-heading__icon"></b2b-icon>
          )}
        </div>
        {this.collapsible && (
          <div
            id={this.contentId}
            class={{
              'b2b-cluster-heading__content': true,
              'b2b-cluster-heading__content--open': this.isOpen,
              'b2b-cluster-heading__content--closed': !this.isOpen,
            }}
            aria-labelledby={this.headingId}
            role="region">
            <slot></slot>
          </div>
        )}
        {!this.collapsible && <slot></slot>}
      </Host>
    );
  }
}
