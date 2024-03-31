/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CarFeature {
  _id: string;
  feature: string;
  icon: string; 
}

export interface TaxiType {
  _id: string;
  image:string;
  name: string;
  description: string;
  price_km: number;
  price_hour: number;
  extra_km_charges: number; 
  car_features: CarFeature[];
  discount_percentage: number;
}

export interface TaxiTypeFormValues {
  [key: string]: any;
  name: string;
  description: string;
  price_km: number;
  price_hour: number;
  extra_km_charges: number; 
  car_features: CarFeature[];
  discount_percentage: number;
}