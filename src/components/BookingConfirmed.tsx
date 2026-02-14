import { Result, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const BookingConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get booking details from location state or localStorage
    const booking = location.state?.booking || 
                   JSON.parse(localStorage.getItem('lastBooking') || 'null');
    
    if (booking) {
      setBookingDetails(booking);
      // Store in localStorage for persistence
      localStorage.setItem('lastBooking', JSON.stringify(booking));
    }
    setLoading(false);
  }, [location]);

  const handleViewDetails = () => {
    if (bookingDetails?.booking_number) {
      navigate(`/bookings/${bookingDetails.booking_number}`);
    }
  };

  const handleBookAnother = () => {
    navigate('/booking');
  };

  if (loading) {
    return <div className="p-6 text-center">Loading booking details...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white items-center space-x-4">
      <Result
        className="w-full"
        status="success"
        title={<span>
          YOUR BOOKING IS{" "}
          <span className="text-[#FDB813]">CONFIRMED!</span>
        </span>}
        subTitle={`Booking #${bookingDetails?.booking_number || 'N/A'} - Thank You For Booking With Us`}
        extra={[
          <Button key="details" type="primary" onClick={handleViewDetails}>
            View Booking Details
          </Button>,
          <Button key="book" onClick={handleBookAnother}>
            Book Another Trip
          </Button>
        ]}
      />
      <div className="flex flex-col">
        <p className="text-red-600 pt-2 text-center">
          You Will Soon Receive An E-mail Confirmation
        </p>
        <p className="text-gray-700 pt-4 text-center">
          If you need to change or cancel booking please contact us at
        </p>
        <div className="pt-2 text-center">
          <p className="text-gray-900 font-semibold">Support Team,</p>
          <p className="text-gray-900 font-semibold">+91 6262 744 744</p>
          <p className="font-semibold">
            Bombay Taxi Company
            <span className="text-[#FDB813]">.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
