import React from 'react';
import { Tag } from 'antd';
import { IDriver } from '../../types/drivers.types';
import dayjs from 'dayjs';
import { IBooking, TripType } from '../../types/bookings.types';

interface DriverDetailsProps {
  driver: IDriver;
}

export const DriverDetailsBookingForm: React.FC<DriverDetailsProps> = ({ driver }) => {

    console.log(driver.name)

  return (
    <div className="p-2 space-y-4">
      <div className="flex justify-between space-x-2">
        <div className="font-bold">{driver.name}</div>
        <div className="text-gray-400">{driver.mobile_no}</div>
        <div>
          <Tag color={getColorForDriverStatus(driver.driver_status)}>{driver.driver_status}</Tag>
        </div>
      </div>
      <div>
        ASSIGNED TRIPS:
        <ul>
        {driver.assigned_trips
            ?.filter((booking: IBooking) => 
              dayjs(booking.pick_up_date).isSame(dayjs(), 'day') || 
              dayjs(booking.pick_up_date).isAfter(dayjs(), 'day'))
            .map((booking: IBooking) => (
              <li key={booking._id} className='border p-1'>
                <Tag>{booking.booking_status}</Tag>
                <div className='font-bold'>{dayjs(booking.pick_up_date).format('DD MMM YYYY')}</div>
                <div>
                  From: {booking.route_id?.from_id.name} - To: {booking.route_id?.to_id.name}
                </div>
                <div>Trip Type: {getTripTypeLabel(booking.trip_type)}</div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper function to get color based on driver status
const getColorForDriverStatus = (status: string) => {
  switch (status) {
    case 'Available':
      return 'green';
    case 'Unavailable':
      return 'volcano';
    case 'Assigned':
      return 'geekblue';
    case 'On a Trip':
      return 'blue';
    default:
      return 'default';
  }
};

// Helper function to get trip type label
const getTripTypeLabel = (tripType?: TripType) => {
  switch (tripType) {
    case TripType.OneWay:
      return 'One Way';
    case TripType.Round:
      return 'Round';
    case TripType.Hourly:
      return 'Hourly';
    default:
      return '';
  }
};
