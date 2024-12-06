export function updateCheckboxState(
  rows: HTMLB2bTableRowElement[],
  header: HTMLB2bTableRowElement,
): void {
  let someSelected = rows.some(item => item.checked === true);
  let everySelected = rows.every(item => item.checked === true);

  header.checked = everySelected;
  header.indeterminate = someSelected && !everySelected;
}
/** Sets appropriate column width for colspan table */
export function setFlexBase(
  host: HTMLB2bTableCellElement | HTMLB2bTableHeaderElement,
  colspan: number,
  totalCols: number,
  selectable: boolean,
  accordion: boolean,
): void {
  const flexBase = colspan != undefined ? colspan : 1;
  let border = 0;
  // factor in dividers for multi columns
  if (flexBase > 1) {
    border = flexBase;
  }
  // calculate space for control columns
  const checkboxSpace = selectable ? (40 / totalCols) * flexBase : 0;
  const accordionSpace = accordion ? (48 / totalCols) * flexBase : 0;
  const style = `calc((${(flexBase / totalCols) * 100}% - ${
    checkboxSpace + accordionSpace
  }px) - ${24 - border}px)`;
  host.style.flexBasis = style;
}

export function getAllRows(
  hostEl: HTMLB2bTableElement | HTMLB2bTableRowgroupElement,
): HTMLB2bTableRowElement[] {
  return Array.from(hostEl.querySelectorAll('b2b-table-row'));
}

export function getRemainingRows(
  hostEl: HTMLB2bTableElement | HTMLB2bTableRowgroupElement,
): HTMLB2bTableRowElement[] {
  return (
    Array.from(
      hostEl.querySelectorAll('b2b-table-row'),
    ) as HTMLB2bTableRowElement[]
  ).slice(1);
}

export function getFirstRow(
  hostEl: HTMLB2bTableElement | HTMLB2bTableRowgroupElement,
): HTMLB2bTableRowElement {
  const firstRow = hostEl.querySelector('b2b-table-row');
  if (firstRow != null) {
    return firstRow as HTMLB2bTableRowElement;
  }
}

export function isFirstRow(el: HTMLElement) {
  // attr is nullable so
  // eslint-disable-next-line @stencil-community/strict-boolean-conditions
  return el.previousElementSibling ? false : true;
}
