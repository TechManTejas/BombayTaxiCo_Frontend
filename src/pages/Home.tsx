/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftOutlined, ArrowRightOutlined, CarOutlined, ClockCircleOutlined, DollarCircleOutlined, SwapOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
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

import HeroImage from "../assets/images/hero.jpg"
import HappyCustomer from "../assets/images/happy_customers.jpg"
import TajMahal from "../assets/images/taj_mahal.jpg"
import Quote from "../assets/images/quote.png"
import Face1 from "../assets/images/face1.jpg"
import Face2 from "../assets/images/face2.jpg"
import Face3 from "../assets/images/face3.jpg"

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }

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
        <div className='bg-[#2a2a2a81] h-[720px] flex flex-col justify-center items-center space-y-20' style={{ backgroundImage: `url(${HeroImage})`, backgroundSize: 'cover' }}>
          <div className='text-4xl font-medium text-white text-center
            mt-24
            lg:mt-0
          '>
            Enjoy Your Comfortable Ride in Affordable Price
          </div>
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
      <div className='space-y-12 py-20'>
        <div className='text-center text-3xl font-medium'>
          Why Choose Us?
        </div>
        <div className='grid grid-cols-1 items-center justify-items-center
          sm:grid-cols-2
          xl:grid-cols-4
        '>
          <WhyChooseUsCard icon={<UserOutlined />} title="Professional Drivers" description="Experienced Staff & Professionally trained Chauffers" />
          <WhyChooseUsCard icon={<CarOutlined />} title="Quality Car" description="Luxurious and well-maintained vehicles for your comfort." />
          <WhyChooseUsCard icon={<DollarCircleOutlined />} title="Affordable Pricing" description="Competitive and budget-friendly prices for quality transportation." />
          <WhyChooseUsCard icon={<CarOutlined />} title="Largest Fleet" description="Choose from our extensive fleet for your transportation needs." />
        </div>
      </div>
    </>
  )
}

const PopularPackages: React.FC = () => {

  const packageData = [
    {
      imageUrl: TajMahal,
      title: 'Cabs From Agra To',
      destinations: [
        { name: 'New Delhi', distance: '552km (6hr 53min)' },
        { name: 'Gurgoan', distance: '552km (6hr 53min)' },
        { name: 'Noida', distance: '552km (6hr 53min)' },
        { name: 'Faridabad', distance: '552km (6hr 53min)' },
        { name: 'Ghaziabad', distance: '552km (6hr 53min)' },
      ],
    },
    {
      imageUrl: TajMahal,
      title: 'Cabs From Delhi To',
      destinations: [
        { name: 'Agra', distance: '200km (3hr 30min)' },
        { name: 'Shimla', distance: '350km (7hr)' },
        { name: 'Manali', distance: '500km (10hr)' },
        { name: 'Amritsar', distance: '450km (6hr 30min)' },
        { name: 'Dehradun', distance: '250km (5hr)' },
      ],
    },
    {
      imageUrl: TajMahal,
      title: 'Cabs From Mumbai To',
      destinations: [
        { name: 'Goa', distance: '600km (10hr)' },
        { name: 'Pune', distance: '150km (3hr)' },
        { name: 'Nashik', distance: '180km (4hr)' },
        { name: 'Shirdi', distance: '250km (5hr)' },
        { name: 'Lonavala', distance: '80km (2hr)' },
      ],
    },
    {
      imageUrl: TajMahal,
      title: 'Cabs From Bangalore To',
      destinations: [
        { name: 'Mysuru', distance: '150km (3hr)' },
        { name: 'Chennai', distance: '350km (6hr)' },
        { name: 'Ooty', distance: '300km (6hr 30min)' },
        { name: 'Coorg', distance: '250km (5hr)' },
        { name: 'Hampi', distance: '340km (7hr)' },
      ],
    },
    {
      imageUrl: TajMahal,
      title: 'Cabs From Kolkata To',
      destinations: [
        { name: 'Digha', distance: '180km (4hr)' },
        { name: 'Darjeeling', distance: '600km (12hr)' },
        { name: 'Sundarbans', distance: '100km (2hr 30min)' },
        { name: 'Puri', distance: '500km (10hr)' },
        { name: 'Bodh Gaya', distance: '550km (11hr)' },
      ],
    },
    {
      imageUrl: TajMahal,
      title: 'Cabs From Chennai To',
      destinations: [
        { name: 'Pondicherry', distance: '160km (3hr)' },
        { name: 'Mahabalipuram', distance: '60km (1hr 30min)' },
        { name: 'Kanchipuram', distance: '70km (2hr)' },
        { name: 'Tirupati', distance: '130km (3hr)' },
        { name: 'Vellore', distance: '140km (3hr 30min)' },
      ],
    },
  ];

  return (
    <>
      <div className='space-y-12 py-20'>
        <div className='text-center text-3xl font-medium'>
          Popular Packages
        </div>
        <div className='grid grid-cols-1 items-center justify-items-center
          lg:grid-cols-2
          xl:grid-cols-3
        '>
          {packageData.map((packageInfo, index) => (
            <PackageCard key={index} {...packageInfo} />
          ))}
        </div>
      </div>
    </>
  )
}

