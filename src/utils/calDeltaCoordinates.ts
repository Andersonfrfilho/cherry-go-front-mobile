const PERCENTAGE_DELTA = 1.3; // or more 30%
interface ParamsCalDelta {
  latitude: number;
  longitude: number;
  distance: number;
  percent?: number;
}

export function calDeltaCoordinates({
  latitude,
  longitude,
  distance,
  percent = 10,
}: ParamsCalDelta) {
  distance *= percent;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(latitude),
      Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(latitude),
    ),
  );

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
}

export function getRegionForCoordinates(
  points: {
    latitude: number;
    longitude: number;
  }[],
) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX: number;
  let maxX: number;
  let minY: number;
  let maxY: number;

  // init first point
  (point => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX * PERCENTAGE_DELTA,
    longitudeDelta: deltaY * PERCENTAGE_DELTA,
  };
}
