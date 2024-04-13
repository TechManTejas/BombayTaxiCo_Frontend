/* eslint-disable @typescript-eslint/no-explicit-any */
import { City } from "./citys.types";
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
    CancelledByUser = 'CancelledByUser',
}

export enum TripType {
    OneWay = 'One-Way Trip',
    Round = 'Round Trip',
    Hourly = 'Hourly Rental',
}

// Define the Booking schema
export interface IBooking extends Document {
    _id: string;
    pickup_city?: City;
    route_id?: IRoute;
    user_id: IUser;
    coupon_id?: Coupon;
    taxi_id?: Taxi;
    requested_taxi_type?: TaxiType;
    driver_id?: Driver;
    pick_up_date: Date;
    pick_up_time: string;
    return_date?: Date;
    hours_kms?: string;
    pickup_address?: string;
    drop_address?: string;
    additional_request?: string;
    payments?: any;
    base_fare?: number;
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
    name: string;
    gender: string;
    emailId: string;
    contactNumber: string;
    pincode: string;
    address: string;
    numberOfPassengers: string,
    numberOfSmallBags: string,
    numberOfLargeBags: string,
    seniorCitizen: boolean,
    womenTraveling: boolean,
    kidsOnBoard: boolean,
    englishSpeakingDriver: boolean,
    carryingPet: boolean,
    need7Plus1Seater: boolean,
    carrierOverTop: boolean,
    bookingForSomeoneElse: boolean,
    otherDetails: string,
    createdAt: string,
    __v: number;
}
