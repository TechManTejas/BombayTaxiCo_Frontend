import React, { useRef } from 'react';
import Logo from "../../assets/images/logo.png"
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router-dom';
import { IInvoice } from '../../types/invoices.types';

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
                <div className="flex flex-wrap flex-row">
                    <div
                        id="title-invoice"
                        className="flex justify-between max-w-full px-4 py-4 w-full"
                    >
                        <p className="text-xl font-bold mt-3 mb-5"></p>
                        <Button
                            id="btn-invoice"
                            className="text-gray-100 bg-yellow-500 border border-yellow-500 hover:text-white hover:bg-yellow-600 hover:ring-0 focus:bg-yellow-600 focus:border-yellow-600 space-x-2"
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
                        <div ref={componentRef} className="p-4 bg-white rounded-lg space-y-0">
                            <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-3">
                                <div className="flex flex-col">
                                    <div className="text-4xl font-bold flex items-center">
                                        <img
                                            className="inline-block w-12 h-auto mr-2"
                                            src={Logo}
                                        />
                                        <span>
                                            Bombay Taxi Co
                                        </span>
                                        <span className='text-yellow-500'>.</span>
                                    </div>
                                </div>
                                <div className="text-4xl uppercase font-bold">
                                    Invoice
                                </div>
                            </div>
                            <div className=''>
                                <div className='p-1 font-semibold text-xl bg-zinc-300 border border-black'>
                                    Customer Details
                                </div>
                                <div className='flex text-lg'>
                                    <div className='w-full border border-black border-t-0 py-1'>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-20 px-1'>
                                                <div>
                                                    Name
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Ms. Gargi Rai
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-20 px-1'>
                                                <div>
                                                    Email
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                email@gmail.com
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-20 px-1'>
                                                <div>
                                                    Phone
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                +91 97663 21428
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-shrink-0 w-80 border border-black border-t-0 border-l-0 py-1'>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-32 px-1'>
                                                <div>
                                                    Invoice No#
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                IC-01794
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-32 px-1'>
                                                <div>
                                                    Billed On
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                19-11-2021
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-32 px-1'>
                                                <div>
                                                    Booking ID
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                MPRS5375
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='flex'>
                                    <div className='flex-1 p-1 font-semibold text-xl bg-zinc-300 border border-black'>
                                        Trip Details
                                    </div>
                                    <div className='w-80 p-1 font-semibold text-xl bg-zinc-300 border border-black border-l-0'>
                                        Amount
                                    </div>
                                </div>
                                <div className='flex text-lg'>
                                    <div className='w-full border border-black border-t-0 py-1'>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Trip Type
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                RoundTrip
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Cab Type
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Sedan
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Pickup City
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Pune, Maharashtra
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Pickup location
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Carnation, Raheja Garden, Wanowrie, Pune
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Destination
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Hotel Sayaji, Kolhapur
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Itenerary
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Pune → Kolhapur → Pune
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    Start Date
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                17-11-2021, 06:45 am
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-36 px-1'>
                                                <div>
                                                    End Date
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                18-11-2021, 06:00 pm
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-shrink-0 w-80 border border-black border-t-0 border-l-0 py-1'>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-40 px-1'>
                                                <div>
                                                    Base Fare
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                ₹ 10,000.00
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-40 px-1'>
                                                <div>
                                                    Toll Tax
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Included
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <div className='flex flex-shrink-0 justify-between w-40 px-1'>
                                                <div>
                                                    Driver Allowance
                                                </div>
                                                <div>
                                                    :
                                                </div>
                                            </div>
                                            <div className='px-1'>
                                                Included
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex text-lg'>
                                    <div className='flex w-full border border-black border-t-0' />
                                    <div className='flex flex-shrink-0 w-80 border border-black border-t-0 border-l-0'>
                                        <div className='p-1 flex flex-1 justify-end font-bold text-2xl'>
                                            ₹ 10,000.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='p-1 font-semibold text-xl bg-zinc-300 border border-black'>
                                    Payment Details
                                </div>
                                <div className='flex text-lg'>
                                    <div className='w-full border border-black border-t-0 py-1'>
                                        <div className='flex w-full justify-end px-1 border-b border-black'>
                                            Online Paid
                                        </div>
                                        <div className='flex w-full justify-end px-1 border-b border-black font-bold'>
                                            Cash Paid
                                        </div>
                                        <div className='flex w-full justify-end px-1 border-black'>
                                            Amount Due
                                        </div>
                                    </div>
                                    <div className='flex-shrink-0 w-80 border border-black border-t-0 border-l-0 py-1'>
                                        <div className='flex w-full justify-end px-1 border-b border-black'>
                                            ₹ 00.00
                                        </div>
                                        <div className='flex w-full justify-end px-1 border-b border-black font-bold'>
                                            ₹ 10,000.00
                                        </div>
                                        <div className='flex w-full justify-end px-1 border-black'>
                                            ₹ 00.00
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-black h-28 relative'>
                                <div className='absolute bottom-1 right-1'>
                                    M/s. Darsh Travels
                                </div>
                            </div>
                            <div className='border border-black p-1'>
                                <div className='font-bold'>
                                    Terms & Conditions
                                </div>
                                <div>
                                    This is an electronically generated invoice and does not require signature
                                </div>
                                <div>
                                    All disputes are subject to jurisdiction of courts in Mumbai.
                                </div>
                                <div>
                                    Please refer our website <a href='https://www.bombaytaxicompany.com/' className='text-sky-600 underline'>wwww.bombaytaxicompany.com</a> for terms and conditions.
                                </div>
                                <div>
                                    For any queries, please write to us at <a href="mailto:bombaytaxicompany@gmail.com" className="text-sky-600 underline">bombaytaxicompany@gmail.com</a>.
                                </div>
                            </div>
                            <div className='border border-black'>
                                <div className=''>
                                    <div className='text-center'>
                                        Bombay Taxi Company
                                    </div>
                                    <div className='text-center'>
                                        A/21, Plot no 3, Kailash Chs, Mhada Colony, Mulund East Mumbai 400 081
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