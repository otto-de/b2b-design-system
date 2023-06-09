import { CssClassMap } from './interfaces/interface';

export const getClassList = (
  classes: string | (string | null | undefined)[] | undefined,
): string[] => {
  if (classes !== undefined) {
    const array = Array.isArray(classes) ? classes : classes.split(' ');
    return array
      .filter(c => c != null)
      .map(c => (c as string).trim())
      .filter(c => c !== '');
  }
  return [];
};

// helper function if classes are provided as string list
export const getClassMap = (
  classes: string | string[] | undefined,
): CssClassMap => {
  const map: CssClassMap = {};
  getClassList(classes).forEach(c => (map[c] = true));
  console.log(map);
  return map;
};
