import { THOUSAND_METERS } from '../constant/distance.const';

export function formatDistance(distance: number): string {
  if (distance <= THOUSAND_METERS) {
    const sufix = distance > 1 ? "m's" : 'm';
    return `${Math.floor(distance)} ${sufix}`;
  }
  const sufix = distance > 1 ? "km's" : 'km';

  return `${Math.floor(distance / THOUSAND_METERS)} ${sufix}`;
}
