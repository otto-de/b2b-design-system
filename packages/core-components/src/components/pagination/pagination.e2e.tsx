import { newE2EPage } from '@stencil/core/testing';
import { PaginationConstants } from './pagination.constants';

describe('B2B-Pagination', () => {
  let page;
  const getPaginationElement = async page =>
    await page.find('b2b-pagination >>> nav');
  const clickBack = async pagination => {
    const backButton = await pagination.find({
      text: PaginationConstants.BACK,
    });
    await backButton.click();
  };
  const clickNext = async pagination => {
    const nextButton = await pagination.find({
      text: PaginationConstants.NEXT,
    });
    await nextButton.click();
  };

  const navigationItemsSelector = 'b2b-pagination >>> li.b2b-pagination--item';

  it('should set next page to active when click on next button', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='1'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let firstItem = await pagination.find({ text: '1' });
    expect(firstItem).toHaveAttribute('active');

    await clickNext(pagination);

    await page.waitForChanges();

    firstItem = await pagination.find({ text: '1' });

    expect(firstItem).not.toHaveAttribute('active');

    const secondItem = await pagination.find({ text: '2' });
    expect(secondItem).toHaveAttribute('active');
  });

  it('should set previous page to active when click on previous button', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='5'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let lastItem = await pagination.find({ text: '5' });
    expect(lastItem).toHaveAttribute('active');

    await clickBack(pagination);

    await page.waitForChanges();

    lastItem = await pagination.find({ text: '5' });
    expect(lastItem).not.toHaveAttribute('active');

    const secondItem = await pagination.find({ text: '4' });
    expect(secondItem).toHaveAttribute('active');
  });

  it('should update the items collection when navigating forward', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='7' active-page='3'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let items = await page.findAll(navigationItemsSelector);

    const startingItemsCollection = ['1', '2', '3', '...', '7'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(startingItemsCollection[index]);
    });

    await clickNext(pagination);
    await page.waitForChanges();

    items = await page.findAll(navigationItemsSelector);

    const expectedNextItemCollection = ['1', '...', '3', '4', '5', '...', '7'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedNextItemCollection[index]);
    });
    const nextActiveItem = await pagination.find({ text: '4' });
    expect(nextActiveItem).toHaveAttribute('active');
  });

  it('should update the items collection when navigating back', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='7' active-page='5'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let items = await page.findAll(navigationItemsSelector);

    const startingItemsCollection = ['1', '...', '5', '6', '7'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(startingItemsCollection[index]);
    });

    await clickBack(pagination);
    await page.waitForChanges();

    items = await page.findAll(navigationItemsSelector);

    const expectedBackItemCollection = ['1', '...', '3', '4', '5', '...', '7'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedBackItemCollection[index]);
    });
    const nextActiveItem = await pagination.find({ text: '4' });
    expect(nextActiveItem).toHaveAttribute('active');
  });

  it('should navigate to the selected item', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='7' active-page='1'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let nextSelectedItem = await pagination.find({ text: '2' });
    expect(nextSelectedItem).not.toHaveAttribute('active');
    await nextSelectedItem.click();

    await page.waitForChanges();

    nextSelectedItem = await pagination.find({ text: '2' });
    expect(nextSelectedItem).toHaveAttribute('active');
  });

  it('should jump 2 steps forward when clicking right DOTS', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='10' active-page='3'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    // only one DOTS element in this example - right DOTS
    let dotsItem = await pagination.find({ text: PaginationConstants.DOTS });
    await dotsItem.click();

    await page.waitForChanges();

    const nextItem = await pagination.find({ text: '5' });
    expect(nextItem).toHaveAttribute('active');

    const items = await page.findAll(navigationItemsSelector);
    const expectedBackItemCollection = ['1', '...', '4', '5', '6', '...', '10'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedBackItemCollection[index]);
    });
  });

  it('should jump 2 steps back when clicking left DOTS', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='10' active-page='8'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    // only one DOTS element in this example - left DOTS
    let dotsItem = await pagination.find({ text: PaginationConstants.DOTS });
    await dotsItem.click();

    await page.waitForChanges();

    const nextItem = await pagination.find({ text: '6' });
    expect(nextItem).toHaveAttribute('active');

    const items = await page.findAll(navigationItemsSelector);
    const expectedBackItemCollection = ['1', '...', '5', '6', '7', '...', '10'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedBackItemCollection[index]);
    });
  });

  it('back button should disappear when first page is selected ', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='2'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let backButton = await pagination.find({ text: PaginationConstants.BACK });
    expect(backButton).not.toBeNull();

    let firstPage = await pagination.find({ text: '1' });
    await firstPage.click();

    backButton = await pagination.find({ text: PaginationConstants.BACK });
    expect(backButton).toBeNull();
  });

  it('next button should disappear when last page is selected ', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='4'></b2b-pagination>`,
    );
    await page.waitForChanges();
    const pagination = await getPaginationElement(page);

    let nextButton = await pagination.find({ text: PaginationConstants.NEXT });
    expect(nextButton).not.toBeNull();

    let lastPage = await pagination.find({ text: '5' });
    await lastPage.click();

    nextButton = await pagination.find({ text: PaginationConstants.NEXT });
    expect(nextButton).toBeNull();
  });

  it('should emit event with details when click on next button', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='1'></b2b-pagination>`,
    );
    await page.waitForChanges();

    const paginationEvent = await page.spyOnEvent('b2b-page-change');

    const pagination = await getPaginationElement(page);
    await clickNext(pagination);

    expect(paginationEvent).toHaveReceivedEvent();
    expect(paginationEvent).toHaveFirstReceivedEventDetail({
      lastSelectedPage: 1,
      currentPage: 2,
      direction: 'NEXT',
    });
  });

  it('should emit event with details when click on back button', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='5'></b2b-pagination>`,
    );
    await page.waitForChanges();

    const paginationEvent = await page.spyOnEvent('b2b-page-change');

    const pagination = await getPaginationElement(page);
    await clickBack(pagination);

    expect(paginationEvent).toHaveReceivedEvent();
    expect(paginationEvent).toHaveFirstReceivedEventDetail({
      lastSelectedPage: 5,
      currentPage: 4,
      direction: 'PREVIOUS',
    });
  });

  it('should emit event with details when click on an item', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='1'></b2b-pagination>`,
    );
    await page.waitForChanges();

    const paginationEvent = await page.spyOnEvent('b2b-page-change');

    const pagination = await getPaginationElement(page);
    let nextItem = await pagination.find({ text: '4' });
    await nextItem.click();
    await page.waitForChanges();

    expect(paginationEvent).toHaveReceivedEvent();
    expect(paginationEvent).toHaveFirstReceivedEventDetail({
      lastSelectedPage: 1,
      currentPage: 4,
    });
  });

  it('should refresh items when total items changes dynamically', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='1'></b2b-pagination>`,
    );
    await page.waitForChanges();

    let items = await page.findAll(navigationItemsSelector);
    const expectedInitialCollection = ['1', '2', '3', '4', '5'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedInitialCollection[index]);
    });

    const element = await page.find('b2b-pagination');
    await element.setAttribute('total-pages', 20);
    await page.waitForChanges();

    items = await page.findAll(navigationItemsSelector);
    const expectedUpdatedCollection = ['1', '2', '3', '...', '20'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedUpdatedCollection[index]);
    });
  });

  it('should set selected page to total pages when total items changes dynamically and is lower than selected page', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='20' active-page='10'></b2b-pagination>`,
    );
    await page.waitForChanges();

    let element = await page.find('b2b-pagination');
    expect(element.getAttribute('active-page')).toBe('10');

    await element.setAttribute('total-pages', 5);
    await page.waitForChanges();

    element = await page.find('b2b-pagination');
    expect(element.getAttribute('active-page')).toBe('5');
  });

  it('should refresh items when active page changes dynamically', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='10' active-page='1'></b2b-pagination>`,
    );
    await page.waitForChanges();

    let items = await page.findAll(navigationItemsSelector);
    const expectedInitialCollection = ['1', '2', '3', '...', '10'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedInitialCollection[index]);
    });

    const element = await page.find('b2b-pagination');
    await element.setAttribute('active-page', 5);
    await page.waitForChanges();

    items = await page.findAll(navigationItemsSelector);
    const expectedUpdatedCollection = ['1', '...', '4', '5', '6', '...', '10'];
    items.forEach((item, index) => {
      expect(item.textContent).toBe(expectedUpdatedCollection[index]);
    });
  });

  it('should set selected page to total pages when selected page changes dynamically and is higher than total pages', async () => {
    page = await newE2EPage();
    await page.setContent(
      `<b2b-pagination total-pages='5' active-page='2'></b2b-pagination>`,
    );
    await page.waitForChanges();

    let element = await page.find('b2b-pagination');
    expect(element.getAttribute('active-page')).toBe('2');

    await element.setAttribute('active-page', 20);
    await page.waitForChanges();

    element = await page.find('b2b-pagination');
    expect(element.getAttribute('active-page')).toBe('5');
  });
});
