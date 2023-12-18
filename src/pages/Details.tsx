/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import CarCard from '../components/CarCard';
import { Button, Divider, Form, Input, Radio, RadioChangeEvent, Select, Space } from 'antd';
import axios from "../api/axios"
import Logo from "../assets/images/logo.png"
import { Option } from 'antd/es/mentions';
import { useLocation } from 'react-router-dom';

import Car1 from "../assets/images/economy.webp"
import Car2 from "../assets/images/comfort.webp"
import Car3 from "../assets/images/standard.webp"
import Car4 from "../assets/images/business.webp"
import Car5 from "../assets/images/family.webp"
import { ISettings } from '../types/settings.types';
import { IRoute } from '../types/routes.types';

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

const ReadBeforeYouBook = () => {
  return (
    <>
      <div className='bg-white border m-3 p-4 rounded-lg'>
        <div>
          <div className='font-medium text-2xl mb-4'>
            Read before you book!
          </div>
          <div className='lg:flex gap-8
                   lg:w-[730px]
                  '>
            <div className='lg:w-1/2 space-y-4'>
              <div className='space-y-2'>
                <div className='font-bold'>Cab Category</div>
                <div className='w-full text-zinc-500 text-sm'>The booking will be for cab type HATCHBACK and we do not commit on providing the preferred cab model (Indica, Swift or similar)</div>
              </div>
              <div className='space-y-2'>
                <div className='font-bold'>Hilly Regions</div>
                <div className='w-full text-zinc-500 text-sm'>AC will be switched off in hilly areas</div>
              </div>
              <div className='space-y-2'>
                <div className='font-bold'>Luggage Policy</div>
                <div className='w-full text-zinc-500 text-sm'>HATCHBACK has space for 1 Luggage Bag. In case the car happens to be CNG, the luggage space will be lesser. However depending on the number of passengers, luggage can be adjusted in seating area with driver consent.</div>
              </div>
              <div className='space-y-2'>
                <div className='font-bold'>Driver Details</div>
                <div className='w-full text-zinc-500 text-sm'>Driver details will be shared up to 30 mins prior to departure. Incase the driver/cab that reaches you for pick up is different from what we have communicated, please don't board the cab and call us for assistance.</div>
              </div>
            </div>
            <div className='lg:w-1/2 space-y-4'>
              <div className='space-y-2'>
                <div className='font-bold'>Stops</div>
                <div className='w-full text-zinc-500 text-sm'>This is a point to point booking and only one stop for meals is included.</div>
              </div>
              <div className='space-y-2'>
                <div className='font-bold'>Waiting Charges</div>
                <div className='w-full text-zinc-500 text-sm'>Driver would wait maximum 45 minutes from your scheduled pickup time at your pickup location. Post this, your trip may get cancelled without any refund. If there is a mutual agreement between customer and driver, waiting charges would be Rs 2.0/min.</div>
              </div>
              <div className='space-y-2'>
                <div className='font-bold'>Delays</div>
                <div className='w-full text-zinc-500 text-sm'>Due to traffic or any other unavoidable reason, pickup may be delayed by 30 mins.</div>
              </div>
              <div className='space-y-2'>
                <div className='font-bold'>Receipts</div>
                <div className='w-full text-zinc-500 text-sm'>You need to collect receipts from the driver for any extra charges paid directly to the driver during the trip. MMT is not liable to provide invoices for such amounts.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Details: React.FC = () => {

  const [form] = Form.useForm();

  const { state } = useLocation()

  console.log(state)

  const [settings, setSettings] = useState<ISettings | null>(null)

  const tripType = state.tripType || null
  const taxiRate = state.taxi_rate || null
  const route: IRoute = state.route || null
  const pickupDate = state.pickupDate || null
  const returnDate = state.returnDate || null
  const pickupTime = state.pickupTime || null

  const calcAdvancePay = () => {
    return (Math.round(taxiRate.discountedPrice * ((100 - parseInt(settings?.advancePaymentPercentage || '0')) / 100)))
  }

  const getCarImage = (taxiTypeName: string) => {

    switch (taxiTypeName) {
      case 'Economy Hatchback':
        return Car1;
      case 'Standard Sedan':
        return Car3;
      case 'Comfort Sedan':
        return Car2;
      case 'Family MUV':
        return Car5;
      case 'Business MUV':
        return Car4;
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/settings/get');

        console.log(response.data)
        setSettings(response.data)

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchSettings()
  }, [])

  const PaymentCard = () => {

    const [paymentType, setPaymentType] = useState<string>("advance");

    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setPaymentType(e.target.value);
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

    async function displayRazorpay(booking: any) {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      try {
        const result = await axios.post<RazorpayResponse>(`${import.meta.env.VITE_BASE_URL}/payments/orders`, booking);

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
          description: "Test Transaction For Payment",
          image: { logo: Logo }, // Replace with your logo URL
          order_id: order_id,
          handler: async function (response: RazorpayHandlerResponse) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              booking
            };

            const result = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/payments/success`,
              data
            );

            console.log(result.data.msg);
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

    const handlePayNow = () => {
      form
        .validateFields()
        .then(() => {
          const formValues = form.getFieldsValue();

          const booking = {
            "route_id": route._id,
            "trip_type": tripType,
            "pick_up_date": pickupDate,
            "return_date": returnDate,
            "pick_up_time": pickupTime,
            "pickup_address": formValues.pickupAddress,
            "drop_address": formValues.dropoffAddress,
            "requested_taxi_type": taxiRate.taxiType._id,
            "payment": paymentType
          }

          console.log(booking)

          displayRazorpay(booking)
        })
        .catch((error) => {
          console.error('Form validation failed:', error);
        });
    };

    return (
      <>
        <div className='min-w-full lg:min-w-[320px] max-w-xs lg:w-full m-3 sticky top-6'>
          <div className='bg-[#FEF0CF] p-4 text-xs rounded-t-lg'>
            Free Cancellation Before 12 Jun 2023, 09:00 Am Ist
          </div>
          <div className='bg-white border-2 rounded-b-lg p-4'>
            <div>
              <Radio.Group onChange={onChange} value={paymentType}>
                <Space direction="vertical">
                  <Radio value={"advance"}>
                    <div className=''>
                      <div className='font-semibold text-lg'>
                        PAY ADVANCE - ₹{calcAdvancePay()}
                      </div>
                      <div className='text'>
                        Rest to the Driver
                      </div>
                    </div>
                  </Radio>
                  <Radio value={"full"}>
                    <div className=''>
                      <div className='font-semibold text-lg'>
                        PAY FULL - ₹{taxiRate.discountedPrice}
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
                    ₹{taxiRate.originalPrice}
                  </span>
                  <span className='text-2xl font-bold'>₹{taxiRate.discountedPrice}</span>
                </div>
              </div>
              <div className='w-full flex justify-between items-end'>
                <div className='font-semibold'>
                  Inclusive of GST
                </div>
                <div className='space-x-3'>
                  <span className='font-bold text-yellow-500'>{(taxiRate.taxiType.discount_percentage).toString() || ''}% OFF</span>
                </div>
              </div>
            </div>
            <button onClick={handlePayNow} className='bg-yellow-500 hover:bg-yellow-400 rounded-lg flex justify-center items-center text-xl font-medium w-full py-4'>
              PAY NOW
            </button>
          </div>
        </div>
      </>
    )
  }

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
                category={taxiRate.taxiType?.name || ''}
                description={taxiRate.taxiType?.description || ''}
                features={taxiRate.taxiType?.car_features || []}
                originalPrice={taxiRate.originalPrice || ''}
                discountedPrice={taxiRate.discountedPrice || ''}
                discount={(taxiRate.taxiType.discount_percentage).toString() || ''}
                carImage={getCarImage(taxiRate.taxiType?.name) || ''}
                preview
              />
              <>
                <div className='bg-white border m-3 p-4 rounded-lg'>
                  <div className='flex h-full
                  flex-col
                  lg:flex-row
                '>
                    <div className='lg:w-1/2'>
                      <div className='font-medium text-2xl mb-4'>
                        Inclusions
                      </div>
                      <div className='mx-4 mb-4'>
                        <ul className='list-disc space-y-2 text-sm'>
                          <li>State Tax</li>
                          <li>Toll Charges</li>
                          <li>{
                            tripType === 'Round Trip'
                              ? route?.round_trip_km || 0
                              : tripType === 'Hourly Rental'
                                ? 0
                                : route?.one_way_trip_km || 0
                          } Kms</li>
                          <li>Driver Allowance</li>
                          <li>Only One Pickup and Drop<span className='text-xs text-zinc-500'> ( Only one included ) </span></li>
                        </ul>
                      </div>
                    </div>
                    <div className='lg:w-1/2'>
                      <div className='font-medium text-2xl mb-4'>
                        Exclusions
                      </div>
                      <div className='mx-4 mb-4'>
                        <ul className='list-disc space-y-2 text-sm'>
                          <li>
                            <div className='flex'>
                              <div className='flex-grow'>Waiting Charges</div>
                              <div className="text-right w-24 font-semibold">After 45 mins, ₹{settings?.waitingChargesPerMinute}
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className='flex'>
                              <div className='flex-grow'>Fare beyond {
                                tripType === 'Round Trip'
                                  ? route?.round_trip_km || 0
                                  : tripType === 'Hourly Rental'
                                    ? 0
                                    : route?.one_way_trip_km || 0
                              } Kms</div>
                              <div className="text-right w-24 font-semibold">₹ {taxiRate.taxiType.extra_km_charges}/Km
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <>
                <div className='bg-white border m-3 p-4 rounded-lg'>
                  <div className=''>
                    <div className='font-medium text-2xl mb-4'>
                      Trip Details
                    </div>
                    <div>
                      <Form
                        form={form}
                        layout='vertical'
                        name="tripDetailsForm"
                        onFinish={() => { }}
                        className='mt-4'
                      >
                        <Form.Item
                          label={
                            <div className='lg:flex items-center gap-1'>
                              <div className='font-semibold'>Pick-up Address</div>
                              <div className='text-xs text-zinc-400'>(This will help our driver reach you on time)</div>
                            </div>
                          }
                          name="pickupAddress"
                          rules={[
                            {
                              required: true,
                              message: 'Please enter the pick-up address!',
                            },
                          ]}
                        >
                          <Input placeholder='Enter exact pick-up address/nearby location/ building name' />
                        </Form.Item>
                        <Form.Item
                          label={
                            <div className='lg:flex items-center gap-1'>
                              <div className='font-semibold'>Drop-off Address</div>
                              <div className='text-xs text-zinc-400'> (Optional - This will help you avoid any extra charges after the trip)</div>
                            </div>
                          }
                          name="dropoffAddress"
                        >
                          <Input placeholder='Enter drop address to know the exact fare & avoid extra changes after the trip' />
                        </Form.Item>

                        <Divider className='w-full border-zinc-300' />

                        <div className='font-semibold text-lg my-4'>Confirm Traveller Information</div>

                        <div className='lg:flex w-full gap-10'>
                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>Name</div>
                              </div>
                            }
                            name="name"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter you Name!',
                              },
                            ]}
                          >
                            <Input placeholder='Enter your full name' />
                          </Form.Item>

                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>Gender</div>
                              </div>
                            }
                            name="gender"
                            rules={[
                              {
                                required: true,
                                message: 'Please select your gender!',
                              },
                            ]}
                          >
                            <Radio.Group>
                              <Radio value="male">Male</Radio>
                              <Radio value="female">Female</Radio>
                              <Radio value="other">Other</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>

                        <div className='lg:flex w-full gap-10'>
                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>Email Id</div>
                                <div className='text-xs text-zinc-400'> (Your booking confirmation will be sent here)</div>
                              </div>
                            }
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your email address!',
                              },
                            ]}
                            name="emailId"
                          >
                            <Input placeholder='Enter your full name' />
                          </Form.Item>

                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>Contact Number</div>
                              </div>
                            }
                            name="contactNumber"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your contact number!',
                              },
                            ]}
                          >
                            <Input placeholder='Enter your contact number' />
                          </Form.Item>
                        </div>

                        <div>
                          By proceeding to book, I Agree to Bombay Taxi's{' '}
                          <a className='text-yellow-500 hover:underline'>
                            Privacy Policy,{' '}
                          </a>
                          <a className='text-yellow-500 hover:underline'>
                            User Agreement{' '}
                          </a>
                          and
                          <a className='text-yellow-500 hover:underline'>
                            Terms of Service{' '}
                          </a>
                        </div>

                        <div className='lg:flex items-center my-4 space-x-1'>
                          <div className='font-semibold text-lg'>Your pincode and state</div>
                          <div className='text-xs text-zinc-400'>(Required for GST purpose on your tax invoice. You can edit this anytime later in your profile section.)</div>
                        </div>

                        <div className='lg:flex w-full gap-5'>
                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>Pincode</div>
                              </div>
                            }
                            name="pincode"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your pincode!',
                              },
                            ]}
                          >
                            <Input placeholder='Your Pincode' />
                          </Form.Item>

                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>State</div>
                              </div>
                            }
                            name="state"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter your state!',
                              },
                            ]}
                          >
                            <Select placeholder="Select State">
                              {/* Add Option for each state */}
                              <Option value="Maharashtra">Maharashtra</Option>
                              <Option value="Goa">Goa</Option>
                              {/* Add more states as needed */}
                            </Select>
                          </Form.Item>

                          <Form.Item
                            className='w-full'
                            label={
                              <div className='flex items-center space-x-1'>
                                <div className='font-semibold'>Address</div>
                              </div>
                            }
                            name="address">
                            <Input placeholder='Your Address (Optional)' />
                          </Form.Item>
                        </div>

                        <Form.Item
                          name="termsAndConditions"
                          valuePropName="checked"
                        >
                          <div className='flex items-center my-4 space-x-2'>
                            <input type="checkbox" />
                            <div>
                              Confirm and save billing details to your profile
                            </div>
                          </div>
                        </Form.Item>

                      </Form>
                    </div>
                  </div>
                </div>
              </>
              <ReadBeforeYouBook />
            </div>
            <PaymentCard />
          </div>
        </div >
      </div >
      <Footer />
    </ >
  );
};

export default Details;
