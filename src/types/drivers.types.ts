import { IBooking } from "./bookings.types";

export interface Driver {
    _id: string;
    name: string;
    mobile_no: string;
    email_id: string;
    address: string;
    driving_license: string;
    driver_status: string;
    current_trip?: IBooking
    assigned_trips?: IBooking[];
    completed_trips?: IBooking[];
}

export interface DriverFormValues {
    name: string;
    mobile_no: string;
    email_id: string;
    address: string;
    driving_license: string;
    driver_status: 'Available' | 'Unavailable' | 'Assigned' | 'On a Trip';
}
