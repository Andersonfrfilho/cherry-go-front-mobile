import { isAfter, isBefore, isEqual } from 'date-fns';

export function compareIfBetweenEqual(
  date: Date,
  start_date: Date,
  end_date: Date,
): boolean {
  return (
    (isAfter(date, start_date) && isBefore(date, end_date)) ||
    isEqual(date, start_date)
  );
}
