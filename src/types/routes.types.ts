import { ICity } from "./citys.types";
import { ITaxiTypePrice } from "./price.types";

export interface IRoute {
  _id: string;
  from_id: ICity;
  to_id: ICity;
  one_way_trip_km: number;
  round_trip_km: number;
  route_status: "Active" | "Inactive";
}

export interface IRouteFormValues {
  from_id: ICity["_id"];
  to_id: ICity["_id"];
  one_way_trip_km: number;
  round_trip_km: number;
  route_status: "Active" | "Inactive";
}
