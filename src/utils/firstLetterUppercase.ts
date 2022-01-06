export function firstLetterUppercase(value: string) {
  return value && value.length > 1
    ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    : '';
}
