/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarOutlined, LeftOutlined, SafetyCertificateOutlined, ShoppingOutlined, SwapOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import { Footer } from '../components/Footer';
import CarCard, { Feature } from '../components/CarCard';
import { useNavigate } from 'react-router-dom';

import Car1 from "../assets/images/economy.webp"
import Car2 from "../assets/images/comfort.webp"
import Car3 from "../assets/images/standard.webp"
import Car4 from "../assets/images/business.webp"
import Car5 from "../assets/images/family.webp"
import { DatePicker, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import dayjs, { Dayjs } from 'dayjs';

const BillCard = () => {
  return (
    <>
      <div className='min-w-[360px] max-w-xs w-full m-3 sticky top-6'>
        <div>
          <div className='text-xl my-1'>Fare Details</div>
          <div className='font-light space-y-1'>
            <div className='flex justify-between'>
              <div>Base Fare</div>
              <div>Included</div>
            </div>
            <div className='flex justify-between'>
              <div>GST(5% on Base Fare)</div>
              <div>Not Included</div>
            </div>
            <div className='flex justify-between'>
              <div>State, Toll Tax</div>
              <div>Included</div>
            </div>
            <div className='flex justify-between'>
              <div>Vehicles & Fuel Charges</div>
              <div>148KM</div>
            </div>
            <div className='flex justify-between'>
              <div>One Pickup & Drop</div>
              <div>Included</div>
            </div>
          </div>
        </div>
        <hr className='my-3' />
        <div>
          <div className='text-xl my-1'>Other Charges</div>
          <div className='font-light space-y-1'>
            <div className='flex justify-between'>
              <div>Parking & Airport Entry</div>
              <div>If Applicable</div>
            </div>
            <div className='flex justify-between'>
              <div>Waiting Charges</div>
              <div>₹2/Min</div>
            </div>
            <div className='flex justify-between'>
              <div>Night Charges <br /> (11 PM & 6 AM)</div>
              <div>₹250/Day</div>
            </div>
            <div className='flex justify-between'>
              <div>Extra Pickup/Drop</div>
              <div>₹99</div>
            </div>
          </div>
        </div>
        <hr className='my-3' />
        <div>
          <div className='text-xl my-1'>Extra Km Charges</div>
          <div className='font-light space-y-1'>
            <div className='flex justify-between'>
              <div>Economy</div>
              <div>₹15/KM</div>
            </div>
            <div className='flex justify-between'>
              <div>Comfort</div>
              <div>₹15/KM</div>
            </div>
            <div className='flex justify-between'>
              <div>Premium</div>
              <div>₹15/KM</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Search: React.FC = () => {

  const navigate = useNavigate()

  const tripTypeRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const pickupDateRef = useRef<HTMLDivElement>(null);
  const pickupTimeRef = useRef<HTMLDivElement>(null);

  const [tripType, setTripType] = useState<string>("One Way Trip")
  const [from, setFrom] = useState<string>("Mumbai");
  // const [fromId, setFromId] = useState<string | null>(null);
  const [to, setTo] = useState("Pune");
  // const [toId, setToId] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs());
  const [pickupTime, setPickupTime] = useState<string>('10:00 AM')

  const [tripTypeOpen, setTripTypeOpen] = useState<boolean>(false);
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [pickupDateOpen, setPickupDateOpen] = useState<boolean>(false);
  const [pickupTimeOpen, setPickupTimeOpen] = useState<boolean>(false);

  const toggleTripType = () => {
    setTripTypeOpen(!tripTypeOpen)
  };

  const toggleFrom = () => {
    setFromOpen(!fromOpen)
  };

  const toggleTo = () => {
    setToOpen(!toOpen)
  };

  const togglePickupDate = () => {
    setPickupDateOpen(!pickupDateOpen)
  };

  const togglePickupTime = () => {
    setPickupTimeOpen(!pickupTimeOpen)
  };

  const handleTripTypeChange = (value: string) => {
    setTripType(value)
  }
  const handleFromChange = (value: string) => {
    console.log(value)
    setFrom(value)
  }
  const handleToChange = (value: string) => {
    setTo(value)
  }

  const handlePickupDateChange = (date: Dayjs | null, dateString: string) => {
    console.log('Selected Date:', dateString);
    setPickupDate(date)
    togglePickupDate()
  }

  const handlePickupTimeChange = (value: string) => {
    setPickupTime(value)
  }

  const carFeatures: Feature[] = [
    { icon: <CarOutlined />, text: '4 Seater' },
    { icon: '❄️', text: 'AC' },
    { icon: <ShoppingOutlined />, text: '2 Bags' },
    { icon: <SafetyCertificateOutlined />, text: 'Child seat' },
  ];

  const suvFeatures: Feature[] = [
    { icon: <CarOutlined />, text: '5 Seater' },
    { icon: '❄️', text: 'Dual-zone AC' },
    { icon: <ShoppingOutlined />, text: '3 Bags' },
    { icon: <SafetyCertificateOutlined />, text: 'Advanced safety features' },
  ];

  const luxuryFeatures: Feature[] = [
    { icon: <CarOutlined />, text: '5 Seater' },
    { icon: '❄️', text: 'Premium AC' },
    { icon: <ShoppingOutlined />, text: '4 Bags' },
    { icon: <SafetyCertificateOutlined />, text: 'Luxurious interiors' },
  ];

  const vanFeatures: Feature[] = [
    { icon: <CarOutlined />, text: '7 Seater' },
    { icon: '❄️', text: 'AC' },
    { icon: <ShoppingOutlined />, text: '5 Bags' },
    { icon: <SafetyCertificateOutlined />, text: 'Spacious interior' },
  ];

  const compactFeatures: Feature[] = [
    { icon: <CarOutlined />, text: '4 Seater' },
    { icon: '❄️', text: 'AC' },
    { icon: <ShoppingOutlined />, text: '2 Bags' },
    { icon: <SafetyCertificateOutlined />, text: 'Compact size' },
  ];

  return (
    <>
      <div className='bg-[#F5F5F5]'>
        <div className='justify-center w-full
          hidden
          lg:flex
        '>
          <div className='container flex justify-center bg-[#2A2A2A] rounded-lg w-[1166px]'>
            <div className='flex items-center h-full py-2'>
              <div ref={tripTypeRef} className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-36
                xl:w-40
              ' onClick={toggleTripType}>
                <div className='px-2'>
                  <div className='text-yellow-500'>TRIP TYPE</div>
                  <div className='text-white'>{tripType}</div>
                </div>
                <Select
                  open={tripTypeOpen}
                  className='absolute w-0 h-0'
                  defaultValue="One Way Trip"
                  style={{ visibility: 'hidden', width: '100%' }}
                  onChange={handleTripTypeChange}
                  onDropdownVisibleChange={(open) => setTripTypeOpen(open)}
                >
                  <Option value="One-Way Trip">One-Way Trip</Option>
                  <Option value="Round Trip">Round Trip</Option>
                  <Option value="Hourly Rental">Hourly Rental</Option>
                </Select>
              </div>

              <div ref={fromRef} className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-36
                xl:w-40
              ' onClick={toggleFrom}>
                <div className='px-2'>
                  <div className='text-yellow-500'>FROM</div>
                  <div className='text-white'>{from}</div>
                </div>
                <Select
                  open={fromOpen}
                  className='absolute w-0 h-0'
                  defaultValue="One Way Trip"
                  style={{ visibility: 'hidden', width: '100%' }}
                  onChange={handleFromChange}
                  onDropdownVisibleChange={(open) => setFromOpen(open)}
                >
                  <Option value="One-Way Trip">One-Way Trip</Option>
                  <Option value="Round Trip">Round Trip</Option>
                  <Option value="Hourly Rental">Hourly Rental</Option>
                  {/* Add more options as needed */}
                </Select>
              </div>

              <button className='hover:shadow-xl
                w-4
                xl:w-10
              '>
                <SwapOutlined className='text-white' />
              </button>

              <div ref={toRef} className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-36
                xl:w-40
              ' onClick={toggleTo}>
                <div className='px-2'>
                  <div className='text-yellow-500'>TO</div>
                  <div className='text-white'>{to}</div>
                </div>
                <Select
                  open={toOpen}
                  className='absolute w-0 h-0'
                  defaultValue="One Way Trip"
                  style={{ visibility: 'hidden', width: '100%' }}
                  onChange={handleToChange}
                  onDropdownVisibleChange={(open) => setToOpen(open)}
                >
                  <Option value="One-Way Trip">One-Way Trip</Option>
                  <Option value="Round Trip">Round Trip</Option>
                  <Option value="Hourly Rental">Hourly Rental</Option>
                  {/* Add more options as needed */}
                </Select>
              </div>

              <div ref={pickupDateRef} className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-32
                xl:w-36
              ' onClick={togglePickupDate}>
                <div className='px-2'>
                  <div className='text-yellow-500'>PICKUP DATE</div>
                  <div className='text-white'>{pickupDate?.format('D MMM YYYY')}</div>
                </div>
                <DatePicker
                  open={pickupDateOpen}
                  onOpenChange={(open) => setPickupDateOpen(open)}
                  onChange={handlePickupDateChange}
                  className='absolute bottom-0 left-0 w-0 h-0'
                  style={{
                    visibility: 'hidden'
                  }}
                />
              </div>

              <div ref={pickupTimeRef} className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-32
                xl:w-36
              ' onClick={togglePickupTime}>
                <div className='px-2'>
                  <div className='text-yellow-500'>PICKUP TIME</div>
                  <div className='text-white'>{pickupTime}</div>
                </div>
                <Select
                  open={pickupTimeOpen}
                  className='absolute w-0 h-0'
                  defaultValue="One Way Trip"
                  style={{ visibility: 'hidden', width: '100%' }}
                  onChange={handlePickupTimeChange}
                  onDropdownVisibleChange={(open) => setPickupTimeOpen(open)}
                >
                  <Option value="One-Way Trip">One-Way Trip</Option>
                  <Option value="Round Trip">Round Trip</Option>
                  <Option value="Hourly Rental">Hourly Rental</Option>
                  {/* Add more options as needed */}
                </Select>
              </div>

              <div className='bg-[#404040] mx-1 p-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-32
                xl:w-36
              '>
                <div className='text-yellow-500'>RETURN DATE</div>
                <div className='text-white text-center'>--- --- ---</div>
              </div>

              {/* <div className='w-32 bg-[#404040] mx-1 p-2 rounded-lg text-sm'>
                <div className='text-yellow-500'>DROP TIME</div>
                <div className='text-white'>24:00</div>
              </div> */}

              <button className='bg-yellow-500 hover:bg-yellow-400 mx-1 h-full rounded-lg flex justify-center items-center font-medium
                w-32
                xl:w-36
              '>
                SEARCH
              </button>

            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='flex container justify-center
            flex-col-reverse items-center
            lg:flex-row lg:items-start
          '>
            <BillCard />
            <div className='min-h-screen'>
              <CarCard
                category='Economy'
                description='Indica / Wagonr Or Similar'
                features={carFeatures}
                originalPrice='3404'
                discountedPrice='3304'
                discount='13'
                carImage={Car1}
              />
              <CarCard
                category='SUV'
                description='Toyota Fortuner or Similar'
                features={suvFeatures}
                originalPrice='5000'
                discountedPrice='4800'
                discount='4'
                carImage={Car2}
              />
              <CarCard
                category='Luxury'
                description='Mercedes-Benz or Similar'
                features={luxuryFeatures}
                originalPrice='12000'
                discountedPrice='11000'
                discount='8'
                carImage={Car3}
              />
              <CarCard
                category='Van'
                description='Toyota Innova or Similar'
                features={vanFeatures}
                originalPrice='6000'
                discountedPrice='5500'
                discount='9'
                carImage={Car4}
              />
              <CarCard
                category='Compact'
                description='Honda Jazz or Similar'
                features={compactFeatures}
                originalPrice='3000'
                discountedPrice='2800'
                discount='7'
                carImage={Car5}
              />
            </div>
            <div className='lg:hidden'>
              <div className='border w-[440px] flex rounded-lg  gap-2 bg-white shadow-lg flex-row p-1' onClick={() => {
                navigate('/')
              }}>
                <div className='w-full'>
                  <div className='flex justify-center items-center h-12'>
                    <div className='ml-8 text-xl'>
                      <LeftOutlined />
                    </div>
                    <div className='-ml-8 text-center text-xl font-medium w-full'>
                      Mumbai to Pune
                    </div>
                  </div>
                  <hr className='border' />
                  <div className='p-2'>
                    <div className='text-sm text-zinc-500'>
                      SCHEDULED PICK UP
                    </div>
                    <div className='space-x-1'>
                      <span className='font-semibold'>
                        17 DEC,
                      </span>
                      <span className='text-sm'>
                        10:00 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='my-3 mx-6'>
                <div className='text-xl font-bold '>
                  Book cabs
                </div>
                <div className='text-sm'>
                  5 cab option(s)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ >
  );
};

export default Search;