const StatsAndTestamonials: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
      {/* Overlay  */}
      <div className='h-72 flex flex-col justify-center items-center w-full' style={{ backgroundImage: `url(${HappyCustomer})`, backgroundSize: 'cover' }}>
        <div className='flex flex-col justify-center items-center bg-black w-full h-full -mb-16 bg-opacity-70 text-center p-3'>
          <div className='text-3xl font-medium text-white'>We Are Experienced Since 1992 Until Now</div>
          <div className='text-white text-center text-sm
            md:w-[600px]
          '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat libero condimentum metus.</div>
        </div>
        <div className='h-16' />
      </div>
      {/* Middle component  */}
      <div className='bg-white border border-black rounded-lg items-center justify-around -mt-16 z-10
        w-[220px] 
        sm:w-[600px] sm:flex
        lg:w-[800px]
      '>
        <div className='text-center space-y-1 m-3'>
          <div className='text-4xl font-medium'>
            124 <span className='text-yellow-500'>+</span>
          </div>
          <div>
            Years of Experience
          </div>
        </div>
        <div className='text-center space-y-1 m-3'>
          <div className='text-4xl font-medium'>
            2,820 <span className='text-yellow-500'>+</span>
          </div>
          <div>
            Happy Customer
          </div>
        </div>
        <div className='text-center space-y-1 m-3'>
          <div className='text-4xl font-medium'>
            2,820 <span className='text-yellow-500'>+</span>
          </div>
          <div>
            Km Driver
          </div>
        </div>
      </div>
      {/* What Our Customer Say */}
      <div className='py-16  w-full
          md:px-8
          xl:px-32
      '>

        <div className='text-center text-3xl font-medium'>
          What Our Customers Say
        </div>

        <div className='flex justify-center items-center p-8'>
          <div className='flex-col justify-center items-center m-16
            hidden md:flex
          '>
            <div className='h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center'>
              <img src={Face2} className='h-[76px] w-[76px] bg-yellow-500 rounded-full object-cover' />
            </div>
            {/* <div className='w-12 border-gray-500 border-[3px] rounded-full'></div> */}
          </div>
          <div className='m-6 shadow-xl
            hidden
            md:block
          '>
            <Button size='large' icon={<ArrowLeftOutlined />} className='bg-white border-white' />
          </div>
          <div className='p-4 flex flex-col justify-center items-center
            w-full
            xl:w-2/5
          '>
            <div className='h-40 w-40 bg-yellow-500 rounded-full flex justify-center items-center'>
              <img src={Face3} className='h-[152px] w-[152px] bg-yellow-500 rounded-full object-cover' />
            </div>
            {/* <div className='w-24 border-black border-[3px] rounded-full'></div> */}
            <div className='font-medium text-2xl py-4'>Manik Patil</div>
            <div>
              <img src={Quote} className='absolute opacity-10 h-12 -mt-10' />
              <div className='text text-center text-gray-800'>
                Great experience with this company. I have used many others in
                Oakland but this was by far the best. You guys made our trip so easy.
                Great customer service, wonderful drivers and by far the best and most
                affordable transportation company I have used. Thank you soo much!
              </div>
              <div className='flex w-full justify-end'>
                <img src={Quote} className='absolute opacity-10 h-12 -mt-5 transform -scale-x-100 ' />
              </div>
              <div className='flex w-full justify-center space-x-6 my-3
                md:hidden
              '>
                <div className='shadow-xl'>
                  <Button size='large' icon={<ArrowLeftOutlined />} className='bg-white border-white' />
                </div>
                <div className='shadow-xl'>
                  <Button size='large' icon={<ArrowRightOutlined />} className='bg-white border-white' />
                </div>
              </div>
            </div>
          </div>
          <div className='m-6 shadow-xl
            hidden
            md:block
          '>
            <Button size='large' icon={<ArrowRightOutlined />} className='bg-white border-white' />
          </div>
          <div className='flex-col justify-center items-center m-16
            hidden md:flex
          '>
            <div className='h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center'>
              <img src={Face1} className='h-[76px] w-[76px] bg-yellow-500 rounded-full object-cover' />
            </div>
            {/* <div className='w-12 border-gray-500 border-[3px] rounded-full'></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <div className='
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
      '>
        <WhyChooseUs />
        <PopularPackages />
      </div>
      <StatsAndTestamonials />
      <CallUsNow />
      <Footer />
    </>
  )
}

export default Home;
