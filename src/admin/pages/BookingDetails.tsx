import { LeftOutlined, CheckCircleOutlined, CloseCircleOutlined, CarryOutOutlined, CarOutlined, SwapOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Form, Select, Space, Tag, message } from "antd";
import { useLocation } from "react-router-dom";
import { BookingStatus, IBooking, TripType } from "../../types/bookings.types";
import axios from "../../api/axios"
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Driver } from "../../types/drivers.types";
import { Taxi } from "../../types/taxi.types";
import { TaxiDetailsBookingForm } from "../components/TaxiDetailsBookingForm";
import { DriverDetailsBookingForm } from "../components/DriverDetailsBookingForm";
import { confirmation } from "../components/Confirmation";

export default function BookingDetails() {

    const { state } = useLocation();
    const booking: IBooking = state?.booking;
    const [form] = Form.useForm();

    const isBookingCancelled = booking?.booking_status === BookingStatus.Cancelled;
    const isBookingCompleted = booking?.booking_status === BookingStatus.Completed;
    const isBookingConfirmed = booking?.booking_status === BookingStatus.Confirmed;
    const isBookingOnRide = booking?.booking_status === BookingStatus.OnRide;

    const [drivers, setDrivers] = useState([]);
    const [taxis, setTaxis] = useState([]);

    const [hoveredTaxi, setHoveredTaxi] = useState<Taxi | null>(null);
    const [hoveredDriver, setHoveredDriver] = useState<Driver | null>(null);

    const handleHover = (taxi: Taxi) => {
        setHoveredTaxi(taxi);
    };

    const goBack = () => {
        window.history.back();
    };

    const onFinish = async (values: IBooking) => {
        try {
            // Show confirmation dialog
            const isConfirmed = await confirmation('Are you sure you want to assign the taxi and driver and confirm the booking?');

            // If user confirms, proceed with the Axios post request
            if (isConfirmed) {
                // Make Axios post request to /assign-taxi-driver endpoint
                const response = await axios.post('/bookings/assign-taxi-driver', {
                    ...values,
                    booking_id: booking?._id
                });

                // Handle response as needed
                console.log('Assignment successful:', response.data);
                message.success("Assignment successful, Booking has been confirmed")
                goBack()

                // Optionally navigate or perform other actions after successful assignment
            } else {
                // Handle if user cancels the confirmation
                console.log('Assignment cancelled by user');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating route');
        }
    };

    const onStartTrip = async () => {
        try {
            // Show confirmation dialog
            const isConfirmed = await confirmation('Are you sure you want to start the trip?');

            // If user confirms, proceed with the Axios post request
            if (isConfirmed) {
                // Make Axios post request to /assign-taxi-driver endpoint
                const response = await axios.post('/bookings/start-trip', {
                    booking_id: booking?._id
                });

                // Handle response as needed
                console.log('Status successful:', response.data);
                message.success("Trip Started, Happy Journey!")
                goBack()

                // Optionally navigate or perform other actions after successful assignment
            } else {
                // Handle if user cancels the confirmation
                console.log('Assignment cancelled by user');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating route');
        }
    }

    const onEndTrip = async () => {
        try {
            // Show confirmation dialog
            const isConfirmed = await confirmation('Are you sure you want to end the trip?');

            // If user confirms, proceed with the Axios post request
            if (isConfirmed) {
                // Make Axios post request to /assign-taxi-driver endpoint
                const response = await axios.post('/bookings/end-trip', {
                    booking_id: booking?._id
                });

                // Handle response as needed
                console.log('Status successful:', response.data);
                message.success("Trip Ended!")
                goBack()

                // Optionally navigate or perform other actions after successful assignment
            } else {
                // Handle if user cancels the confirmation
                console.log('Assignment cancelled by user');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating route');
        }
    }

    const onCancelTrip = async () => {
        try {
            // Show confirmation dialog
            const isConfirmed = await confirmation('Are you sure you want to cancel the trip?');

            // If user confirms, proceed with the Axios post request
            if (isConfirmed) {
                // Make Axios post request to /assign-taxi-driver endpoint
                const response = await axios.put(`/bookings/${booking?._id}`, {
                    booking_status: 'Cancelled'
                });

                // Handle response as needed
                console.log('Status successful:', response.data);
                message.info("Trip Cancelled!")
                goBack()

                // Optionally navigate or perform other actions after successful assignment
            } else {
                // Handle if user cancels the confirmation
                console.log('Assignment cancelled by user');
            }
        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating route');
        }
    }

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

    useEffect(() => {
        // Fetch drivers and taxis on component mount
        if (!isBookingConfirmed) {
            fetchDrivers();
            fetchTaxis();
        }
    }, []);

    const fetchDrivers = () => {
        // Replace 'your_api_url_for_drivers' with your actual API endpoint for fetching drivers
        axios.get('/drivers/', {
            params: {
                filter: JSON.stringify({
                    driver_status: { $nin: ['On a Trip', 'Unavailable'] }
                })
            },
        })
            .then(response => setDrivers(response.data.drivers))
            .catch(error => console.error('Error fetching drivers:', error));
    };

    const fetchTaxis = () => {
        // Replace 'your_api_url_for_taxis' with your actual API endpoint for fetching taxis
        axios.get('/taxis/', {
            params: {
                filter: JSON.stringify({
                    taxi_status: { $nin: ['On a Trip', 'Unavailable'] }
                })
            },
        })
            .then(response => setTaxis(response.data.taxis))
            .catch(error => console.error('Error fetching taxis:', error));
    };

    return (
        <div className='px-10 py-6 w-full'>
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
                    <div className="flex space-x-1 items-end">
                        <div className="text-sm">
                            BASE FARE:
                        </div>
                        <div className="text-2xl text-red-500">
                            ₹ {booking?.base_fare?.toLocaleString()}
                        </div>
                    </div>
                    <Form form={form}>
                        <Space className='space-x-4'>
                            {isBookingOnRide &&
                                <>
                                    <div className="w-28" />
                                    <Button onClick={onEndTrip} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                                        END TRIP
                                    </Button>
                                </>}
                            {!isBookingConfirmed && !isBookingOnRide && !isBookingCompleted && !isBookingCancelled && (
                                <>
                                    <Button htmlType="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                                        CONFIRM
                                    </Button>
                                    <Button className="font-semibold w-28 h-10" onClick={onCancelTrip}>
                                        CANCEL
                                    </Button>
                                </>
                            )}
                            {isBookingConfirmed && (
                                <>
                                    <div className="w-28" />
                                    <Button onClick={onStartTrip} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                                        START TRIP
                                    </Button>
                                </>
                            )}

                        </Space>
                    </Form>
                </div>
            </div>
            <hr className="my-5" />
            <div className="flex">
                <div className=" w-1/3 h-full">

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
                                            <div className="text-sm text-gray-500">{dayjs(booking?.pick_up_date).format("DD-MM-YYYY")}</div>
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
                                            <div className="text-sm text-gray-500">{dayjs(booking?.return_date).format("DD-MM-YYYY")}</div>
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
                    <div>
                        <div className="text-gray-400 my-3">
                            TRAVELLERS DETAILS
                        </div>
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">NAME</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.name}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">GENDER</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.gender}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">EMAIL</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.emailId}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">PHONE</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">+91 {booking?.contactNumber}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">PHONE</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">+91 {booking?.pincode}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">PHONE</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">+91 {booking?.address}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 my-3">
                            ADDITIONAL INFORMATION
                        </div>
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">No. of passengers</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.numberOfPassengers ? booking?.numberOfPassengers : "-"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">No. of small bags</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.numberOfSmallBags ? booking?.numberOfSmallBags : "-"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">No. of large bags</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.numberOfLargeBags ? booking?.numberOfLargeBags : "-"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Senior citizen traveling</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.seniorCitizen ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Women traveling</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.womenTraveling ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Kids on board</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.kidsOnBoard ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">English-speaking driver preferred</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.englishSpeakingDriver ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Carrying Pet</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.carryingPet ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Need 7+1 seater</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.need7Plus1Seater ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Carrier over the top of vehicle</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.carrierOverTop ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Booking for someone else</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.bookingForSomeoneElse ? "YES" : "NO"}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Other</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{booking?.otherDetails ? booking?.otherDetails : "-"}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {!isBookingConfirmed && !isBookingOnRide && !isBookingCompleted && !isBookingCancelled &&
                    <>
                        <div className=" w-1/3">
                            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-md mx-auto mt-8">
                                <div className="shadow-lg border-2 mb-4 h-64 rounded">
                                    {
                                        hoveredTaxi ?
                                            <TaxiDetailsBookingForm taxi={hoveredTaxi} taxiType={hoveredTaxi.taxi_type_id} />
                                            :
                                            <div className="text-xl text-gray-400 flex justify-center items-center h-full">
                                                SELECT A TAXI
                                            </div>
                                    }
                                </div>

                                <Form.Item name="taxi_id" label="Taxi" rules={[{ required: true, message: 'Please select a Taxi' }]}>
                                    {/* Use Select component to choose from cities */}
                                    <Select>
                                        {/* Map through the cities to populate the options */}
                                        {taxis.map((taxi: Taxi) => (
                                            <Select.Option key={taxi._id} value={taxi._id} onMouseEnter={() => handleHover(taxi)}>
                                                {taxi.taxi_type_id?.name} - {taxi.taxi_no}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className=" w-1/3">
                            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-md mx-auto mt-8">
                                <div className="shadow-lg border-2 mb-4 h-64 rounded">
                                    {
                                        hoveredDriver ?
                                            <DriverDetailsBookingForm driver={hoveredDriver} />
                                            :
                                            <div className="text-xl text-gray-400 flex justify-center items-center h-full">
                                                SELECT A DRIVER
                                            </div>
                                    }
                                </div>
                                <Form.Item name="driver_id" label="Driver" rules={[{ required: true, message: 'Please select a Driver' }]}>
                                    {/* Use Select component to choose to cities */}
                                    <Select>
                                        {/* Map through the cities to populate the options */}
                                        {drivers.map((driver: Driver) => (
                                            <Select.Option key={driver._id} value={driver._id} onMouseEnter={() => setHoveredDriver(driver)}>
                                                {driver.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Form>
                        </div>
                    </>}
                {(isBookingConfirmed || isBookingOnRide || isBookingCompleted) &&
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

