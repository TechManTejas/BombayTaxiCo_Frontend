export interface ISettings extends Document {
    baseFare: string;
    gst: string;
    stateTollTax: string;
    vehiclesAndFuelCharges: string;
    onePickupAndDrop: string;
    parkingAndAirportEntry: string;
    waitingChargesPerMinute: number;
    nightChargePerDay: number;
    extraPickupDropCharges: number;
  }
  