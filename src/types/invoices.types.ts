import { IBooking } from "./bookings.types";

export interface IInvoice {
  _id: string;
  date: Date;
  booking: IBooking;
  amount: number;
  cashPaid: number;
  amountDue: number;
}

export interface InvoiceFormValues {
    date: Date;
    booking: IBooking['_id'];
    amount: number;
  }
  