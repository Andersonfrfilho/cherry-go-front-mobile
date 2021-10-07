import { differenceInMinutes, Duration, intervalToDuration } from 'date-fns';
import brazilLocale from 'date-fns/locale/pt-BR';
import { getPlatformDate } from './getPlatformDate';

interface GetDurationDTO {
  initialDate: string;
  finallyDate: string;
}
export function getDuration({
  initialDate,
  finallyDate,
}: GetDurationDTO): Duration {
  return differenceInMinutes(new Date(initialDate), new Date(finallyDate));
}
