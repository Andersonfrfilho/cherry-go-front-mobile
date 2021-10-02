import { format } from 'date-fns';
import brazilLocale from 'date-fns/locale/pt-BR';
import { getPlatformDate } from './getPlatformDate';

export function getHour(date: string) {
  return format(getPlatformDate(new Date(date)), 'HH:mm', {
    locale: brazilLocale,
  });
}
