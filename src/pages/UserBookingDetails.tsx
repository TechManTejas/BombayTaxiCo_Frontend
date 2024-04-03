import { LeftOutlined, CheckCircleOutlined, CloseCircleOutlined, CarryOutOutlined, CarOutlined, SwapOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Form, Space, Tag, message } from "antd";
import { useLocation } from "react-router-dom";
import { BookingStatus, IBooking, TripType } from "../types/bookings.types";
import dayjs from "dayjs";
import axios from "../api/axios"
import { confirmation } from "../components/Confirmation";

export default function UserBookingDetails() {

    const { state } = useLocation();
    const booking: IBooking = state?.booking;
    const [form] = Form.useForm();

    const isBookingCancelled = booking?.booking_status === BookingStatus.Cancelled;
    const isBookingConfirmed = booking?.booking_status === BookingStatus.Confirmed;
    const isBookingOnRide = booking?.booking_status === BookingStatus.OnRide;

    console.log(booking)

    const goBack = () => {
        window.history.back();
    };

    // const onCancelTrip = async () => {
    //     try {
    //         // Show confirmation dialog
    //         const isConfirmed = await confirmation('Are you sure you want to cancel the trip?');

    //         // If user confirms, proceed with the Axios post request
    //         if (isConfirmed) {
    //             // Make Axios post request to /assign-taxi-driver endpoint
    //             const response = await axios.put(`/bookings/${booking?._id}`, {
    //                 booking_status: 'Cancelled' 
    //             });

    //             // Handle response as needed
    //             console.log('Status successful:', response.data);
    //             message.info("Trip Cancelled!")
    //             goBack()

    //             // Optionally navigate or perform other actions after successful assignment
    //         } else {
    //             // Handle if user cancels the confirmation
    //             console.log('Assignment cancelled by user');
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         message.error('Error adding/updating route');
    //     }
    // }

    const getStatusTag = (status: string | undefined) => {
        switch (status) {
            case BookingStatus.New:
                return <Tag icon={<CheckCircleOutlined />} color="processing">New</Tag>;
            case BookingStatus.Confirmed:
                return <Tag icon={<CheckCircleOutlined />} color="success">Confirmed</Tag>;
            case BookingStatus.OnRide:
                return <Tag icon={<CarOutlined />} color="warning">On Ride</Tag>;
            case BookingStatus.Completed:
                return <Tag icon={<CarryOutOutlined />} color="success">Completed</Tag>;
            case BookingStatus.Cancelled:
                return <Tag icon={<CloseCircleOutlined />} color="error">Cancelled</Tag>;
            case TripType.OneWay:
                return <Tag icon={<SwapOutlined />} color="blue">One Way</Tag>;
            case TripType.Round:
                return <Tag icon={<CarOutlined />} color="green">Round</Tag>;
            case TripType.Hourly:
                return <Tag icon={<ClockCircleOutlined />} color="orange">Hourly</Tag>;
            default:
                return null;
        }
    };

    const onCancelTrip = async () => {
        try {
            const pickupDateTime = dayjs(`${booking?.pick_up_date} ${booking?.pick_up_time}`);
            const now = dayjs();
            const hoursDiff = pickupDateTime.diff(now, 'hour', true); // Calculate the difference in hours
    
            // Check if the difference is more than 2 hours
            if (hoursDiff <= 2) {
                message.error("Cannot cancel the trip less than 2 hours before pickup time.");
                return; // Exit the function if the condition is not met
            }
    
            // Show confirmation dialog
            const isConfirmed = await confirmation('Are you sure you want to cancel the trip?');
    
            if (isConfirmed) {
                // Proceed with the Axios request to cancel the booking
                const response = await axios.put(`/bookings/${booking?._id}`, {
                    booking_status: 'Cancelled'
                });
    
                console.log('Status successful:', response.data);
                message.info("Trip Cancelled!");
                goBack(); // Navigate back after successful cancellation
            } else {
                console.log('Cancellation aborted by user');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error processing your cancellation request');
        }
    };

    return (
        <div className='px-2 md:px-10 py-6 w-full'>
            <div className="">
                <Button icon={<LeftOutlined />} className="tracking-tight font-medium mb-4" onClick={goBack}>
                    GO BACK
                </Button>
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="text-sm text-gray-400">
                            Booking ID: {booking?._id}
                        </div>
                        <div className="text-xl flex items-center space-x-3">
                            {booking?.trip_type !== "Hourly Rental" ?
                                (<div>
                                    {booking?.route_id?.from_id?.name} to {booking?.route_id?.to_id?.name}
                                </div>)
                                : (<div>
                                    {booking?.pickup_city?.name}
                                </div>)
                            }
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
                            <div>
                                {getStatusTag(booking?.trip_type)}
                            </div>
                            <div>
                                {getStatusTag(booking?.booking_status)}
                            </div>
                        </div>
                    </div>
                    <Form form={form}>
                        <Space className='space-x-4'>
                            {!isBookingConfirmed && !isBookingCancelled && (
                                <>
                                    <Button className="font-semibold w-28 h-10" onClick={onCancelTrip}>
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
                        <div className="text-gray-400 my-3">
                            TRIP DETAILS
                        </div>
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">REQUESTED TAXI</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{booking?.requested_taxi_type?.name}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">PICKUP ADDRESS</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{booking?.pickup_address}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">DROP ADDRESS</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{booking?.drop_address}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">PICKUP DATE</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{dayjs(booking?.pick_up_date).toString()}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">PICKUP TIME</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{booking?.pick_up_time}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">RETURN DATE</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-500">{dayjs(booking?.return_date).toString()}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">COUPON</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-green-600">{booking?.coupon_id?.name}</div>
                                            <div className="text-sm text-green-500">{booking?.coupon_id?.discount_perc}%  discount</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {isBookingConfirmed || isBookingOnRide &&
                    <>

                        <div className=" w-1/3 h-full">
                            <div>
                                <div className="text-gray-400 my-3">
                                    TAXI DETAILS
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="divide-y divide-gray-200">
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">TAXI NUMBER</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{booking?.taxi_id?.taxi_no}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">TAXI TYPE</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{booking?.taxi_id?.taxi_type_id?.name}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/3 h-full">
                            <div>
                                <div className="text-gray-400 my-3">
                                    DRIVER DETAILS
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="divide-y divide-gray-200">
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">DRIVE NAME</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">{booking?.driver_id?.name}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">DRIVE MOBILE NO</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">{booking?.driver_id?.mobile_no}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">DRIVE EMAIL</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">{booking?.driver_id?.email_id}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

