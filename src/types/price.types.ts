import { IRoute } from "./routes.types";
import { ITaxiType } from "./taxiTypes.types";

export interface ITaxiTypePrice {
    _id: string;
    route_id: IRoute;
    taxi_type_id: ITaxiType;
    price_km: number;
    extra_km_charges: number;
    status: boolean;
  }