import { isAfter, isBefore, isEqual } from 'date-fns';
import { ProviderHoursAvailability } from '../hooks/providerUser';

interface HourAvailable {
  hour: string;
  selected: boolean;
}
interface GetHoursAvailableParamDTO {
  hoursAvailable: Array<string>;
  hours?: Array<ProviderHoursAvailability>;
}
export function getHoursAvailable({
  hoursAvailable,
  hours,
}: GetHoursAvailableParamDTO): Array<HourAvailable> {
  const hoursSelected = hoursAvailable.map(hourDay => {
    const dateHourDay = new Date();
    const [hourDayFormatted, minuteDayFormatted] = hourDay.split(':');
    dateHourDay.setHours(
      Number(hourDayFormatted),
      Number(minuteDayFormatted),
      0,
    );
    if (
      hours &&
      hours.some(period => {
        const startDate = new Date();
        const [startDateHour, startDateMinute] = period.start_time.split(':');
        startDate.setHours(Number(startDateHour), Number(startDateMinute), 0);
        const endDate = new Date();
        const [endDateHour, endDateMinute] = period.end_time.split(':');
        endDate.setHours(Number(endDateHour), Number(endDateMinute), 0);

        return (
          (isAfter(dateHourDay, startDate) && isBefore(dateHourDay, endDate)) ||
          isEqual(dateHourDay, startDate) ||
          isEqual(dateHourDay, endDate)
        );
      })
    ) {
      return {
        hour: hourDay,
        selected: true,
      };
    }
    return {
      hour: hourDay,
      selected: false,
    };
  });
  return hoursSelected;
}

export function getHoursSeries(
  hoursAvailable: Array<string>,
  hours: ProviderHoursAvailability[],
) {
  const hoursSelected = hoursAvailable.map(hourDay => {
    const dateHourDay = new Date();
    const [hourDayFormatted, minuteDayFormatted] = hourDay.split(':');
    dateHourDay.setHours(
      Number(hourDayFormatted),
      Number(minuteDayFormatted),
      0,
    );
    if (
      hours &&
      hours.some(period => {
        const startDate = new Date();
        const [startDateHour, startDateMinute] = period.start_time.split(':');
        startDate.setHours(Number(startDateHour), Number(startDateMinute), 0);
        const endDate = new Date();
        const [endDateHour, endDateMinute] = period.end_time.split(':');
        endDate.setHours(Number(endDateHour), Number(endDateMinute), 0);

        return (
          isAfter(dateHourDay, startDate) && isBefore(dateHourDay, endDate)
        );
      })
    ) {
      return {
        hour: hourDay,
        selected: true,
      };
    }
    return {
      hour: hourDay,
      selected: false,
    };
  });
}
