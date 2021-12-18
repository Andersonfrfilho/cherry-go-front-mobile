export const CARACTER_PATTERN = /\D/g;
export const DOT_PATTERN = /\./g;

export function onlyNumber(value: string): string {
  return value && value.replace(CARACTER_PATTERN, '').replace(DOT_PATTERN, '');
}
