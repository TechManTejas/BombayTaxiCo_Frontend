export interface ISettings extends Document {
  baseFare: string;
  gst: string;
  stateTollTax: string;
  vehiclesAndFuelCharges: string;
  onePickupAndDrop: string;
  parkingAndAirportEntry: string;
  waitingChargesPerMinute: string;
  nightChargePerDay: string;
  extraPickupDropCharges: string;
  advancePaymentPercentage: string;
}