import { IBooking } from "./bookings.types";
import { TaxiType } from "./taxiTypes.types";

export interface Taxi {
    _id: string;
    taxi_type_id: TaxiType;
    taxi_no: string;
    driving_license: string;
    taxi_status: string;
    current_trip?: IBooking
    assigned_trips?: IBooking[];
    completed_trips?: IBooking[];
}

export interface TaxiFormValues {
    taxi_type_id: TaxiType['_id'];
    taxi_no: string;
    driving_license: string;
    taxi_status: 'Available' | 'Unavailable' | 'Assigned' | 'On a Trip';
}
