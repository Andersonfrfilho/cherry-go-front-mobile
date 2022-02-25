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
