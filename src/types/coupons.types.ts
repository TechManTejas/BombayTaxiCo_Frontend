export interface Coupon {
    _id: string;
    name: string;
    discount_perc: number;
    from_date: string;
    to_date: string;
    forever: boolean;
    status: string;
    __v: number;
  }
  