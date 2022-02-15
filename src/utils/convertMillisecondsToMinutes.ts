import { millisecondsToMinutes, millisecondsToSeconds } from 'date-fns';

export function formattedMillisecondsToMinutes(milliseconds: number) {
  const minutes = millisecondsToMinutes(milliseconds);
  const seconds_total = millisecondsToSeconds(milliseconds);
  const seconds = seconds_total - 60 * minutes;
  const minutesText = 'm';
  const secondsText = 's';
  return `${minutes.toString().padStart(2, '0')} ${minutesText} ${seconds
    .toString()
    .padStart(2, '0')} ${secondsText}`;
}
