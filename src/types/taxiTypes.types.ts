export interface CarFeature {
  _id: string;
  feature: string;
}

export interface TaxiType {
  _id: string;
  name: string;
  description: string;
  price_km: number;
  price_hour: number;
  extra_km_charges: number; 
  car_features: CarFeature[];
  discount_percentage: number;
}

export interface TaxiTypeFormValues {
  name: string;
  description: string;
  price_km: number;
  price_hour: number;
  extra_km_charges: number; 
  car_features: CarFeature[];
  discount_percentage: number;
}