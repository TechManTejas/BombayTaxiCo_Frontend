/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRightOutlined, ClockCircleOutlined, SwapOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Calendar, Dropdown, MenuProps, Modal, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useEffect, useState } from 'react';
import axios from "../api/axios"
import { City } from '../types/citys.types';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { Footer } from '../components/Footer';
import { CallUsNow } from '../components/CallUsNow';
import { WhyChooseUsCard } from '../components/WhyChooseUsCard';
import { PackageCard } from '../components/PackageCard';

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
        <div className='bg-[#2a2a2a81] h-[720px] flex flex-col justify-center items-center space-y-20'>
          <div className='text-4xl font-medium text-white '>
            Enjoy Your Comfortable Ride in Affordable Price
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='rounded-xl bg-white px-20 shadow-lg -mb-6 z-10'>
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                tabBarStyle={{ marginBottom: 0 }}
                tabBarGutter={56}
                indicatorSize={(origin) => origin + 60}
              >
                <TabPane tab={<div className='py-1'> <ArrowRightOutlined /> One-Way Trip</div>} key="oneWay" />
                <TabPane tab={<div className='py-1'><SyncOutlined /> Round Trip</div>} key="roundTrip" />
                <TabPane tab={<div className='py-1'> <ClockCircleOutlined /> Hourly Rental</div>} key="hourlyRental" />
              </Tabs>
            </div>
            <div className='bg-white w-[1000px] h-[192px] rounded-lg -mb-6 px-6 flex justify-center items-center'>
              <div className='w-full border rounded flex'>
                <div className='w-1/5 p-3 pb-4 space-y-1'>
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
                <div className='w-1/5 p-3 pb-4 space-y-1'>
                  <div className='text-xs'>
                    TO
                  </div>
                  <Dropdown menu={menuPropsTo} placement="bottomLeft">
                    <Button className='text-3xl' style={{ border: 'none' }}>
                      {to || 'Select an option'}
                    </Button>
                  </Dropdown>
                </div>
                <div className='border-l' />
                <div className='w-1/5 p-3 pb-4 space-y-1'>
                  <div className='text-xs'>
                    PICKUP DATE
                  </div>
                  <button className='text-3xl hover:text-blue-500' onClick={openDatePickerModal}>
                    {pickupDate?.format('D MMM') ?? <button className='border p-1 rounded-lg bg-gray-100 text-base'>select a pickup date</button>} <span className='text-base'>{pickupDate?.format('YYYY')}</span>
                  </button>
                </div>
                <div className='border-l' />
                <div className='w-1/5 p-3 pb-4 space-y-1'>
                  <div className='text-xs'>
                    RETURN DATE
                  </div>
                  <div className='text-sm'>
                    Add return date for bigger discount
                  </div>
                </div>
                <div className='border-l' />
                <div className='w-1/5 p-3 pb-4 space-y-1'>
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
              <button className="bg-yellow-500 transition hover:bg-yellow-600 text-black font-semibold w-40 h-12 rounded-lg border-yellow-500 z-10" onClick={() => {
                navigate('/results')
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

const WhyChooseUs: React.FC = () => {
  return (
    <>
      <div className='space-y-12 my-20'>
        <div className='text-center text-3xl font-medium'>
          Why Choose Us?
        </div>
        <div className='flex justify-center items-center flex-wrap'>
          <WhyChooseUsCard />
          <WhyChooseUsCard />
          <WhyChooseUsCard />
          <WhyChooseUsCard />
        </div>
      </div>
    </>
  )
}

const PopularPackages: React.FC = () => {
  return (
    <>
      <div className='space-y-12 my-20'>
        <div className='text-center text-3xl font-medium'>
          Popular Packages
        </div>
        <div className='flex justify-center items-center flex-wrap'>
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
        </div>
      </div>
    </>
  )
}

const StatsAndTestamonials: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='bg-[#2a2a2a81] h-72 flex flex-col justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center'>
          <div className='text-3xl font-medium text-white'>We Are Experienced Since 1992 Until Now</div>
          <div className='text-white text-center text-sm w-[600px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat libero condimentum metus.</div>
        </div>
        {/* Extra div  */}
        <div className='h-16'/>
      </div>
      <div className='bg-white h-32 w-[800px] border border-black rounded-lg flex items-center justify-around -mt-16'>
        <div className='text-center space-y-1'>
          <div className='text-4xl font-medium'>
            124 <span className='text-yellow-500'>+</span>
          </div>
          <div>
            Years of Experience
          </div>
        </div>
        <div className='text-center space-y-1'>
          <div className='text-4xl font-medium'>
            2,820 <span className='text-yellow-500'>+</span>
          </div>
          <div>
            Happy Customer
          </div>
        </div>
        <div className='text-center space-y-1'>
          <div className='text-4xl font-medium'>
            2,820 <span className='text-yellow-500'>+</span>
          </div>
          <div>
            Km Driver
          </div>
        </div>
      </div>
      <div className='h-[600px] my-16 w-full'>
        <div className='text-center text-3xl font-medium'>
          What Our Customers Say
        </div>
      </div>
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <PopularPackages />
      <StatsAndTestamonials />
      <CallUsNow />
      <Footer />
    </>
  )
}

export default Home;
