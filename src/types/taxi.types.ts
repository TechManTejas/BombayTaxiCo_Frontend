import { IBooking } from "./bookings.types";
import { ITaxiType } from "./taxiTypes.types";

export interface ITaxi {
    _id: string;
    taxi_type_id: ITaxiType;
    taxi_no: string;
    driving_license: string;
    taxi_status: string;
    current_trip?: IBooking
    assigned_trips?: IBooking[];
    completed_trips?: IBooking[];
}

export interface ITaxiFormValues {
    taxi_type_id: ITaxiType['_id'];
    taxi_no: string;
    driving_license: string;
    taxi_status: 'Available' | 'Unavailable' | 'Assigned' | 'On a Trip';
}
