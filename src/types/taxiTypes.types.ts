/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICarFeature {
  _id: string;
  feature: string;
  icon: string; 
}

export interface ITaxiType {
  _id: string;
  image:string;
  name: string;
  description: string;
  car_features: ICarFeature[];
  discount_percentage: number;
  price_hour: number;
  // temporary data
  price_km?: number;
  extra_km_charges?: number; 
  status?: boolean;
  taxiTypePriceId?: string;
}

export interface ITaxiTypeFormValues {
  [key: string]: any;
  name: string;
  description: string;
  car_features: ICarFeature[];
  discount_percentage: number;
  price_hour: number;
  // temporary data
  price_km?: number;
  extra_km_charges?: number; 
  status?: boolean;
  taxiTypePriceId?: string;
}