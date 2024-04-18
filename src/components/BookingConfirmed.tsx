export const BookingConfirmed = () => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div className="flex flex-col">
        <div className="text-xl font-semibold text-gray-900">
          <span className="p-1 rounded">
            ✅ YOUR BOOKING IS{" "}
            <span className="text-yellow-500">CONFIRMED!</span>
          </span>
        </div>
        <p className="text-gray-700 pt-2">Thank You For Booking With Us</p>
        <p className="text-red-600 pt-2">
          You Will Soon Receive An E-mail Confirmation
        </p>
        <p className="text-gray-700 pt-4">
          If you need to change or cancel booking
          <br />
          please contact us at
        </p>
        <div className="pt-2">
          <p className="text-gray-900 font-semibold">Support Team,</p>
          <p className="text-gray-900 font-semibold">+91 6262 744 744</p>
          <p className="font-semibold">
            Bombay Taxi Company
            <span className="text-yellow-500">.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
