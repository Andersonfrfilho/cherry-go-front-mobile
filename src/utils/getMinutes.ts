import { Duration, intervalToDuration } from 'date-fns';
import brazilLocale from 'date-fns/locale/pt-BR';
import { getPlatformDate } from './getPlatformDate';

export function getMinutes(milliseconds = '0'): Duration {
  return intervalToDuration({ start: 0, end: Number(milliseconds) * 1000 });
}
