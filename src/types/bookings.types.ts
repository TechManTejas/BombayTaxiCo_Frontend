import { Coupon } from "./coupons.types";
import { Driver } from "./drivers.types";
import { IRoute } from "./routes.types";
import { Taxi } from "./taxi.types";
import { TaxiType } from "./taxiTypes.types";
import { IUser } from "./user.types";

export enum BookingStatus {
    New = 'New',
    Confirmed = 'Confirmed',
    OnRide = 'On Ride',
    Completed = 'Completed',
    Cancelled = 'Cancelled',
}

export enum TripType {
    OneWay = 'One Way',
    Round = 'Round',
    Hourly = 'Hourly',
}

// Define the Booking schema
export interface IBooking extends Document {
    _id: string;
    route_id: IRoute;
    user_id: IUser;
    coupon_id?: Coupon;
    taxi_id?: Taxi;
    requested_taxi_type?: TaxiType;
    driver_id?: Driver;
    pick_up_date: Date;
    return_date?: Date;
    hours_kms?: string;
    pickup_address?: string;
    drop_address?: string;
    additional_request?: string;
    payments?: {
        method: string;
        status: string;
    };
    total_cost?: number;
    waiting_charges?: number;
    other_charges?: number;
    gst?: number;
    user_feedback?: string;
    user_rating?: number;
    driver_feedback?: string;
    driver_rating?: number;
    invoice?: {
        number: string;
        issued_date: string;
    };
    booking_status: BookingStatus;
    trip_type?: TripType;
    __v: number;
}
