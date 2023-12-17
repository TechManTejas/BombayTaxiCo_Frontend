/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, SwapOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { DatePicker, Select, Spin } from 'antd';
import { Option } from 'antd/es/mentions';
import dayjs, { Dayjs } from 'dayjs';
import { Footer } from '../components/Footer';
import CarCard from '../components/CarCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../api/axios"

import Car1 from "../assets/images/economy.webp"
import Car2 from "../assets/images/comfort.webp"
import Car3 from "../assets/images/standard.webp"
import Car4 from "../assets/images/business.webp"
import Car5 from "../assets/images/family.webp"

import { generateTimeOptions } from '../utils/GenerateTimeOptions';

import { City } from '../types/citys.types';
import { ISettings } from '../types/settings.types';
import { IRoute } from '../types/routes.types';

interface BillCardProps {
  routeDistance: number;
}

const BillCard: React.FC<BillCardProps> = ({ routeDistance }) => {

  const [settings, setSettings] = useState<ISettings | null>(null)

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

  return (
    <>
      <div className='min-w-[360px] max-w-xs w-full m-3 sticky top-6'>
        <div>
          <div className='text-xl my-1'>Fare Details</div>
          <div className='font-light space-y-1'>
            <div className='flex justify-between'>
              <div>Base Fare</div>
              <div>{settings?.baseFare}</div>
            </div>
            <div className='flex justify-between'>
              <div>GST(5% on Base Fare)</div>
              <div>{settings?.gst}</div>
            </div>
            <div className='flex justify-between'>
              <div>State, Toll Tax</div>
              <div>{settings?.stateTollTax}</div>
            </div>
            <div className='flex justify-between'>
              <div>Vehicles & Fuel Charges</div>
              <div>{routeDistance}KM</div>
            </div>
            <div className='flex justify-between'>
              <div>One Pickup & Drop</div>
              <div>{settings?.onePickupAndDrop}</div>
            </div>
          </div>
        </div>
        <hr className='my-3' />
        <div>
          <div className='text-xl my-1'>Other Charges</div>
          <div className='font-light space-y-1'>
            <div className='flex justify-between'>
              <div>Parking & Airport Entry</div>
              <div>{settings?.parkingAndAirportEntry}</div>
            </div>
            <div className='flex justify-between'>
              <div>Waiting Charges</div>
              <div>₹{settings?.waitingChargesPerMinute}</div>
            </div>
            <div className='flex justify-between'>
              <div>Night Charges <br /> (11 PM & 6 AM)</div>
              <div>₹{settings?.nightChargePerDay}</div>
            </div>
            <div className='flex justify-between'>
              <div>Extra Pickup/Drop</div>
              <div>₹{settings?.extraPickupDropCharges}</div>
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

  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate()

  const tripTypeRef = useRef<HTMLDivElement>(null);
  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const pickupDateRef = useRef<HTMLDivElement>(null);
  const pickupTimeRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [tripRates, setTripRates] = useState<any[]>([]);
  const [route, setRoute] = useState<IRoute | null>(null);

  const [tripType, setTripType] = useState<string>(state.activeTab || "One Way Trip")
  const [from, setFrom] = useState<string>(state.from || "Mumbai");
  const [fromId, setFromId] = useState<string | null>(state.fromId || null);
  const [to, setTo] = useState(state.to || "Pune");
  const [toId, setToId] = useState<string | null>(state.toId || null);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs(state.pickupDate.$d) || dayjs());
  const [pickupTime, setPickupTime] = useState<string>(state.pickupTime || '10:00 AM')

  const [tripTypeOpen, setTripTypeOpen] = useState<boolean>(false);
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [pickupDateOpen, setPickupDateOpen] = useState<boolean>(false);
  const [pickupTimeOpen, setPickupTimeOpen] = useState<boolean>(false);

  const [cities, setCities] = useState<City[]>([]);

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

  const switchValues = () => {
    setFrom((prevFrom) => {
      const tempFrom = prevFrom;
      setFrom(to);
      setTo(tempFrom);

      const tempFromId = fromId;
      setFromId(toId);
      setToId(tempFromId);

      return to;
    });
  };

  const handleTripTypeChange = (value: string) => {
    setTripType(value)
  }

  const handleFromChange = (value: string) => {
    setFrom(value)
    setFromId(cities.find((c: City) => c.name === value)?._id ?? null)
  }

  const handleToChange = (value: string) => {
    setTo(value)
    setToId(cities.find((c: City) => c.name === value)?._id ?? null)
  }

  const handlePickupDateChange = (date: Dayjs | null, dateString: string) => {
    console.log('Selected Date:', dateString);
    setPickupDate(date)
    togglePickupDate()
  }

  const handlePickupTimeChange = (value: string) => {
    setPickupTime(value)
  }

  const menuTimeOptions = generateTimeOptions()

  const getCarImage = (taxiTypeName: string) => {
    console.log(taxiTypeName)

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

  const onSearch = async () => {
    try {

      setLoading(true);

      const response = await axios.post('/search', {
        tripType: tripType,
        fromId: fromId,
        toId: toId,
        pickupDate: pickupDate,
        pickupTime: pickupTime,
      });

      // Extract the trip rates from the response
      const rates = response.data.taxi_rates || [];
      setTripRates(rates);

      const route = response.data.route || null
      setRoute(route)

      // Handle the response data as needed
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error making API request:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    onSearch()

    const fetchCities = async () => {
      try {
        const response = await axios.get('/citys', {
          params: {
            filter: JSON.stringify({ status: 'Active' })
          }
        });
        // Assuming the cities are available in an array under the 'cities' key in the response
        const fetchedCities = response.data.citys || [];

        setCities(fetchedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, [])

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
                  {cities.map((city) => (
                    <Option key={city._id} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                  {/* Add more options as needed */}
                </Select>
              </div>

              <button className='hover:shadow-xl hover:border-yellow-500 hover:border rounded-full
                w-4
                xl:w-10
              ' onClick={switchValues}>
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
                  {cities.map((city) => (
                    <Option key={city._id} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
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
                  {menuTimeOptions.map((time) => (
                    <Option key={time.key} value={time.label}>
                      {time.label}
                    </Option>
                  ))}
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
              ' onClick={onSearch}>
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
            <BillCard routeDistance={route?.one_way_trip_km || 0} />
            <div className='min-h-screen lg:w-[800px]'>
              {loading ? (
                // Display loading indicator here
                <div className="flex justify-center items-center min-h-screen">
                  <Spin size="large" />
                </div>
              ) : tripRates.length > 0 ? (
                // Map and display car cards here
                <>
                  {tripRates.map((rate: any, index: number) => (
                    <CarCard
                      key={index}
                      category={rate.taxiType?.name || ''}
                      description={rate.taxiType?.description || ''}
                      features={rate.taxiType?.car_features || []}
                      originalPrice={rate.originalPrice || ''}
                      discountedPrice={rate.discountedPrice || ''}
                      discount={(rate.taxiType.discount_percentage).toString() || ''}
                      carImage={getCarImage(rate.taxiType?.name) || ''}
                    />
                  ))}
                </>
              ) : (
                // Display a message when there are no car cards
                <div className='text-center py-32 text-lg font-medium'>Sorry, we are working to reach out to you.</div>
              )}
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
