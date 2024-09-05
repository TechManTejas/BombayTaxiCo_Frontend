import React, { useRef } from 'react';
import Logo from "../../assets/images/logo.png"
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router-dom';
import { IInvoice } from '../../types/invoices.types';
import QRCode from '../../assets/images/qr.png'

const InvoiceDetails: React.FC = () => {

    const { state } = useLocation();
    const invoice: IInvoice = state?.invoice;

    console.log(invoice);

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const goBack = () => {
        window.history.back();
    };

    return (
        <div className='px-10 py-6 w-full'>
            <Button icon={<LeftOutlined />} className="tracking-tight font-medium mb-4" onClick={goBack}>
                GO BACK
            </Button>
            <div className='text-2xl font-light'>
                INVOICE
            </div>
            <div className="w-full mx-auto py-2 sm:px-2 flex-grow">
                {/* row */}
                <div className="flex flex-wrap flex-row">
                    <div
                        id="title-invoice"
                        className="flex justify-between max-w-full px-4 py-4 w-full"
                    >
                        <p className="text-xl font-bold mt-3 mb-5">Invoice #1089</p>
                        <Button
                            id="btn-invoice"
                            className="text-gray-100 bg-[#FDB813] border border-yellow-500 hover:text-white hover:bg-[#FDB813] hover:ring-0 focus:bg-[#FDB813] focus:border-yellow-600 space-x-2"
                            onClick={handlePrint}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="ltr:mr-2 rtl:ml-2 inline-block bi bi-printer"
                                viewBox="0 0 16 16"
                            >
                                <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                            </svg>
                            Print Invoice
                        </Button>
                    </div>
                    <div className="flex-shrink max-w-full px-4 w-full mb-6 shadow-lg">
                        <div ref={componentRef} className="p-4 bg-white rounded-lg">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200  mb-3">
                                <div className="flex flex-col">
                                    <div className="text-4xl font-bold flex items-center">
                                        <img
                                            className="inline-block w-12 h-auto mr-2"
                                            src={Logo}
                                        />
                                        <span>
                                            Bombay Taxi Co
                                        </span>
                                        <span className='text-[#FDB813]'>.</span>

                                    </div>
                                    <div>
                                        <div>
                                            Andreas street, Mountain View, San Francisco, CA 9321, US
                                        </div>
                                        <div className='space-x-3'>
                                            <span className='font-bold'>
                                                bombaytaxicompany@gmail.com
                                            </span>
                                            <span className='font-bold'>
                                                +917332232343
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-4xl uppercase font-bold">
                                    Invoice
                                </div>
                            </div>
                            <div className="flex flex-row w-full justify-between py-3">
                                {/* <div className="flex-1">
                                    <p>
                                        <strong>Bill from:</strong>
                                        <br />
                                        Bombay Taxi Co.
                                        <br />
                                        Andreas street, Mountain View
                                        <br />
                                        San Francisco, CA 9321, US
                                        <br />
                                        bombaytaxicompany@gmail.com
                                        <br />
                                        +123 456 7890
                                    </p>
                                </div> */}
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Trip Type :
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            Round Trip
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Cab Type :
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            Hatchback
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Pickup city:
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            Mumbai, Maharashtra
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Pickup Location:
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            Ghatkopar, Mumbai, Maharashtra
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Destination:
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            Katarj, Pune, Maharashtra
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Travel Date & Time:
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            25-02-2024, 06:00 am
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="flex-1 font-semibold">
                                            Return Date & Time:
                                        </div>
                                        <div className="flex-1 ltr:text-right rtl:text-left">
                                            27-02-2024, 10:00pm
                                        </div>
                                    </div>
                                </div>
                                <div className='space-y-3'>
                                    <div className="">
                                        <p>
                                            <strong>Bill to:</strong>
                                            <br />
                                            James Doe
                                            <br />
                                            Andreas street, Mountain View
                                            <br />
                                            San Francisco, CA 9321, US
                                            <br />
                                            Andreas-Doe@domain.com
                                            <br />
                                            +123 456 7890
                                        </p>
                                    </div>
                                    <div className="w-56">
                                        <div className="flex justify-between">
                                            <div className="flex-1 font-semibold">
                                                Invoice ID#:
                                            </div>
                                            <div className="flex-1 ltr:text-right rtl:text-left">
                                                INV1089
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex-1 font-semibold">
                                                Invoice date:
                                            </div>
                                            <div className="flex-1 ltr:text-right rtl:text-left">
                                                12/08/2022
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex-1 font-semibold">
                                                Due date:
                                            </div>
                                            <div className="flex-1 ltr:text-right rtl:text-left">
                                                12/08/2022
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex-1 font-semibold">
                                                Status #:
                                            </div>
                                            <div className="flex-1 ltr:text-right rtl:text-left">
                                                Paid
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex-1 font-semibold">
                                                Booking ID#:
                                            </div>
                                            <div className="flex-1 ltr:text-right rtl:text-left">
                                                BTC0001
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-4">
                                <table className="table-bordered w-full ltr:text-left rtl:text-right text-gray-600">
                                    <thead className="border-b">
                                        <tr className="bg-gray-100">
                                            <th className='p-2'>Service</th>
                                            <th className="text-center p-2">Qty</th>
                                            <th className="text-center p-2">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b ">
                                            <td>
                                                Base Fare
                                            </td>
                                            <td className="text-center">1</td>
                                            <td className="text-center">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Tolls
                                            </td>
                                            <td className="text-center">1</td>
                                            <td className="text-center">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Parking
                                            </td>
                                            <td className="text-center ">1</td>
                                            <td className="text-center ">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Driver allowance
                                            </td>
                                            <td className="text-center ">1</td>
                                            <td className="text-center ">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Waiting Charge
                                            </td>
                                            <td className="text-center ">1</td>
                                            <td className="text-center ">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Extra Pickup Charge
                                            </td>
                                            <td className="text-center ">1</td>
                                            <td className="text-center ">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Extra Drop Charge
                                            </td>
                                            <td className="text-center ">1</td>
                                            <td className="text-center ">80₹ </td>
                                        </tr>
                                        <tr className="border-b ">
                                            <td className=''>
                                                Other
                                            </td>
                                            <td className="text-center ">1</td>
                                            <td className="text-center ">80₹ </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={1} className='' />
                                            <td className="text-center ">
                                                <b>Sub-Total</b>
                                            </td>
                                            <td className="text-center ">₹290</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={1} className='' />
                                            <td className="text-center ">
                                                <b>Discount</b>
                                            </td>
                                            <td className="text-center ">15%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={1} className='' />
                                            <td className="text-center ">
                                                <b>Online Paid</b>
                                            </td>
                                            <td className="text-center ">15%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={1} className='' />
                                            <td className="text-center ">
                                                <b>Cash Paid</b>
                                            </td>
                                            <td className="text-center ">15%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={1} className='' />
                                            <td className="text-center ">
                                                <b>Tax</b>
                                            </td>
                                            <td className="text-center ">4%</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={1} className='' />
                                            <td className="text-center ">
                                                <b>Total</b>
                                            </td>
                                            <td className="text-center font-bold ">₹ 258,8</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className='' />
                                            <td colSpan={1} className='w-60 font-bold'>
                                                Two hundred and fifty eight
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div>
                                <div className="flex flex-row w-full justify-between py-3">
                                    <div className="flex-1">
                                        <div className='space-y-2'>
                                            <div>
                                                Company Name - DARSH TRAVELS
                                                <br />
                                                Account Number - 10071729117
                                                <br />
                                                IFSC - IDFB0040159
                                                <br />
                                                Bank Name - IDFC BANK
                                                <br />
                                            </div>
                                            <div className='border-2 p-2 h-16 border-black flex flex-col justify-between'>
                                                <div>
                                                    M/s. For Bombay Taxi Co.
                                                </div>
                                                <div className='flex w-full justify-end'>
                                                    Authorised Signatory
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 justify-center flex">
                                        <div className=''>
                                            <img src={QRCode} className='h-40'/>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className='text-center'>
                                            <div>
                                                Terms & Conditions
                                            </div>
                                            <br />
                                            <div className='font-bold'>
                                                Thank You For Your Business!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InvoiceDetails;