/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined, SwapOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Spin } from 'antd';
import { Option } from 'antd/es/mentions';
import dayjs, { Dayjs } from 'dayjs';
import { Footer } from '../components/Footer';
import CarCard from '../components/CarCard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../api/axios"

import { generateTimeOptions } from '../utils/GenerateTimeOptions';

import { City } from '../types/citys.types';
import { ISettings } from '../types/settings.types';
import { IRoute } from '../types/routes.types';
import { TaxiType } from '../types/taxiTypes.types';
import { generateDistanceOptions } from '../utils/GenerateDistanceOptions';

interface BillCardProps {
  routeDistance: number;
  tripRates: any;
}

interface TripRate {
  taxiType: TaxiType;
  originalPrice: number;
  discountedPrice: number;
}

const BillCard: React.FC<BillCardProps> = ({ routeDistance, tripRates }) => {

  const [settings, setSettings] = useState<ISettings | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/settings/get');

        setSettings(response.data)

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchSettings()
  }, [])

  return (
    <>
      <div className='min-w-[360px] max-w-xs w-full m-1 p-3 sticky top-1 bg-white border rounded-lg'>
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
              <div>₹ {settings?.waitingChargesPerMinute?.toLocaleString()}</div>
            </div>
            <div className='flex justify-between'>
              <div>Night Charges <br /> (11 PM & 6 AM)</div>
              <div>₹ {settings?.nightChargePerDay?.toLocaleString()}</div>
            </div>
            <div className='flex justify-between'>
              <div>Extra Pickup/Drop</div>
              <div>₹ {settings?.extraPickupDropCharges?.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <hr className='my-3' />
        <div>
          <div className='text-xl my-1'>Extra Km Charges</div>
          <div className='font-light space-y-1'>
            {tripRates.map((tripRate: TripRate) => (
              <div key={tripRate.taxiType._id} className='flex justify-between'>
                <div>{tripRate.taxiType.name}</div>
                <div>₹ {tripRate.taxiType.extra_km_charges}/KM</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const Search: React.FC = () => {

  const location = useLocation();
  const { state } = location;

  console.log(state)

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(true);
  const [tripRates, setTripRates] = useState<any[]>([]);
  const [route, setRoute] = useState<IRoute | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const [tripType, setTripType] = useState<string>(state.activeTab || "One-Way Trip")
  const [pickupCity, setPickupCity] = useState<string>(state.pickupCity || "Select City");
  const [pickupCityId, setPickupCityId] = useState<string | null>(state.pickupCityId || null);
  const [from, setFrom] = useState<string>(state.from || "Select City");
  const [fromId, setFromId] = useState<string | null>(state.fromId || null);
  const [to, setTo] = useState(state.to || "Select City");
  const [toId, setToId] = useState<string | null>(state.toId || null);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs(state.pickupDate) || dayjs());
  const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs(state.returnDate) || dayjs());
  const [pickupTime, setPickupTime] = useState<string>(state.pickupTime || '10:00 AM')
  const [hourlyPackage, setHourlyPackage] = useState<string>(state.hourlyPackage || '1 hr 10 kms')

  const [tripTypeOpen, setTripTypeOpen] = useState<boolean>(false);
  const [pickupCityOpen, setPickupCityOpen] = useState<boolean>(false);
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [pickupDateOpen, setPickupDateOpen] = useState<boolean>(false);
  const [returnDateOpen, setReturnDateOpen] = useState<boolean>(false);
  const [pickupTimeOpen, setPickupTimeOpen] = useState<boolean>(false);
  const [hourlyPackageOpen, setHourlyPackageOpen] = useState<boolean>(false);

  const [cities, setCities] = useState<City[]>([]);

  const toggleTripType = () => {
    setTripTypeOpen(!tripTypeOpen)
  };

  const togglePickupCity = () => {
    setPickupCityOpen(!pickupCityOpen)
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

  const toggleReturnDate = () => {
    if (tripType === 'One-Way Trip') {
      setTripType('Round Trip')
    }
    setReturnDateOpen(!returnDateOpen)
  };

  const togglePickupTime = () => {
    setPickupTimeOpen(!pickupTimeOpen)
  };

  const toggleHourlyPackage = () => {
    setHourlyPackageOpen(!hourlyPackageOpen)
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

  const handlePickupCityChange = (value: string) => {
    setPickupCity(value)
    setPickupCityId(cities.find((c: City) => c.name === value)?._id ?? null)
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

  const handleReturnDateChange = (date: Dayjs | null, dateString: string) => {
    console.log('Selected Date:', dateString);
    setReturnDate(date)
    toggleReturnDate()
  }

  const handlePickupTimeChange = (value: string) => {
    setPickupTime(value)
  }

  const handleHourlyPackageChange = (value: string) => {
    setHourlyPackage(value)
  }

  const menuTimeOptions = generateTimeOptions()

  const menuDistanceOptions = generateDistanceOptions()

  const onSearch = async () => {
    try {

      setLoading(true);

      const response = await axios.post('/search', {
        tripType: tripType,
        pickupCityId: pickupCityId,
        fromId: fromId,
        toId: toId,
        pickupDate: pickupDate?.format('YYYY-MM-DD'),
        returnDate: returnDate?.format('YYYY-MM-DD'),
        pickupTime: pickupTime,
        hourlyPackage: hourlyPackage
      });

      // Extract the trip rates from the response
      const rates = response.data.taxi_rates || [];
      console.log(rates);
      setTripRates(rates);

      const route = response.data.route || null
      setRoute(route)

      const distance = response.data.distance || null
      setDistance(distance)

    } catch (error) {
      console.error('Error making API request:', error);
    } finally {
      setLoading(false);
    }
  };

  const onBook = (taxi_rate: any) => {
    navigate('/details', {
      state: {
        taxi_rate: taxi_rate,
        route: route,
        pickupDate: pickupDate?.format('YYYY-MM-DD'),
        returnDate: returnDate?.format('YYYY-MM-DD'),
        pickupTime: pickupTime,
        tripType: tripType,
        pickupCityId: pickupCityId,
        hourlyPackage: hourlyPackage
      }
    })
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
      <div className='bg-[#F5F5F5] px-1'>
        <div className='justify-center w-full
          hidden
          lg:flex
        '>
          <div className='container flex justify-center bg-[#2A2A2A] rounded-lg w-[1166px]'>
            <div className='flex items-center h-full py-2'>
              <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
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

              {tripType !== "Hourly Rental" &&
                <>
                  <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
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
                      {cities.filter((c: City) => c._id != toId).map((city) => (
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

                  <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
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
                      {cities.filter((c: City) => c._id != fromId).map((city) => (
                        <Option key={city._id} value={city.name}>
                          {city.name}
                        </Option>
                      ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </>
              }
              {
                tripType === "Hourly Rental" &&
                <>
                  <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                    w-36
                    xl:w-40
                  ' onClick={togglePickupCity}>
                    <div className='px-2'>
                      <div className='text-yellow-500'>PICKUP LOCATION</div>
                      <div className='text-white'>{pickupCity}</div>
                    </div>
                    <Select
                      open={pickupCityOpen}
                      className='absolute w-0 h-0'
                      defaultValue="One Way Trip"
                      style={{ visibility: 'hidden', width: '100%' }}
                      onChange={handlePickupCityChange}
                      onDropdownVisibleChange={(open) => setPickupCityOpen(open)}
                    >
                      {cities.map((city) => (
                        <Option key={city._id} value={city.name}>
                          {city.name}
                        </Option>
                      ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </>
              }

              <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
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
                  disabledDate={(current: Dayjs | null) =>
                    current ? current.isBefore(dayjs().startOf('day')) || current.isAfter(dayjs().add(30, 'days')) : false
                  }
                />
              </div>

              <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
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

              {tripType !== "Hourly Rental" &&
                <div className='relative bg-[#404040] mx-1 p-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-32
                xl:w-36
              ' onClick={toggleReturnDate}>
                  <div className='text-yellow-500'>RETURN DATE</div>
                  {tripType === 'Round Trip' ?
                    (
                      <>
                        <div className='text-white'>{returnDate?.format('D MMM YYYY')}</div>
                        <DatePicker
                          open={returnDateOpen}
                          onOpenChange={(open) => setReturnDateOpen(open)}
                          onChange={handleReturnDateChange}
                          className='absolute bottom-0 left-0 w-0 h-0'
                          style={{
                            visibility: 'hidden'
                          }}
                          disabledDate={(current: Dayjs | null) =>
                            current ? current.isBefore(dayjs().startOf('day')) || current.isAfter(dayjs().add(30, 'days')) : false
                          }
                        />
                      </>
                    ) :
                    (
                      <>
                        <div className='text-white text-center'>--- --- ---</div>
                      </>
                    )
                  }
                </div>
              }
              {tripType === "Hourly Rental" &&
                <>
                  <div className='relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-32
                xl:w-36
              ' onClick={toggleHourlyPackage}>
                    <div className='px-2'>
                      <div className='text-yellow-500'>SELECT PACKAGE</div>
                      <div className='text-white'>{hourlyPackage}</div>
                    </div>
                    <Select
                      open={hourlyPackageOpen}
                      className='absolute w-0 h-0'
                      defaultValue="One Way Trip"
                      style={{ visibility: 'hidden', width: '100%' }}
                      onChange={handleHourlyPackageChange}
                      onDropdownVisibleChange={(open) => setHourlyPackageOpen(open)}
                    >
                      {menuDistanceOptions.map((distance) => (
                        <Option key={distance.key} value={distance.label}>
                          {distance.label}
                        </Option>
                      ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </>
              }

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
        </div >
        <div className='flex justify-center'>
          <div className='flex container justify-center
            flex-col-reverse items-center
            lg:flex-row lg:items-start
          '>
            <BillCard
              routeDistance={distance || 0}
              tripRates={tripRates}
            />
            <div className='w-full lg:w-[800px]'>
              {loading ? (
                // Display loading indicator here
                <div className="flex justify-center items-center">
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
                      carImage={rate.taxiType.image || ''}
                      onBook={() => onBook(rate)}
                    />
                  ))}
                </>
              ) : (
                // Display a message when there are no car cards
                <div className='text-center py-32 text-lg font-medium'>Sorry, we are working to reach out to you.</div>
              )}
            </div>
            <div className='lg:hidden w-full'>
              <div className='border w-full flex rounded-lg  gap-2 bg-white shadow-lg flex-row p-1' onClick={() => {
                navigate('/')
              }}>
                <div className='w-full'>
                  <div className='flex justify-center items-center h-12'>
                    <div className='ml-8 text-xl'>
                      <LeftOutlined />
                    </div>
                    {tripType != "Hourly Rental" ?
                      (
                        <div className='-ml-8 text-center text-xl font-medium w-full'>
                          {from} to {to}
                        </div>
                      )
                      :
                      (
                        <div className='-ml-8 text-center text-xl font-medium w-full'>
                          {pickupCity} - {hourlyPackage}
                        </div>
                      )
                    }
                  </div>
                  <hr className='border' />
                  <div className='p-2'>
                    <div className='text-sm text-zinc-500'>
                      SCHEDULED PICK UP
                    </div>
                    <div className='space-x-1'>
                      <span className='font-semibold'>
                        {pickupDate?.format("DD MMM")},
                      </span>
                      <span className='text-sm'>
                        {pickupTime}
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
      </div >
      <div className='flex justify-center py-8'>
        <div className='container text-center space-x-1'>
          <span className='text-zinc-800 font-semibold'>
            Disclaimer:
          </span>
          <span className='text-zinc-600'>
            Fare listed above are estimated based on gathered information. Final fare shall depend on
            actual traveled distance. Mileage & Timings will be calculated from our garage to garage whereas vehicles
            will be dispatched from the nearest garage.
          </span>
        </div>
      </div>
      <Footer />
    </ >
  );
};

export default Search;
