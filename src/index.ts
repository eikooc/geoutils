const MAX_LAT = 90;
const MIN_LAT = -90;
const MAX_LON = 180;
const MIN_LON = -180;

export interface GeoPoint {
  lat: number;
  lon: number;
}
export class GeoPoint {
  constructor(lat: number, lon: number) {
    if (!inRange(MIN_LAT, MAX_LAT, lat)) {
      throw new RangeError(
        `lat should be between ${MIN_LAT} and ${MAX_LAT}. Received: ${lat}`
      );
    }
    if (!inRange(MIN_LON, MAX_LON, lon)) {
      throw new RangeError(
        `lon should be between ${MIN_LON} and ${MAX_LON}. Received: ${lon}`
      );
    }
  }
  distanceToPoint(p: GeoPoint) {
    if (!isValidGeopoint) {
      throw new Error(`input is not a valid GeoPoint`);
    }
    return distanceBetweenPoints(this.lat, this.lon, p.lat, p.lon);
  }
}
export const isValidGeopoint = (lat: number, lon: number): boolean => {
  if (inRange(MIN_LAT, MAX_LAT, lat) && inRange(MIN_LON, MAX_LON, lon)) {
    return true;
  }
  return false;
};

/**
 * Calculates the Haversine distance between two points on a circle
 * @param lat1 first latitude point
 * @param lon1 first longitude point
 * @param lat2 second latitude point
 * @param lon2 second longitude point
 */
export const distanceBetweenPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const point: number = 0.017453292519943295; // Math.PI / 180
  const c: (x: number) => number = Math.cos;
  const cosLat = c((lat2 - lat1) * point);
  const cosLat2 = c(lat1 * point) * c(lat2 * point);
  const cosLon = c((lon2 - lon1) * point);
  const a: number = 0.5 - cosLat / 2 + cosLat2 * (1 - cosLon) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

const inRange = (min: number, max: number, value: number) => {
  return min <= value && value <= max;
};

const isNumber = (value: any): boolean => {
  if (typeof value === "number" && isFinite(value)) {
    if (Number.isInteger(value)) {
      return Number.isSafeInteger(value);
    }
    return true;
  }
  return false;
};
