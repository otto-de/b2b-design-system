export function updateCheckboxState(
  rows: HTMLB2bTableRowElement[],
  header: HTMLB2bTableRowElement,
): void {
  let someSelected = rows.some(item => item.checked === true);
  let everySelected = rows.every(item => item.checked === true);

  header.checked = everySelected;
  header.indeterminate = someSelected && !everySelected;
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
