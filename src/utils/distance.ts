import { KarachiArea } from '../types';

// Restaurant coordinates: Al Riaz Foods, Sector 4, Surjani Town, Karachi
export const RESTAURANT_COORDS = {
  lat: 25.0195,
  lng: 67.0672,
  address: "Al Riaz Foods, Sector 4, Surjani Town, near 4K Chowrangi, Karachi",
  phone: "0319-2635132",
  whatsapp: "923192635132",
  mapsUrl: "https://share.google/Mf7T6zjcybWD1lCoc"
};

/**
 * Calculates delivery fee based on distance:
 * User benchmark rule: Up to 4K Chowrangi (~2.8 km) = Rs. 150.
 * Scaling: Rs. 150 base for <= 3.0 km, + Rs. 25/km for additional distance.
 */
export function calculateDeliveryFee(distanceKm: number): number {
  if (distanceKm <= 1.2) {
    return 100;
  }
  if (distanceKm <= 3.0) {
    return 150; // User specified benchmark for 4K Chowrangi
  }
  const extraKm = distanceKm - 3.0;
  const rawFee = 150 + Math.round(extraKm * 25);
  // Round to nearest 5
  return Math.ceil(rawFee / 5) * 5;
}

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number = RESTAURANT_COORDS.lat,
  lon2: number = RESTAURANT_COORDS.lng
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

// Pre-configured Karachi areas list matching the user's video recording
export const KARACHI_AREAS: KarachiArea[] = [
  {
    id: "4k-chowrangi",
    name: "4K Chowrangi",
    district: "North Karachi / Surjani",
    distanceKm: 2.8,
    estimatedMinutes: 25,
    deliveryFee: 150 // Strict user requirement: 4K Chowrangi = Rs. 150
  },
  {
    id: "surjani-sector-4",
    name: "Surjani Town - Sector 4",
    district: "Surjani Town",
    distanceKm: 0.6,
    estimatedMinutes: 20,
    deliveryFee: 100
  },
  {
    id: "surjani-sector-5",
    name: "Surjani Town - Sector 5",
    district: "Surjani Town",
    distanceKm: 1.4,
    estimatedMinutes: 20,
    deliveryFee: 120
  },
  {
    id: "surjani-sector-7",
    name: "Surjani Town - Sector 7",
    district: "Surjani Town",
    distanceKm: 2.1,
    estimatedMinutes: 25,
    deliveryFee: 140
  },
  {
    id: "surjani-town",
    name: "Surjani Town (General)",
    district: "Surjani Town",
    distanceKm: 2.5,
    estimatedMinutes: 25,
    deliveryFee: 150
  },
  {
    id: "north-khi-11a",
    name: "North Karachi - Sector 11-A",
    district: "North Karachi",
    distanceKm: 3.5,
    estimatedMinutes: 30,
    deliveryFee: 165
  },
  {
    id: "power-house",
    name: "Power House Chowrangi",
    district: "North Karachi",
    distanceKm: 4.2,
    estimatedMinutes: 30,
    deliveryFee: 180
  },
  {
    id: "shadman-town",
    name: "Shadman Town",
    district: "North Karachi",
    distanceKm: 5.5,
    estimatedMinutes: 35,
    deliveryFee: 215
  },
  {
    id: "buffer-zone",
    name: "Buffer Zone",
    district: "North Karachi",
    distanceKm: 6.5,
    estimatedMinutes: 35,
    deliveryFee: 240
  },
  {
    id: "nagan-chowrangi",
    name: "Nagan Chowrangi",
    district: "North Karachi / New Karachi",
    distanceKm: 7.2,
    estimatedMinutes: 40,
    deliveryFee: 255
  },
  {
    id: "sakhi-hassan",
    name: "Sakhi Hassan",
    district: "North Nazimabad",
    distanceKm: 8.5,
    estimatedMinutes: 40,
    deliveryFee: 290
  },
  {
    id: "fb-area",
    name: "Federal B Area (Water Pump)",
    district: "Central Karachi",
    distanceKm: 10.8,
    estimatedMinutes: 45,
    deliveryFee: 345
  },
  {
    id: "gulshan-iqbal",
    name: "Gulshan-e-Iqbal",
    district: "East Karachi",
    distanceKm: 14.2,
    estimatedMinutes: 50,
    deliveryFee: 430
  },
  {
    id: "gulistan-johor",
    name: "Gulistan-e-Johor",
    district: "East Karachi",
    distanceKm: 17.5,
    estimatedMinutes: 55,
    deliveryFee: 515
  },
  {
    id: "dha-clifton",
    name: "Defence / Clifton",
    district: "South Karachi",
    distanceKm: 26.5,
    estimatedMinutes: 65,
    deliveryFee: 740
  }
];
