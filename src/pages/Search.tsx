/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightOutlined, CarOutlined, ClockCircleOutlined, SafetyCertificateOutlined, ShoppingOutlined, SwapOutlined, SyncOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Footer } from '../components/Footer';
import CarCard, { Feature } from '../components/CarCard';
import { Button, Calendar, Dropdown, MenuProps, Modal, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { City } from '../types/citys.types';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios"

const Hero: React.FC = () => {

  const navigate = useNavigate()

  const [from, setFrom] = useState<string>("Mumbai");
  const [fromId, setFromId] = useState<string | null>(null);
  const [to, setTo] = useState("Pune");
  const [toId, setToId] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs());

  const [activeTab, setActiveTab] = useState('oneWay');
  const [cities, setCities] = useState<City[]>([]);
  const [isDatePickerModalVisible, setDatePickerModalVisible] = useState(false);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleMenuClickFrom = (e: any) => {
    setFrom(cities.find((c: City) => c._id === e.key)?.name ?? "Select an Option")
    setFromId(e.key)
  };
  const handleMenuClickTo = (e: any) => {
    setTo(cities.find((c: City) => c._id === e.key)?.name ?? "Select an Option")
    setToId(e.key)
  };

  const openDatePickerModal = () => {
    setDatePickerModalVisible(true);
  };

  const closeDatePickerModal = () => {
    setDatePickerModalVisible(false);
  };

  const menuCities: MenuProps['items'] = cities.map((city: City) => ({
    label: city.name,
    key: city._id,
  }));

  const menuPropsFrom = {
    items: menuCities,
    onClick: handleMenuClickFrom,
  };

  const menuPropsTo = {
    items: menuCities,
    onClick: handleMenuClickTo,
  };

  const switchValues = () => {
    setFrom((prevFrom: any) => {
      const tempFrom = prevFrom;
      setFrom(to);
      setTo(tempFrom);

      const tempFromId = fromId;
      setFromId(toId);
      setToId(tempFromId);

      return to;
    });
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('/citys', {
          params: {
            filter: JSON.stringify({ status: 'Active' })
          }
        });
        // Assuming the cities are available in an array under the 'cities' key in the response
        const fetchedCities = response.data.citys || [];
        console.log(response.data.citys);

        setCities(fetchedCities);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [])

  return (
    <>
      <div>
        <Modal
          open={isDatePickerModalVisible}
          onCancel={closeDatePickerModal}
          footer={null}
        >
          <Calendar
            fullscreen={false}
            onSelect={(date: any) => {
              setPickupDate(date);
              setDatePickerModalVisible(false);
            }}
          />
        </Modal>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col items-center justify-center'>
            <div className='rounded-xl bg-white  shadow-lg -mb-6 z-10
              px-6
              lg:px-20
            '>
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                tabBarStyle={{ marginBottom: 0 }}
                tabBarGutter={56}
                indicatorSize={(origin) => origin + 60}
              >
                <TabPane tab={<div className='py-1
                  text-sm
                  lg:text-base
                '> <ArrowRightOutlined className='hidden lg:inline-flex' /> One-Way Trip</div>} key="oneWay" />
                <TabPane tab={<div className='py-1
                text-sm
                lg:text-base
                '><SyncOutlined className='hidden lg:inline-flex' /> Round Trip</div>} key="roundTrip" />
                <TabPane tab={<div className='py-1
                text-sm
                lg:text-base
                '> <ClockCircleOutlined className='hidden lg:inline-flex' /> Hourly Rental</div>} key="hourlyRental" />
              </Tabs>
            </div>
            <div className='bg-white rounded-lg -mb-6  flex justify-center items-center py-8
              lg:px-6
            '>
              <div className='w-full border rounded
                lg:flex
              '>
                <div className='flex'>
                  <div className='w-[188px] p-3 pb-4 space-y-1'>
                    <div className='text-xs '>
                      FROM
                    </div>
                    <Dropdown menu={menuPropsFrom} placement="bottomLeft">
                      <Button className='text-3xl' style={{ border: 'none' }}>
                        {from || 'Select an option'}
                      </Button>
                    </Dropdown>
                  </div>
                  <div className='relative -mr-[14px] flex items-center '>
                    <button className='bg-white' onClick={switchValues}>
                      <SwapOutlined size={50} className='border rounded-full p-1 text-xl hover:bg-gray-200 shadow-lg' />
                    </button>
                  </div>
                  <div className='border-l' />
                  <div className='w-[188px] p-3 pb-4 space-y-1'>
                    <div className='text-xs'>
                      TO
                    </div>
                    <Dropdown menu={menuPropsTo} placement="bottomLeft">
                      <Button className='text-3xl' style={{ border: 'none' }}>
                        {to || 'Select an option'}
                      </Button>
                    </Dropdown>
                  </div>
                  <div className='
                  border-b
                  sm:border-l'
                  />
                </div>
                <div></div>
                <div className='
                  border-b
                  lg:border-l'
                />
                <div className='w-[188px] p-3 pb-4 space-y-1'>
                  <div className='text-xs'>
                    PICKUP DATE
                  </div>
                  <button className='text-3xl hover:text-blue-500' onClick={openDatePickerModal}>
                    {pickupDate?.format('D MMM') ?? <button className='border p-1 rounded-lg bg-gray-100 text-base'>select a pickup date</button>} <span className='text-base'>{pickupDate?.format('YYYY')}</span>
                  </button>
                </div>
                <div className='
                  border-b
                  lg:border-l'
                />
                <div className='w-[188px] p-3 pb-4 space-y-1'>
                  <div className='text-xs'>
                    RETURN DATE
                  </div>
                  <div className='text-sm'>
                    Add return date for bigger discount
                  </div>
                </div>
                <div className='
                  border-b'
                />
                <div className='w-[188px] p-3 pb-4 space-y-1'>
                  <div className='text-xs'>
                    PICKUP TIME
                  </div>
                  <button className='text-3xl hover:text-blue-500'>
                    10:00
                  </button>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold w-40 h-12 rounded-lg border-yellow-500 z-10" onClick={() => {
                navigate('/search')
              }}>
                LET'S RIDE
              </button>
            </div>
          </div>
          {/* extra div  */}
          <div />
        </div>
      </div>
    </>
  );
};

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
              <div className='bg-[#404040] mx-1 p-2 rounded-lg text-sm
                w-36
                xl:w-40
              '>
                <div className='text-yellow-500'>TRIP TYPE</div>
                <div className='text-white'>One Way Trip</div>
              </div>

              <div className=' bg-[#404040] mx-1 p-2 rounded-lg text-sm
                w-36
                xl:w-40
              '>
                <div className='text-yellow-500'>FROM</div>
                <div className='text-white'>Mumbai</div>
              </div>

              <button className='hover:shadow-xl
                w-4
                xl:w-10
              '>
                <SwapOutlined className='text-white' />
              </button>

              <div className='bg-[#404040] mx-1 p-2 rounded-lg text-sm
                w-36
                xl:w-40
              '>
                <div className='text-yellow-500'>TO</div>
                <div className='text-white'>Pune</div>
              </div>

              <div className='bg-[#404040] mx-1 p-2 rounded-lg text-sm
                w-32
                xl:w-36
              '>
                <div className='text-yellow-500'>PICKUP DATE</div>
                <div className='text-white'>3 May 2023</div>
              </div>

              <div className='bg-[#404040] mx-1 p-2 rounded-lg text-sm
                w-32
                xl:w-36
              '>
                <div className='text-yellow-500'>RETURN DATE</div>
                <div className='text-white'>13 May 2023</div>
              </div>

              <div className='bg-[#404040] mx-1 p-2 rounded-lg text-sm
                w-32
                xl:w-36
              '>
                <div className='text-yellow-500'>PICKUP TIME</div>
                <div className='text-white'>10:00</div>
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
              />
              <CarCard
                category='SUV'
                description='Toyota Fortuner or Similar'
                features={suvFeatures}
                originalPrice='5000'
                discountedPrice='4800'
                discount='4'
              />
              <CarCard
                category='Luxury'
                description='Mercedes-Benz S-Class or Similar'
                features={luxuryFeatures}
                originalPrice='12000'
                discountedPrice='11000'
                discount='8'
              />
              <CarCard
                category='Van'
                description='Toyota Innova or Similar'
                features={vanFeatures}
                originalPrice='6000'
                discountedPrice='5500'
                discount='9'
              />
              <CarCard
                category='Compact'
                description='Honda Jazz or Similar'
                features={compactFeatures}
                originalPrice='3000'
                discountedPrice='2800'
                discount='7'
              />
            </div>
            <div className='lg:hidden'>
              <Hero/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ >
  );
};

export default Search;
