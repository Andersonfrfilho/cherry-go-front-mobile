export function getMinutes(milliseconds = '0'): string {
  if (milliseconds && Number(milliseconds) > 0) {
    const hours = Math.floor(Number(milliseconds) / 1000 / 60 / 60);
    const minutes = (Number(milliseconds) / 1000 / 60) % 60;
    return `${(minutes + hours * 60).toString().padStart(2, '0')} minutos`;
  }
  return `0 minutos`;
}
