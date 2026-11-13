import React, { createContext, useContext, useState, useEffect } from 'react';
import { KarachiArea, OrderType } from '../types';
import {
  KARACHI_AREAS,
  calculateDeliveryFee,
  calculateHaversineDistance,
} from '../utils/distance';

interface LocationContextType {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  selectedArea: KarachiArea;
  setSelectedArea: (area: KarachiArea) => void;
  deliveryFee: number;
  customAddress: string;
  setCustomAddress: (address: string) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  detectCurrentLocation: () => Promise<boolean>;
  isDetectingLocation: boolean;
  locationError: string | null;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orderType, setOrderType] = useState<OrderType>(() => {
    const saved = localStorage.getItem('alriaz_order_type');
    return saved === 'takeaway' ? 'takeaway' : 'delivery';
  });

  const [selectedArea, setSelectedArea] = useState<KarachiArea>(() => {
    try {
      const saved = localStorage.getItem('alriaz_selected_area');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return KARACHI_AREAS[0];
  });

  const [customAddress, setCustomAddress] = useState<string>(() => {
    return localStorage.getItem('alriaz_custom_address') || '';
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('alriaz_order_type', orderType);
  }, [orderType]);

  useEffect(() => {
    try {
      localStorage.setItem('alriaz_selected_area', JSON.stringify(selectedArea));
    } catch {
      // ignore
    }
  }, [selectedArea]);

  useEffect(() => {
    localStorage.setItem('alriaz_custom_address', customAddress);
  }, [customAddress]);

  const deliveryFee = orderType === 'takeaway' ? 0 : selectedArea.deliveryFee;

  const detectCurrentLocation = async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return false;
    }

    setIsDetectingLocation(true);
    setLocationError(null);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const dist = calculateHaversineDistance(latitude, longitude);
          const fee = calculateDeliveryFee(dist);
          const estMinutes = Math.max(20, Math.min(70, Math.round(18 + dist * 2)));

          const gpsArea: KarachiArea = {
            id: 'gps-detected',
            name: 'Your Detected GPS Location',
            district: 'Karachi GPS Pin',
            distanceKm: dist,
            estimatedMinutes: estMinutes,
            deliveryFee: fee,
          };

          setSelectedArea(gpsArea);
          localStorage.setItem('alriaz_has_chosen_location', 'true');
          setIsDetectingLocation(false);
          resolve(true);
        },
        () => {
          setLocationError('Unable to access GPS. Please choose your area manually below.');
          setIsDetectingLocation(false);
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  };

  return (
    <LocationContext.Provider
      value={{
        orderType,
        setOrderType,
        selectedArea,
        setSelectedArea,
        deliveryFee,
        customAddress,
        setCustomAddress,
        isLocationModalOpen,
        setIsLocationModalOpen,
        detectCurrentLocation,
        isDetectingLocation,
        locationError,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return ctx;
};
