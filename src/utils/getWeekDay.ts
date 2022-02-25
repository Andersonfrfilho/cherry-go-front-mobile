import { format } from 'date-fns';
import brazilLocale from 'date-fns/locale/pt-BR';

export function getWeekDay(date: number) {
  return format(new Date(date), 'EEEE', {
    locale: brazilLocale,
  });
}
