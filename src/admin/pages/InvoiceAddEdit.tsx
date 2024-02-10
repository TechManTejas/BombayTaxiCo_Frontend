import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, message } from 'antd';
import axios from "../../api/axios"
import { IBooking } from '../../types/bookings.types';
import dayjs from 'dayjs';
import { IInvoice } from '../../types/invoices.types';

const InvoiceAddEdit: React.FC = () => {

    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<IBooking | undefined>(undefined);

    const [tripCost, setTripCost] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [waitingCharges, setWaitingCharges] = useState<number>(0);
    const [nightAllowance, setNightAllowance] = useState<number>(0);
    const [otherCharges, setOtherCharges] = useState<number>(0);
    const [gst, setGST] = useState<number>(0);
    const [gstPercent, setGSTPercent] = useState<number>(18);
    const [total, setTotal] = useState<number>(0);

    const goBack = () => {
        window.history.back();
    };

    function updateTotal() {
        setTotal(tripCost + waitingCharges + nightAllowance + otherCharges + gst - discount);
    }

    function updateGST() {
        if (tripCost != 0) {
            setGSTPercent(Math.floor((gst / tripCost) * 100));
        }
    }

    function updateValues() {
        updateGST();
        updateTotal();
    }

    // Fetch taxiTypes and populate the options
    const fetchBookings = async (searchQuery?: string) => {
        try {
            const response = await axios.get('/bookings', {
                params: {
                    pageSize: 30,
                    search: searchQuery,
                }
            });
            console.log(response.data)
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching taxi types:', error);
        }
    };

    const handleSearch = (value: string) => {
        console.log(value)
        fetchBookings(value);
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        updateValues(); // Call the function to update values whenever relevant state changes
    }, [tripCost, discount, waitingCharges, nightAllowance, otherCharges, gst, gstPercent]);

    const onFinish = async (values: IInvoice) => {
        try {

            console.log(values.booking)

            // Add new coupon
            await axios.post('/invoices', {
                booking: values.booking,
                date: dayjs(),
                amount: total
            });
            message.success('Invoice Added successfully!');

            goBack()

        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating invoice');
        }
    };


    return (
        <div className='px-10 py-6 w-full'>
            <div className='text-2xl font-light'>
                ADD NEW INVOICE
            </div>
            <Form onFinish={onFinish} layout="vertical" className="mt-8">
                <Form.Item className='w-full' name="booking" label="SELECT BOOKING">
                    <Select
                        className="w-full"
                        showSearch
                        optionFilterProp="children"
                        onSearch={handleSearch}
                        onSelect={(value, option) => {
                            console.log(option)
                            const selectedBookingId = value as string;
                            const booking = bookings.find((booking) => booking._id === selectedBookingId);

                            if (booking) {

                                setWaitingCharges(0)
                                setNightAllowance(0)
                                setOtherCharges(0)
                                
                                setTripCost(booking?.base_fare ?? 0);
                                setDiscount(Math.ceil((booking?.base_fare ?? 0) * ((booking?.coupon_id?.discount_perc ?? 0) / 100)));
                                setGST(Math.ceil((booking?.base_fare ?? 0) * (gstPercent / 100)));
                                setTotal(tripCost + gst - discount);
                                setSelectedBooking(booking);
                            }
                        }}
                    >
                        {bookings.map((booking: IBooking) => (
                            <Select.Option key={booking._id} value={booking._id}>
                                {booking._id} -
                                {booking.trip_type} -
                                ({booking.trip_type !== 'Hourly Rental' ?
                                    <>
                                        {booking?.route_id?.from_id?.name}-{booking?.route_id?.to_id?.name}
                                    </>
                                    :
                                    <>
                                        {booking?.pickup_city?.name}
                                    </>
                                }) -
                                ₹ {booking?.base_fare?.toLocaleString()} -
                                {booking?.coupon_id?.name} -
                                {booking?.taxi_id?.taxi_type_id?.name} -
                                {booking?.taxi_id?.taxi_no} -
                                {booking?.driver_id?.name} -
                                {booking?.user_id?.name} -
                                {booking?.user_id?.mobile_no} -
                                {dayjs(booking?.pick_up_date).format("DD MMM YYYY")}

                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <div className='grid grid-cols-2'>
                    <div>
                        <div className="text-gray-400 my-3">
                            TRIP DETAILS
                        </div>
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">TRIP COST</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="text-sm ">₹ {tripCost?.toLocaleString()}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">DISCOUNT</div>
                                            <div className="text-sm text-gray-500">
                                                {selectedBooking?.coupon_id?.name} ({selectedBooking?.coupon_id?.discount_perc}%)
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="text-sm ">₹ {discount?.toLocaleString()}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">WAITING CHARGES</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap ">
                                            <Input
                                                type="tel"
                                                className="w-full text-right"
                                                value={waitingCharges}
                                                onChange={(e) => {
                                                    setWaitingCharges(parseInt(e.target.value));
                                                    updateValues();
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">NIGHT ALLOWANCE</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Input
                                                type="tel"
                                                className="w-full text-right"
                                                value={nightAllowance}
                                                onChange={(e) => {
                                                    setNightAllowance(parseInt(e.target.value));
                                                    updateValues();
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">OTHER CHARGES</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Input
                                                type="tel"
                                                className="w-full text-right"
                                                value={otherCharges}
                                                onChange={(e) => {
                                                    setOtherCharges(parseInt(e.target.value));
                                                    updateValues();
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">GST({gstPercent}%)</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Input
                                                type="tel"
                                                className="w-full text-right"
                                                value={gst}
                                                onChange={(e) => {
                                                    setGST(parseInt(e.target.value));
                                                    updateValues();
                                                }}
                                            />
                                        </td>
                                    </tr>
                                    <tr className='font-bold'>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">TOTAL</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-right">₹ {total?.toLocaleString()}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 my-3">
                            USER DETAILS
                        </div>
                        <div className="overflow-x-auto">
                            <table className="divide-y divide-gray-200">
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">NAME</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{selectedBooking?.user_id?.name}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">EMAIL ID</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{selectedBooking?.user_id?.email_id}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">CONTACT NO</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{selectedBooking?.user_id?.mobile_no}</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <Form.Item>
                    <Space className='space-x-4'>
                        <Button htmlType="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                            CREATE
                        </Button>
                        <Button className="font-semibold w-28 h-10" onClick={goBack}>
                            CANCEL
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
};

export default InvoiceAddEdit;