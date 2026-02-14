import { Badge } from 'antd';
import { BookingStatus } from '../types/bookings.types';

interface BookingStatusBadgeProps {
  status: BookingStatus;
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case BookingStatus.New:
        return 'blue';
      case BookingStatus.Rescheduled:
        return 'orange';
      case BookingStatus.Confirmed:
        return 'green';
      case BookingStatus.OnRide:
        return 'purple';
      case BookingStatus.Completed:
        return 'default';
      case BookingStatus.Cancelled:
      case BookingStatus.CancelledByUser:
        return 'red';
      default:
        return 'default';
    }
  };

  return (
    <Badge 
      color={getStatusColor(status)} 
      text={status}
    />
  );
};
