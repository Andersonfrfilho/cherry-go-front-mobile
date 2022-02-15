export function formattedDateToCompare(hour: string, minute: string): Date {
  const dateStartCompare = new Date(2000, 0, 1);
  return new Date(
    dateStartCompare.setHours(Number(hour), Number(minute), 0, 0),
  );
}
