export function parsePropToArray(value: string | string[]): string[] {
  if (Array.isArray(value)) return value;

  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return value
        .split(',')
        .map(v => v.trim())
        .filter(Boolean);
    }
  }
  return [];
}
