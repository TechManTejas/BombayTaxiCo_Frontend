/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CarryOutOutlined,
  CarOutlined,
  SwapOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Menu,
  Space,
  Tag,
  message,
} from "antd";
import { useLocation } from "react-router-dom";
import { BookingStatus, IBooking, TripType } from "../types/bookings.types";
import dayjs, { Dayjs } from "dayjs";
import axios from "../api/axios";
import { confirmation } from "../components/Confirmation";
import { useEffect, useState } from "react";
import { generateTimeOptions } from "../utils/GenerateTimeOptions";

export default function UserBookingDetails() {
  const { state } = useLocation();
  const booking: IBooking = state?.booking;
  const [form] = Form.useForm();

  const [pickupDate, setPickupDate] = useState<Dayjs>(
    dayjs(booking.pick_up_date)
  );
  const [pickupTime, setPickupTime] = useState<string>(booking.pick_up_time);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(
    booking.return_date ? dayjs(booking.return_date) : null
  );
  const [timeOptions, setTimeOptions] = useState(generateTimeOptions(pickupDate ?? dayjs()));
  const [originalDuration, setOriginalDuration] = useState<number>();

  const onTimeChange = (e: any) => {
    setPickupTime(e.key);
  };

  useEffect(() => {
    const timeOptions = generateTimeOptions(pickupDate ?? dayjs());
    setTimeOptions(timeOptions);
    setPickupTime(timeOptions[0]?.label ?? "");
  }, [pickupDate]);

  const isEditable =
    booking?.booking_status === BookingStatus.New ||
    booking?.booking_status === BookingStatus.Confirmed ||
    booking?.booking_status === BookingStatus.Resheduled;

  const handleUpdateBooking = async () => {
    try {
      // Show confirmation dialog and wait for user response
      const isConfirmed = await confirmation("Are you sure you want to reschedule the booking?");
      if (!isConfirmed) {
        console.log("Rescheduling aborted by user");
        message.info("Rescheduling cancelled.");
        return; // Stop the update if user cancels
      }

      const updatedData = {
        pick_up_date: pickupDate.format("YYYY-MM-DD"),
        pick_up_time: pickupTime,
        return_date: returnDate ? returnDate.format("YYYY-MM-DD") : null,
        booking_status: BookingStatus.Resheduled,
      };

      console.log(updatedData);

      const response = await axios.put(`/bookings/${booking._id}`, updatedData);
      message.success("Booking rescheduled successfully.");
      console.log(response.data);
      goBack();
    } catch (error) {
      console.error("Failed to reschedule booking:", error);
      message.error("Failed to update booking details");
    }
  };

  const isBookingCancelled =
    booking?.booking_status === BookingStatus.Cancelled;
  const isBookingConfirmed =
    booking?.booking_status === BookingStatus.Confirmed;
  const isBookingOnRide = booking?.booking_status === BookingStatus.OnRide;
  const isBookingCompleted =
    booking?.booking_status === BookingStatus.Completed;
  const isBookingCancelledByUser =
    booking?.booking_status === BookingStatus.CancelledByUser;

  console.log(booking);

  const totalAmount = "₹" + booking.base_fare?.toFixed(2) || "₹0.00";
  const paymentsTotal =
    booking.payments?.reduce(
      (sum: any, payment: any) => sum + payment.amount / 100,
      0
    ) || 0;
  const dueAmount = booking.base_fare
    ? "₹" + (booking.base_fare - paymentsTotal).toFixed(2)
    : "---";

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    if (booking.pick_up_date) {
      const pickup = dayjs(booking.pick_up_date);
      const returnD = dayjs(booking.return_date);
      const duration = returnD.diff(pickup, "day");
      setOriginalDuration(duration);
      console.log("Original Duration Set:", duration); // Debug log
    }
  }, [booking.pick_up_date, booking.return_date]);

  const handlePickupDateChange = (date: Dayjs | null) => {
    if (date) {
      setPickupDate(date);
      if (originalDuration !== undefined) {
        const newReturnDate = date.add(originalDuration, "day");
        setReturnDate(newReturnDate);
        console.log("Updated Return Date:", newReturnDate.format("YYYY-MM-DD")); // Debug log
      }
    }
  };

  const getStatusTag = (status: string | undefined) => {
    switch (status) {
      case BookingStatus.New:
        return (
          <Tag icon={<CheckCircleOutlined />} color="processing">
            New
          </Tag>
        );
      case BookingStatus.Confirmed:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Confirmed
          </Tag>
        );
      case BookingStatus.Resheduled:
        return (
          <Tag icon={<CloseCircleOutlined />} color="cyan">
            Resheduled
          </Tag>
        );
      case BookingStatus.OnRide:
        return (
          <Tag icon={<CarOutlined />} color="warning">
            On Ride
          </Tag>
        );
      case BookingStatus.Completed:
        return (
          <Tag icon={<CarryOutOutlined />} color="success">
            Completed
          </Tag>
        );
      case BookingStatus.Cancelled:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Cancelled
          </Tag>
        );
      case BookingStatus.CancelledByUser:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Cancelled By You
          </Tag>
        );
      case TripType.OneWay:
        return (
          <Tag icon={<SwapOutlined />} color="blue">
            One Way
          </Tag>
        );
      case TripType.Round:
        return (
          <Tag icon={<CarOutlined />} color="green">
            Round
          </Tag>
        );
      case TripType.Hourly:
        return (
          <Tag icon={<ClockCircleOutlined />} color="orange">
            Hourly
          </Tag>
        );
      default:
        return null;
    }
  };

  const onCancelTrip = async () => {
    try {
      const pickupDateTime = dayjs(
        `${booking?.pick_up_date} ${booking?.pick_up_time}`
      );
      const now = dayjs();
      const hoursDiff = pickupDateTime.diff(now, "hour", true); // Calculate the difference in hours

      // Check if the difference is more than 2 hours
      if (hoursDiff <= 2) {
        message.error(
          "Cannot cancel the trip less than 2 hours before pickup time."
        );
        return; // Exit the function if the condition is not met
      }

      // Show confirmation dialog
      const isConfirmed = await confirmation(
        "Are you sure you want to cancel the trip?"
      );

      if (isConfirmed) {
        // Proceed with the Axios request to cancel the booking
        const response = await axios.put(`/bookings/${booking?._id}`, {
          booking_status: "CancelledByUser",
        });

        console.log("Status successful:", response.data);
        message.info("Trip Cancelled!");
        goBack(); // Navigate back after successful cancellation
      } else {
        console.log("Cancellation aborted by user");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Error processing your cancellation request");
    }
  };

  return (
    <div className="px-2 md:px-10 py-6 w-full">
      <div className="">
        <Button
          icon={<LeftOutlined />}
          className="tracking-tight font-medium mb-4"
          onClick={goBack}
        >
          GO BACK
        </Button>
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="text-sm text-gray-400">
              Booking ID: BTC{booking?.booking_number}
              <br />
              Booking Date & Time:{" "}
              {dayjs(booking?.createdAt).format("DD-MM-YYYY hh:mm A")}
            </div>
            <div className="text-xl flex items-center space-x-3">
              {booking?.trip_type !== "Hourly Rental" ? (
                <div>
                  {booking?.route_id?.from_id?.name} to{" "}
                  {booking?.route_id?.to_id?.name}
                </div>
              ) : (
                <div>{booking?.pickup_city?.name}</div>
              )}
              <div className="text-sm font-medium text-gray-400">
                (
                {booking?.trip_type === TripType.OneWay && (
                  <span>{booking?.route_id?.one_way_trip_km} KM</span>
                )}
                {booking?.trip_type === TripType.Round && (
                  <span>{booking?.route_id?.round_trip_km} KM</span>
                )}
                {booking?.trip_type === TripType.Hourly && (
                  <span>Hourly Rate{booking?.route_id?.one_way_trip_km}</span>
                )}
                )
              </div>
            </div>
            <div className="flex">
              <div>{getStatusTag(booking?.trip_type)}</div>
              <div>{getStatusTag(booking?.booking_status)}</div>
            </div>
          </div>
          <Form form={form}>
            <Space className="space-x-4">
              {!isBookingConfirmed &&
                !isBookingCancelled &&
                !isBookingOnRide &&
                !isBookingCompleted &&
                !isBookingCancelledByUser && (
                  <>
                    <Button
                      className="font-semibold w-28 h-10"
                      onClick={onCancelTrip}
                    >
                      CANCEL
                    </Button>
                  </>
                )}
            </Space>
          </Form>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex">
        <div className="h-full">
          <div>
            {isEditable && (
              <Form
                className="border-red-100 border p-2"
                form={form}
                onFinish={handleUpdateBooking}
                layout="vertical"
              >
                <div className="flex gap-4">
                  <Form.Item
                    className="w-full"
                    label="Pickup Date"
                    name="pickupDate"
                    initialValue={pickupDate}
                  >
                    <DatePicker
                      className="w-full"
                      format="DD-MM-YYYY"
                      onChange={handlePickupDateChange}
                      disabledDate={(current: Dayjs | null) =>
                        current
                          ? current.isBefore(dayjs().startOf("day")) ||
                            current.isAfter(dayjs().add(90, "days"))
                          : false
                      }
                      dateRender={(currentDate) => {
                        const isSunday = currentDate.day() === 0; // 0 represents Sunday in dayjs
                        return (
                          <div
                            className={`ant-picker-cell-inner ${
                              isSunday ? 'bg-[#FDB813]' : ''
                            }`}
                          >
                            {currentDate.date()}
                          </div>
                        );
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Pickup Time"
                    name="pickupTime"
                    initialValue={pickupTime}
                  >
                    <Dropdown
                      className="w-full"
                      overlay={
                        <Menu
                          items={timeOptions}
                          onClick={onTimeChange}
                          className="h-60 overflow-y-auto"
                        />
                      }
                      trigger={["click"]}
                    >
                      <Button>{pickupTime}</Button>
                    </Dropdown>
                  </Form.Item>
                </div>
                {/* {booking?.trip_type === TripType.Round && (
                  <Form.Item
                    label="Return Date"
                    name="returnDate"
                    initialValue={returnDate}
                  >
                    <DatePicker disabled={true} value={returnDate}/>
                  </Form.Item>
                )} */}
                <Button danger htmlType="submit" className="w-full">
                  Reschedule Booking
                </Button>
              </Form>
            )}
            <div className="text-gray-400 my-3">PAYMENT DETAILS</div>
            <div className="overflow-x-auto">
              <table className="divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        TOTAL AMOUNT
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{totalAmount}</div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        DUE AMOUNT
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">{dueAmount}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="text-gray-400 my-3">TRIP DETAILS</div>
            <div className="overflow-x-auto">
              <table className="divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        REQUESTED TAXI
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {booking?.requested_taxi_type?.name}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        PICKUP ADDRESS
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {booking?.pickup_address}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        DROP ADDRESS
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {booking?.drop_address}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        PICKUP DATE
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {dayjs(booking?.pick_up_date).toString()}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        PICKUP TIME
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {booking?.pick_up_time}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        RETURN DATE
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {dayjs(booking?.return_date).toString()}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        COUPON
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-green-600">
                        {booking?.coupon_id?.name}
                      </div>
                      <div className="text-sm text-green-500">
                        {booking?.coupon_id?.discount_perc}% discount
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {isBookingConfirmed ||
          (isBookingOnRide && (
            <>
              <div className=" w-1/3 h-full">
                <div>
                  <div className="text-gray-400 my-3">TAXI DETAILS</div>
                  <div className="overflow-x-auto">
                    <table className="divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              TAXI NUMBER
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {booking?.taxi_id?.taxi_no}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              TAXI TYPE
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {booking?.taxi_id?.taxi_type_id?.name}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="w-1/3 h-full">
                <div>
                  <div className="text-gray-400 my-3">DRIVER DETAILS</div>
                  <div className="overflow-x-auto">
                    <table className="divide-y divide-gray-200">
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              DRIVE NAME
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {booking?.driver_id?.name}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              DRIVE MOBILE NO
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {booking?.driver_id?.mobile_no}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              DRIVE EMAIL
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {booking?.driver_id?.email_id}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
}
