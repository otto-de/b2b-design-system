import { newSpecPage } from '@stencil/core/testing';
import { PaginationComponent } from './pagination';
import { AnyHTMLElement } from '@stencil/core/internal/stencil-private';
import { PaginationConstants } from './pagination.constants';

describe('B2B-Pagination', () => {
  const backAndForwardItems = 2;

  const getItem = (page, itemText) => {
    const allItemElements = page.root.shadowRoot.querySelectorAll(
      'li.b2b-pagination__item b2b-button',
    );
    const allItems: AnyHTMLElement[] = Array.from(allItemElements);
    return allItems.find(item => item.textContent === itemText);
  };

  it('active page should be 1 by default', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination></b2b-pagination>`,
    });
    expect(page.rootInstance.activePage).toBe(1);
  });

  it('total pages should be 1 by default', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination></b2b-pagination>`,
    });
    expect(page.rootInstance.totalPages).toBe(1);
  });

  it('selected element must render button as active', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='5' active-page='1'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const firstItem = getItem(page, '1');
    const isSelectedButtonActive = firstItem.getAttribute('active');
    expect(isSelectedButtonActive).not.toBeNull();

    const secondItem = getItem(page, '2');
    const isSecondButtonActive = secondItem.getAttribute('active');

    expect(isSecondButtonActive).toBeNull();
  });

  it('should show at most 5 items', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='10' active-page='2'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const listElements = page.root.shadowRoot.querySelectorAll('li');
    expect(listElements.length).toBe(5 + backAndForwardItems);
  });

  it('should show total number of pages in the last item', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='10'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const lastItemNPosition = 2;
    const lastItemSelector = `li.b2b-pagination__item:nth-last-of-type(${lastItemNPosition})`;
    const lastItem = page.root.shadowRoot.querySelector(lastItemSelector);
    expect(lastItem.textContent).toBe('10');
  });

  it('should show dots on the second to last item when initial items active and total pages greater than 5', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='10' active-page='1'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const secondToLastItemSelector = `li.b2b-pagination__item:nth-last-of-type(3)`;
    const lastItem = page.root.shadowRoot.querySelector(
      secondToLastItemSelector,
    );
    expect(lastItem.textContent).toBe(PaginationConstants.DOTS);
  });

  it('should show dots on the second item when any of last items are active', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='10' active-page='8'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const secondItemSelector = `li.b2b-pagination__item:nth-of-type(3)`;
    const secondItem = page.root.shadowRoot.querySelector(secondItemSelector);
    expect(secondItem.textContent).toBe(PaginationConstants.DOTS);
  });

  it('should show dots on the second and second to last items when middle item is active', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='10' active-page='5'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const secondItemSelector = `li.b2b-pagination__item:nth-of-type(3)`;
    const secondItem = page.root.shadowRoot.querySelector(secondItemSelector);
    expect(secondItem.textContent).toBe(PaginationConstants.DOTS);

    const secondToLastItemSelector = `li.b2b-pagination__item:nth-last-of-type(3)`;
    const lastItem = page.root.shadowRoot.querySelector(
      secondToLastItemSelector,
    );
    expect(lastItem.textContent).toBe(PaginationConstants.DOTS);
  });

  it('should not show dots when 5 items or less', async () => {
    const page = await newSpecPage({
      components: [PaginationComponent],
      html: `<b2b-pagination total-pages='5' active-page='2'></b2b-pagination>`,
    });

    await page.waitForChanges();

    const secondItemSelector = `li.b2b-pagination__item:nth-of-type(3)`;
    const secondItem = page.root.shadowRoot.querySelector(secondItemSelector);
    expect(secondItem.textContent).toBe('2');

    const secondToLastItemSelector = `li.b2b-pagination__item:nth-last-of-type(3)`;
    const lastItem = page.root.shadowRoot.querySelector(
      secondToLastItemSelector,
    );
    expect(lastItem.textContent).toBe('4');
  });
});
