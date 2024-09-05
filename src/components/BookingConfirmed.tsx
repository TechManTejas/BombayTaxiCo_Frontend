import { Result } from "antd";

export const BookingConfirmed = () => {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white items-center space-x-4">
      <Result
        className="w-full"
        status="success"
        title={<span>
          {/* ✅  */}
          YOUR BOOKING IS{" "}
          <span className="text-[#FDB813]">CONFIRMED!</span>
        </span>}
        subTitle="Thank You For Booking With Us"
      />
      <div className="flex flex-col">
        {/* <div className="text-xl font-semibold text-gray-900">
          <span>
            YOUR BOOKING IS{" "}
            <span className="text-[#FDB813]">CONFIRMED!</span>
          </span>
        </div> */}
        {/* <p className="text-gray-700 pt-2"></p> */}
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
