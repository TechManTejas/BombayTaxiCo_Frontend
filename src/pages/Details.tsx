/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarOutlined, SafetyCertificateOutlined, ShoppingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import CarCard, { Feature } from '../components/CarCard';
import { Button, Input, Radio, RadioChangeEvent, Space } from 'antd';
import axios from "../api/axios"
import Logo from "../assets/images/logo.png"

interface RazorpayResponse {
  amount: number;
  id: string;
  currency: string;
}

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  image: { logo: string };
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}


const PaymentCard = () => {

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  function loadScript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  
  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
  
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
  
    try {
      const result = await axios.post<RazorpayResponse>(
        `${import.meta.env.VITE_BASE_URL}/payments/orders`
      );
  
      if (!result) {
        alert("Server error. Are you online?");
        return;
      }
  
      const { amount, id: order_id, currency } = result.data;
  
      const options: RazorpayOptions = {
        key: import.meta.env.VITE_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Bombay Taxi Co.",
        description: "Test Transaction",
        image: { logo: Logo }, // Replace with your logo URL
        order_id: order_id,
        handler: async function (response: RazorpayHandlerResponse) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
  
          const result = await axios.post(
            "http://localhost:5000/payments/success",
            data
          );
  
          alert(result.data.msg);
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#eab308",
        },
      };
  
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div className='min-w-[320px] max-w-xs w-full m-3 sticky top-6'>
        <div className='bg-[#FEF0CF] p-4 text-xs rounded-t-lg'>
          Free Cancellation Before 12 Jun 2023, 09:00 Am Ist
        </div>
        <div className='bg-white border-2 rounded-b-lg p-4'>
          <div>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <div className=''>
                    <div className='font-semibold text-lg'>
                      PAY ADVANCE - 1304
                    </div>
                    <div className='text'>
                      Rest to the Driver
                    </div>
                  </div>
                </Radio>
                <Radio value={2}>
                  <div className=''>
                    <div className='font-semibold text-lg'>
                      PAY FULL - 3304
                    </div>
                    <div className='text'>
                      Rest to the Driver
                    </div>
                  </div>
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <hr className='my-4' />
          <div className='space-y-2'>
            <div>
              Enter Coupon Code
            </div>
            <div>
              <Space.Compact style={{ width: '100%' }}>
                <Input className='border-r-0 rounded-lg' placeholder="Eg. FIRST203" />
                <Button className='font-semibold text-yellow-500 border-l-0'>APPLY</Button>
              </Space.Compact>
            </div>
          </div>
          <hr className='my-4' />
          <div className='my-4'>
            <div className='w-full flex justify-between items-end'>
              <div className='font-semibold text-xl'>
                Total Amount
              </div>
              <div className='space-x-3'>
                <span
                  className='font-semibold'
                  style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}
                >
                  ₹3404
                </span>
                <span className='text-2xl font-bold'>₹3304</span>
              </div>
            </div>
            <div className='w-full flex justify-between items-end'>
              <div className='font-semibold'>
                Inclusive of GST
              </div>
              <div className='space-x-3'>
                <span className='font-bold text-yellow-500'>13% OFF</span>
              </div>
            </div>
          </div>
          <button onClick={displayRazorpay} className='bg-yellow-500 hover:bg-yellow-400 rounded-lg flex justify-center items-center text-xl font-medium w-full py-4'>
            PAY NOW
          </button>
        </div>
      </div>
    </>
  )
}

const Details: React.FC = () => {

  const carFeatures: Feature[] = [
    { icon: <CarOutlined />, text: '4 Seater' },
    { icon: '❄️', text: 'AC' },
    { icon: <ShoppingOutlined />, text: '2 Bags' },
    { icon: <SafetyCertificateOutlined />, text: 'Child seat' },
  ];

  return (
    <>
      <div className='bg-[#F5F5F5]'>
        <div className='flex justify-center'>
          <div className='flex container justify-center
            flex-col items-center
            lg:flex-row lg:items-start
          '>
            <div>
              <CarCard
                category='Economy'
                description='Indica / Wagonr Or Similar'
                features={carFeatures}
                originalPrice='3404'
                discountedPrice='3304'
                discount='13'
                preview
              />
              <div className='bg-white border m-3 p-4 rounded-lg h-60'>
                <div className='flex'>
                  <div className='w-1/2'>
                    <div className='font-light'>
                      Included
                    </div>
                  </div>
                  <div className='w-1/2'>
                    <div className='font-light'>
                      Excluded
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-white border m-3 p-4 rounded-lg h-60'>
                <div className='flex'>
                  <div className='font-light'>
                    Trip Details
                  </div>
                </div>
              </div>
              <div className='bg-white border m-3 p-4 rounded-lg h-60'>
                <div className='flex'>
                  <div className='font-light'>
                    Booking Terms & Conditions
                  </div>
                </div>
              </div>
            </div>
            <PaymentCard />
          </div>
        </div>
      </div>
      <Footer />
    </ >
  );
};

export default Details;
