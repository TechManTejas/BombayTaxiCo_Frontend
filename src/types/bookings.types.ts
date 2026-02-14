/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICity } from "./citys.types";
import { ICoupon } from "./coupons.types";
import { IDriver } from "./drivers.types";
import { IRoute } from "./routes.types";
import { ITaxi } from "./taxi.types";
import { ITaxiType } from "./taxiTypes.types";
import { IUser } from "./user.types";

export enum BookingStatus {
    New = 'New',
    Rescheduled = 'Rescheduled', // Fixed typo: was Resheduled
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
    booking_number: number;
    pickup_city?: ICity;
    route_id?: IRoute;
    user_id: IUser;
    coupon_id?: ICoupon;
    taxi_id?: ITaxi;
    requested_taxi_type?: ITaxiType;
    driver_id?: IDriver;
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
    whatsAppNumber: string;
    pincode?: string;
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
