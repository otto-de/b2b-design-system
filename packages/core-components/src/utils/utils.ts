export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') +
    (middle != null ? ` ${middle}` : '') +
    (last != null ? ` ${last}` : '')
  );
}

export function isClickOutside(event: MouseEvent, host: HTMLElement) {
  let target = event.target as Node;
  const hasShadow = (target as HTMLElement).shadowRoot != null;
  const composedPath = hasShadow ? event.composedPath() : [];
  do {
    if (target === host) {
      return false;
    }
    if (hasShadow) {
      // @ts-ignore
      target = composedPath.shift();
    } else {
      target = target.parentNode;
    }
  } while (Boolean(target));
  return true;
}
