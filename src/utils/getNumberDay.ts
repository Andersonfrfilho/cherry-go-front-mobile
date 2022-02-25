import { format } from 'date-fns';
import brazilLocale from 'date-fns/locale/pt-BR';

export function getNumberDay(date: number) {
  return format(new Date(date), 'd', {
    locale: brazilLocale,
  });
}
