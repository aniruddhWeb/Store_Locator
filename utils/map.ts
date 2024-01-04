export const calculateDistanceBetweenMarkers = (pointA: any, pointB: any) => {
  const lat1 = pointA.lat;
  const lon1 = pointA.lng;

  const lat2 = pointB.lat;
  const lon2 = pointB.lng;

  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return c * 6371e3;
};
