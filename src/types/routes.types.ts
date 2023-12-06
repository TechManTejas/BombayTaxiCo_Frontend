import { City } from "./citys.types";

export interface IRoute {
    _id: string;
    from_id: City;
    to_id: City;
    one_way_trip_km: number;
    round_trip_km: number;
    route_status: 'Active' | 'Inactive';
  }
  
  export interface RouteFormValues {
    from_id: City['_id'];
    to_id: City['_id'];
    one_way_trip_km: number;
    round_trip_km: number;
    route_status: 'Active' | 'Inactive';
  }
  
  