import { addMilliseconds } from 'date-fns';

export function addMillisecondsToDate(date: Date, millisecond: number): Date {
  return addMilliseconds(date, millisecond);
}
