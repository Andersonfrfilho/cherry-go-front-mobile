import { addDays, differenceInYears } from 'date-fns';

export function getOldest(date: Date) {
  return differenceInYears(date, new Date());
}
