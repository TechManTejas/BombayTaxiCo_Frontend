import { Dayjs } from "dayjs"
export interface Coupon {
  _id: string;
  name: string;
  discount_perc: number;
  from_date: string;
  to_date: string;
  forever: boolean;
  status: string;
}

export interface CouponFormValues {
  name: string;
  discount_perc: number;
  from_date: Dayjs;
  to_date: Dayjs;
  forever: boolean;
  status: 'Active' | 'Inactive';
}

