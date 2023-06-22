import { Component, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';
import { PaginationConstants } from './pagination.constants';
import { PageChangeEventDetail } from '../../utils/interfaces/interaction.interface';

@Component({
  tag: 'b2b-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class PaginationComponent {
  /** The total number of pages to calculate the length of pagination component */
  @Prop() totalPages: number = 1;

  /** Use this property to set programmatically the active page */
  @Prop({ mutable: true, reflect: true }) activePage: number = 1;

  /** (optional) translation to 'Go to next page'  */
  @Prop() ariaLabelNextPage = 'Go to next page';
  /** (optional) translation to 'Go to previous page'  */
  @Prop() ariaLabelPreviousPage = 'Go to previous page';

  /** Will emit every time a page changes, by clicking back, next or any specific page. \
   * Emits a PageChangeEventDetail that includes lastSelectedPage, currentPage
   * and direction. Direction is only when clicking back or next.
   **/
  @Event({ eventName: 'b2b-page-change' })
  b2bPageChange: EventEmitter<PageChangeEventDetail>;

  private firstPageIndex = 1;
  private navItems: (string | number)[] = [];

  connectedCallback() {
    this.navItems = this.getNavItems();
  }

  @Watch('totalPages')
  onTotalPagesChange(newValue: number) {
    this.navItems = this.getNavItems();
    if (this.activePage > newValue) {
      this.activePage = newValue;
    }
  }

  @Watch('activePage')
  onActivePageChange(newValue: number) {
    this.navItems = this.getNavItems();
    if (newValue > this.totalPages) {
      this.activePage = this.totalPages;
    }
  }

  private selectNextPage = () => {
    this.updateState(this.activePage + 1, 'NEXT');
  };

  private selectPreviousPage = () => {
    this.updateState(this.activePage - 1, 'PREVIOUS');
  };

  private setSelectedPage = (navItem, index) => {
    let nextActivePage;
    if (navItem === PaginationConstants.DOTS) {
      const isLeftDotsSelected = index === 1; // left dots will always be the second item
      nextActivePage = isLeftDotsSelected
        ? this.activePage - 2
        : this.activePage + 2;
    } else {
      nextActivePage = navItem;
    }
    this.updateState(nextActivePage);
  };

  private updateState(nextActivePage, direction?) {
    const lastActivePage = this.activePage;
    this.activePage = nextActivePage;
    this.navItems = this.getNavItems();
    this.b2bPageChange.emit({
      lastSelectedPage: lastActivePage,
      currentPage: this.activePage,
      direction: direction,
    });
  }

  private getNavItems() {
    if (this.totalPages <= 5) {
      return this.getArrayFrom(1, this.totalPages);
    }

    const leftSiblingIndex = Math.max(this.activePage - 1, this.firstPageIndex);
    const rightSiblingIndex = Math.min(this.activePage + 1, this.totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < this.totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = this.getArrayFrom(this.firstPageIndex, 3);
      return [...leftRange, PaginationConstants.DOTS, this.totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = this.getArrayFrom(
        this.totalPages - 2,
        this.totalPages,
      );
      return [this.firstPageIndex, PaginationConstants.DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = this.getArrayFrom(
        leftSiblingIndex,
        rightSiblingIndex,
      );
      return [
        this.firstPageIndex,
        PaginationConstants.DOTS,
        ...middleRange,
        PaginationConstants.DOTS,
        this.totalPages,
      ];
    }
  }

  private getArrayFrom(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
  }

  private getItemClass(navItem) {
    return {
      'b2b-pagination__first-item': navItem === this.firstPageIndex,
      'b2b-pagination__last-item': navItem === this.totalPages,
      'b2b-pagination__item': true,
    };
  }

  render() {
    return (
      <nav>
        <ol class="b2b-pagination">
          {this.activePage !== 1 && (
            <li class="b2b-pagination--previous">
              <b2b-button
                onClick={this.selectPreviousPage}
                size="50"
                variant="secondary"
                aria-label={this.ariaLabelPreviousPage}>
                {PaginationConstants.BACK}
              </b2b-button>
            </li>
          )}
          {this.navItems.map((navItem, index) => {
            const isItemActive = this.activePage === navItem;
            return (
              <li class={this.getItemClass(navItem)}>
                <b2b-button
                  onClick={() => this.setSelectedPage(navItem, index)}
                  active={isItemActive}
                  disabled={isItemActive}
                  size="50"
                  variant="secondary">
                  {navItem}
                </b2b-button>
              </li>
            );
          })}
          {this.activePage !== this.totalPages && (
            <li class="b2b-pagination--next">
              <b2b-button
                onClick={this.selectNextPage}
                size="50"
                variant="secondary"
                aria-label={this.ariaLabelNextPage}>
                {PaginationConstants.NEXT}
              </b2b-button>
            </li>
          )}
        </ol>
      </nav>
    );
  }
}
