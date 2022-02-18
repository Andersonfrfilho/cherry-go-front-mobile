interface ParamsCalDelta {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export function calDeltaCoordinates({
  latitude,
  longitude,
  accuracy,
}: ParamsCalDelta) {
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
  const longDelta =
    accuracy /
    (oneDegreeOfLatitudeInMeters * Math.cos(latitude * (Math.PI / 180)));

  return {
    latitude,
    longitude,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
    accuracy,
  };
}
