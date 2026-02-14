/**
 * Trip distance, duration, and cost calculation helpers
 */

/**
 * Calculates estimated trip duration in hours based on distance
 * Assumes average speed of 40 km/h for city, 60 km/h for highway
 */
export const estimateTripDuration = (
  distanceKm: number | null | undefined,
  isHighway: boolean = false
): number => {
  if (!distanceKm || distanceKm <= 0 || isNaN(distanceKm)) return 0;
  const avgSpeed = isHighway ? 60 : 40;
  return Math.round((distanceKm / avgSpeed) * 10) / 10;
};

/**
 * Calculates extra km charges for a trip
 * @param actualKm - Actual distance traveled
 * @param includedKm - Km included in the package
 * @param ratePerKm - Rate per extra km
 */
export const calculateExtraKmCharges = (
  actualKm: number | null | undefined,
  includedKm: number | null | undefined,
  ratePerKm: number | null | undefined
): number => {
  if (!actualKm || !includedKm || !ratePerKm) return 0;
  if (actualKm <= includedKm) return 0;
  const extraKm = actualKm - includedKm;
  return Math.round(extraKm * ratePerKm);
};

/**
 * Formats distance for display
 */
export const formatDistance = (km: number | null | undefined): string => {
  if (km === null || km === undefined || isNaN(km)) return '0 km';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
};

/**
 * Formats duration in hours to a readable string
 */
export const formatDuration = (hours: number | null | undefined): string => {
  if (!hours || hours <= 0 || isNaN(hours)) return '0 min';
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
};

/**
 * Parses an hourly package string like "8 hr 80 kms" into components
 */
export const parseHourlyPackage = (
  packageStr: string | null | undefined
): { hours: number; kms: number } => {
  if (!packageStr) return { hours: 0, kms: 0 };
  const parts = packageStr.split(' ');
  const hours = parseInt(parts[0]) || 0;
  const kms = parseInt(parts[2]) || 0;
  return { hours, kms };
};

/**
 * Calculates total trip cost including extras
 */
export const calculateTotalTripCost = (
  baseFare: number | null | undefined,
  extraKmCharges: number = 0,
  waitingCharges: number = 0,
  tollCharges: number = 0
): number => {
  const base = (baseFare && !isNaN(baseFare)) ? baseFare : 0;
  return Math.round(base + extraKmCharges + waitingCharges + tollCharges);
};
