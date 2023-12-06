export interface CarFeature {
    _id: string;
    feature: string;
  }
  
  export interface TaxiType {
    _id: string;
    name: string;
    price_km: number;
    price_hour: number;
    car_features: CarFeature[];
  }
  
  export interface TaxiTypeFormValues {
    name: string;
    price_km: number;
    price_hour: number;
    car_features: CarFeature[];
  }
  