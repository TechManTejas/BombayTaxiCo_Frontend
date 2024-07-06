/* eslint-disable @typescript-eslint/no-explicit-any */
import { AndroidFilled, AppleFilled, ArrowRightOutlined, BankOutlined, CarOutlined, ClockCircleOutlined, CloseCircleOutlined, CreditCardOutlined, CustomerServiceOutlined, DollarCircleOutlined, DollarOutlined, EnvironmentOutlined, LeftOutlined, LikeOutlined, MobileOutlined, MoneyCollectOutlined, RightOutlined, SafetyOutlined, SmileOutlined, SolutionOutlined, StarOutlined, SwapOutlined, SyncOutlined, TagOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, MenuProps, Segmented, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from '@mui/material';
import axios from "../api/axios"
import { City } from '../types/citys.types';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { Footer } from '../components/Footer';
import { CallUsNow } from '../components/CallUsNow';
import { WhyChooseUsCard } from '../components/WhyChooseUsCard';
import HeroImage1 from "../assets/images/hero1.jpg";
import HeroImage2 from "../assets/images/hero2.jpg";
import HeroImage3 from "../assets/images/hero3.jpg";
import WeOffer1 from "../assets/images/weoffer1.jpg";
import WeOffer2 from "../assets/images/weoffer2.jpg";
import WeOffer3 from "../assets/images/weoffer3.jpg";
import WeOffer4 from "../assets/images/weoffer4.jpg";
import WeOffer5 from "../assets/images/weoffer5.jpg";
import WeOffer6 from "../assets/images/weoffer6.jpg";
import Experience from "../assets/images/experience.jpg"
import { generateTimeOptions } from '../utils/GenerateTimeOptions';
import { generateDistanceOptions } from '../utils/GenerateDistanceOptions';
import { ServiceCard } from '../components/ServiceCard';
import { useIntersectionObserver } from '../components/UseIntersectionObserver.jsx';
import { TestimonialCard } from '../components/TestimonialCard.js';
import { RoundTripIcon } from '../icons/RoundTripIcon.js';
import { OneWayTripIcon } from '../icons/OneWayTripIcon.js';
import { HourlyRentalIcon } from '../icons/HourlyRentalIcon.js';
import '../css/Fade.css'
import '../css/NoScrollbar.css'

const Hero: React.FC = () => {

  const navigate = useNavigate()

  const [pickupCity, setPickupCity] = useState<string>("");
  const [pickupCityId, setPickupCityId] = useState<string | null>(null);
  const [from, setFrom] = useState<string>("");
  const [fromId, setFromId] = useState<string | null>(null);
  const [to, setTo] = useState("");
  const [toId, setToId] = useState<string | null>(null);
  const [pickupDateOpen, setPickupDateOpen] = useState<boolean>(false)
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs());
  const [returnDateOpen, setReturnDateOpen] = useState<boolean>(false)
  const [returnDate, setReturnDate] = useState<Dayjs | null>(dayjs().add(1, 'day'));

  const [pickupTime, setPickupTime] = useState<string>(generateTimeOptions()[0]?.label ?? "");
  const [hourlyPackage, setHourlyPackage] = useState<string>('8 hr 80 kms')

  const [activeTab, setActiveTab] = useState('One-Way Trip');
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    console.log(generateTimeOptions())
  }, [])

  const togglePickupDatePicker = () => {
    setPickupDateOpen(!pickupDateOpen)
  };

  const toggleReturnDatePicker = () => {
    setReturnDateOpen(!returnDateOpen)
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleMenuClickPickupCity = (e: any) => {
    setPickupCity(cities.find((c: City) => c._id === e.key)?.name ?? "Select an Option")
    setPickupCityId(e.key)
  };

  const handleMenuClickFrom = (e: any) => {
    setFrom(cities.find((c: City) => c._id === e.key)?.name ?? "Select an Option")
    setFromId(e.key)
  };

  const handleMenuClickTo = (e: any) => {
    setTo(cities.find((c: City) => c._id === e.key)?.name ?? "Select an Option")
    setToId(e.key)
  };

  const handleMenuClickTime = (e: any) => {
    setPickupTime(e.key)
  };

  const handleMenuClickPackage = (e: any) => {
    setHourlyPackage(e.key)
  };

  const handlePickupDateChange = (date: Dayjs | null, dateString: string) => {
    console.log('Selected Date:', dateString);
    if (date) {
      setPickupDate(date);
      if (!returnDate || returnDate.isBefore(date, 'day') || returnDate.isSame(date, 'day')) {
        setReturnDate(date.add(1, 'day'));
      }
      // togglePickupDatePicker()
    }
  };

  const handleReturnDateChange = (date: Dayjs | null, dateString: string) => {
    console.log('Selected Return Date:', dateString);
    if (date) {
      if (pickupDate && date.isBefore(pickupDate, 'day')) {
        setReturnDate(pickupDate.add(1, 'day'));
        message.warning("Return date cannot be before the pickup date.");
      } else {
        setReturnDate(date);
      }
      // toggleReturnDatePicker();
    }
  };

  const menuCities: MenuProps['items'] = cities.map((city: City) => ({
    label: city.name,
    key: city._id,
  }));

  const menuTime: MenuProps['items'] = generateTimeOptions()

  const menuDistance: MenuProps['items'] = generateDistanceOptions()

  const menuPropsPickupCity = {
    items: menuCities,
    onClick: handleMenuClickPickupCity,
  };

  const menuPropsFrom = {
    items: cities
      .filter((city: City) => city._id !== toId)
      .map((city: City) => ({
        label: (
          <span>
            {<EnvironmentOutlined />}
            {' '}
            {city.name}
          </span>
        ),
        key: city._id,
      })),
    onClick: handleMenuClickFrom,
  };

  const menuPropsTo = {
    items: cities
      .filter((city: City) => city._id !== fromId)
      .map((city: City) => ({
        label: (
          <span>
            {<EnvironmentOutlined />}
            {' '}
            {city.name}
          </span>
        ),
        key: city._id,
      })),
    onClick: handleMenuClickTo,
  };

  const menuPropsTime = {
    items: menuTime,
    onClick: handleMenuClickTime,
    style: { height: '300px', overflow: 'auto' }
  };

  const menuPropsDistance = {
    items: menuDistance,
    onClick: handleMenuClickPackage,
    style: { overflow: 'auto' }
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

  const handleLetsRideClick = () => {

    if (activeTab !== "Hourly Rental") {
      if (!from || !to) {
        // Prompt the user to select FROM and TO cities
        message.warning("Please select both FROM and TO cities before proceeding.");
        return;
      }
    }

    if (activeTab === "Hourly Rental") {
      if (!pickupCity) {
        // Prompt the user to select FROM and TO cities
        message.warning("Please select city before proceeding.");
        return;
      }
    }

    const state = {
      pickupCity,
      pickupCityId,
      hourlyPackage,
      from,
      fromId,
      to,
      toId,
      pickupDate: pickupDate?.format('YYYY-MM-DD'),
      pickupTime,
      returnDate: returnDate?.format('YYYY-MM-DD'),
      activeTab
    };

    // Navigate to the search page or perform other actions
    navigate('/search', { state: state });
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

        // Set initial values for from and to based on the first two cities
        // if (fetchedCities.length > 0) {
        //   setFrom(fetchedCities[0].name);
        //   setFromId(fetchedCities[0]._id);

        //   setTo(fetchedCities[1].name);
        //   setToId(fetchedCities[1]._id);

        //   setPickupCity(fetchedCities[1].name);
        //   setPickupCityId(fetchedCities[1]._id);
        // }

      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, [])

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = [
    {
      text: "Welcome to Bombay Taxi Co. ",
      text2: "Book Taxi For Your Ride",
      background: HeroImage1
    },
    {
      text: "24/7 Online taxi For Your Ride Enjoying a",
      text2: "Comfortable Trip With Bombay Taxi Co.",
      background: HeroImage2
    },
    {
      text: "Lets Ride With Us",
      text2: "Enjoy Your Luxury Taxi With Low Price",
      background: HeroImage3
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((currentTestimonialIndex) =>
        (currentTestimonialIndex + 1) % texts.length
      );
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentText = texts[currentTextIndex];

  return (
    <>
      <motion.div
            key={currentTextIndex}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            // transition={{ duration: 1 }}
            className='h-[720px]'
            style={{ backgroundImage: `url(${texts[0].background})`, backgroundSize: 'cover' }} >
        <div className='bg-[#00000095] h-full w-full flex flex-col justify-center items-center space-y-20'>
          {/* <!-- Rotating Text Container --> */}
          <div className=' lg:w-[1036px] 
            mt-24
            lg:mt-0
          '>
            <div className='h-16 lg:h-max text-center space-y-4'>
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className='text-xl lg:text-3xl font-thin text-white fade-in'
              >
                {currentText.text}
              </motion.div>
              <motion.div
                key={currentTextIndex}
                initial={{ opacity: 0, y: -50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.8 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className='text-2xl lg:text-5xl font-bold text-white fade-in'
              >
                {currentText.text2}
              </motion.div>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-[370px]'>
            <div className='rounded-full bg-white  shadow-lg -mb-6 z-10 border border-yellow-500'>
              <Segmented
                value={activeTab}
                className='rounded-full'
                onChange={(value) => {
                  handleTabChange(value.toString())
                }}
                options={[
                  {
                    label: (
                      <div className='lg:text-lg m-2'>
                        <div className='hidden lg:flex items-center'>
                          <OneWayTripIcon/>

                        <span className='mx-0.5 md:mx-2'>
                          One-Way Trip
                        </span>
                          </div>
                      </div>
                    ),
                    value: 'One-Way Trip'
                  },
                  {
                    label: (
                      <div className='lg:text-lg m-2'>
                        <div className='hidden lg:flex items-center'>
                          <RoundTripIcon/>
                          <span className='mx-0.5 md:mx-2'>
                            Round Trip 
                          </span>
                        </div>
                      </div>
                    ),
                    value: 'Round Trip',
                  },
                  {
                    label: (
                      <div className='lg:text-lg m-2'>
                        <div className='hidden lg:flex items-center'>
                          <HourlyRentalIcon/>
                        <span className='mx-0.5 md:mx-2'>
                          Hourly Rental
                        </span>
                          </div>
                      </div>
                    ),
                    value: 'Hourly Rental',
                  },
                ]}
              />
            </div>
            <div className='bg-white rounded-3xl -mb-6 flex justify-center items-center py-8 
              lg:px-6
            '>
              <div className='w-full rounded gap-2
                lg:flex
              '>
                {activeTab === "Hourly Rental" &&
                  <div className='w-full lg:w-[334px] p-3 pb-4 space-y-1 border rounded-xl'>
                    <div className='text-xs'>
                      PICKUP LOCATION
                    </div>
                    <Dropdown menu={menuPropsPickupCity} placement="bottomLeft">
                      <button className='text-3xl hover:text-yellow-500' style={{ border: 'none' }}>
                        {pickupCity || 'Select City'}
                      </button>
                    </Dropdown>
                  </div>
                }
                {activeTab !== 'Hourly Rental' &&
                  <div className='flex'>
                    <div className='w-[170px] md:w-[220px]  p-3 pb-4 space-y-1 border rounded-xl'>
                      <div className='text-xs '>
                        FROM
                      </div>
                      <Dropdown menu={menuPropsFrom} placement="bottomLeft">
                        <button className='text-3xl hover:text-yellow-500' style={{ border: 'none' }}>
                          {from || 'Select City'}
                        </button>
                      </Dropdown>
                    </div>
                    <div className='relative flex items-center'>
                      <button className='bg-white' onClick={switchValues}>
                        <SwapOutlined size={50} className='border rounded-full p-1 text-xl hover:bg-gray-200 shadow-lg' />
                      </button>
                    </div>
                    <div className='w-[170px] md:w-[220px] p-3 pb-4 space-y-1 border rounded-xl'>
                      <div className='text-xs'>
                        TO
                      </div>
                      <Dropdown menu={menuPropsTo} placement="bottomLeft">
                        <button className='text-3xl hover:text-yellow-500' style={{ border: 'none' }}>
                          {to || 'Select City'}
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                }
                <div className='relative w-full lg:w-[164px] p-3 pb-4 space-y-1 border rounded-xl'>
                  <div className='text-xs'>
                    PICKUP DATE
                  </div>
                  <button className='text-3xl hover:text-yellow-500' onClick={togglePickupDatePicker}>
                    {pickupDate?.format('D MMM') ?? <button className='border p-1 rounded-lg bg-gray-100 text-base'>select a pickup date</button>} <span className='text-base'>{pickupDate?.format('YYYY')}</span>
                  </button>
                  <DatePicker
                    className='absolute bottom-0 left-0 w-0 h-0'
                    style={{
                      visibility: 'hidden'
                    }}
                    open={pickupDateOpen}
                    onOpenChange={(open) => setPickupDateOpen(open)}
                    onChange={handlePickupDateChange}
                    disabledDate={(current: Dayjs | null) =>
                      current ? current.isBefore(dayjs().startOf('day')) || current.isAfter(dayjs().add(30, 'days')) : false
                    }
                  />
                </div>
                <div className='w-full lg:w-[164px] p-3 pb-4 space-y-1 border rounded-xl'>
                  <div className='text-xs'>
                    PICKUP TIME
                  </div>
                  <Dropdown menu={menuPropsTime} placement="bottomLeft">
                    <button className='text-3xl hover:text-yellow-500' style={{ border: 'none' }}>
                      {pickupTime || 'Select a Time'}
                    </button>
                  </Dropdown>
                </div>
                {activeTab !== 'Hourly Rental' &&
                  <div className='relative w-full lg:w-[164px] p-3 pb-4 space-y-1 border rounded-xl'>
                    <div className='text-xs'>
                      RETURN DATE
                    </div>
                    <div>
                      {
                        activeTab === 'Round Trip' ? (
                          <>
                            <button className='text-3xl hover:text-yellow-500' onClick={toggleReturnDatePicker}>
                              {returnDate?.format('D MMM') ?? (
                                <button className='border p-1 rounded-lg bg-gray-100 text-base'>
                                  select a pickup date
                                </button>
                              )}{' '}
                              <span className='text-base'>{returnDate?.format('YYYY')}</span>
                            </button>
                            <DatePicker
                              className='absolute bottom-0 left-0 w-0 h-0'
                              style={{
                                visibility: 'hidden',
                              }}
                              open={returnDateOpen}
                              onOpenChange={(open) => setReturnDateOpen(open)}
                              onChange={handleReturnDateChange}
                              disabledDate={(current: Dayjs | null) =>
                                current ? current.isBefore(pickupDate, 'day') || current.isAfter(dayjs().add(30, 'days')) : false
                              }
                            />
                          </>
                        ) : (
                          <>
                            <button className='text-xs text-left hover:text-yellow-500' onClick={() => setActiveTab("Round Trip")}>
                              Add return date for bigger discount
                            </button>
                          </>
                        )
                      }
                    </div>
                  </div>
                }
                {activeTab === 'Hourly Rental' &&
                  <div>
                    <div className='w-[393px] lg:w-[300px] p-3 pb-4 space-y-1 border rounded-xl'>
                      <div className='text-xs'>
                        SELECT PACKAGE
                      </div>
                      <Dropdown menu={menuPropsDistance} placement="bottomLeft">
                        <button className='text-3xl hover:text-yellow-500' style={{ border: 'none' }}>
                          {hourlyPackage || 'Select a Time'}
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className='w-full flex justify-center'>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold w-full lg:w-36 h-12 rounded-lg border-yellow-500 z-10" onClick={handleLetsRideClick}>
                SEE PRICES
              </button>
            </div>
          </div>
          {/* extra div  */}
          <div />
        </div>
      </motion.div>
    </>
  );
};

const WhyChooseUs: React.FC = () => {

  const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  
  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className='flex w-full justify-center bg-[#f5f5f5]'>
      <div className='space-y-12 py-20 w-full container'>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='text-center text-3xl font-medium'>
          Why Choose Us?
        </motion.div>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideIn}
            viewport={{ once: true, amount: 0.5 }} className='flex flex-wrap gap-4 items-center justify-center
        '>
          <WhyChooseUsCard icon={<UserOutlined />} title="Professional Drivers" description="Experienced Staff & Professionally trained Chauffers" />
          <WhyChooseUsCard icon={<CarOutlined />} title="Quality Car" description="Luxurious and well-maintained vehicles for your comfort." />
          <WhyChooseUsCard icon={<DollarCircleOutlined />} title="Affordable Pricing" description="Competitive and budget-friendly prices for quality transportation." />
          <WhyChooseUsCard icon={<CarOutlined />} title="Largest Fleet" description="Choose from our extensive fleet for your transportation needs." />
        </motion.div>
      </div>
    </div>
  )
}

// const PopularPackages: React.FC = () => {

//   const packageData = [
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Agra To',
//       destinations: [
//         { name: 'New Delhi', distance: '552km (6hr 53min)' },
//         { name: 'Gurgoan', distance: '552km (6hr 53min)' },
//         { name: 'Noida', distance: '552km (6hr 53min)' },
//         { name: 'Faridabad', distance: '552km (6hr 53min)' },
//         { name: 'Ghaziabad', distance: '552km (6hr 53min)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Delhi To',
//       destinations: [
//         { name: 'Agra', distance: '200km (3hr 30min)' },
//         { name: 'Shimla', distance: '350km (7hr)' },
//         { name: 'Manali', distance: '500km (10hr)' },
//         { name: 'Amritsar', distance: '450km (6hr 30min)' },
//         { name: 'Dehradun', distance: '250km (5hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Mumbai To',
//       destinations: [
//         { name: 'Goa', distance: '600km (10hr)' },
//         { name: 'Pune', distance: '150km (3hr)' },
//         { name: 'Nashik', distance: '180km (4hr)' },
//         { name: 'Shirdi', distance: '250km (5hr)' },
//         { name: 'Lonavala', distance: '80km (2hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Bangalore To',
//       destinations: [
//         { name: 'Mysuru', distance: '150km (3hr)' },
//         { name: 'Chennai', distance: '350km (6hr)' },
//         { name: 'Ooty', distance: '300km (6hr 30min)' },
//         { name: 'Coorg', distance: '250km (5hr)' },
//         { name: 'Hampi', distance: '340km (7hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Kolkata To',
//       destinations: [
//         { name: 'Digha', distance: '180km (4hr)' },
//         { name: 'Darjeeling', distance: '600km (12hr)' },
//         { name: 'Sundarbans', distance: '100km (2hr 30min)' },
//         { name: 'Puri', distance: '500km (10hr)' },
//         { name: 'Bodh Gaya', distance: '550km (11hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Chennai To',
//       destinations: [
//         { name: 'Pondicherry', distance: '160km (3hr)' },
//         { name: 'Mahabalipuram', distance: '60km (1hr 30min)' },
//         { name: 'Kanchipuram', distance: '70km (2hr)' },
//         { name: 'Tirupati', distance: '130km (3hr)' },
//         { name: 'Vellore', distance: '140km (3hr 30min)' },
//       ],
//     },
//   ];

//   return (
//     <>
//       <div className='space-y-12 py-20'>
//         <div className='text-center text-3xl font-medium'>
//           Popular Packages
//         </div>
//         <div className='grid grid-cols-1 items-center justify-items-center
//           lg:grid-cols-2
//           xl:grid-cols-3
//         '>
//           {packageData.map((packageInfo, index) => (
//             <PackageCard key={index} {...packageInfo} />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

const OurAchievement: React.FC = () => {

    return(
      <div className='bg-zinc-400'>
        <div className='md:h-[440px] flex justify-center p-6 '>
          <Container className='bg-yellow-500 w-full rounded-3xl'>
            <div className='p-16'>

            <div className='lg:flex justify-between'>
              <div className='text-3xl lg:text-5xl text-white font-extrabold'>Our Achievement</div>
              <div className='text-xs lg:text-sm text-white max-w-lg'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
            </div>
            <div className='flex flex-wrap md:flex md:flex-nowrap justify-center md:justify-between'>

                <div className='text-center md:text-left flex flex-col gap-3 w-60 mt-8'>
                  <div className='flex justify-center md:justify-start items-center gap-5'>
                    <div className='w-16 h-16 bg-white rounded-full'></div>
                    <div className='text-3xl lg:text-5xl font-black text-white'>30</div>
                  </div>
                  <div className='text-white font-bold text-xl lg:text-2xl'>Experience</div>
                  <div className='text-xs lg:text-sm text-white'>Lorem ipsum dolor sit amet, leo consectetur adipiscing elit Ut.</div>
                </div>

                <div className='text-center md:text-left flex flex-col gap-3 w-60 mt-8'>
                  <div className='flex justify-center md:justify-start items-center gap-5'>
                    <div className='w-16 h-16 bg-white rounded-full'></div>
                    <div className='text-3xl lg:text-5xl font-black text-white'>30</div>
                  </div>
                  <div className='text-white font-bold text-xl lg:text-2xl'>Experience</div>
                  <div className='text-xs lg:text-sm text-white'>Lorem ipsum dolor sit amet, leo consectetur adipiscing elit Ut.</div>
                </div>

                <div className='text-center md:text-left flex flex-col gap-3 w-60 mt-8'>
                  <div className='flex justify-center md:justify-start items-center gap-5'>
                    <div className='w-16 h-16 bg-white rounded-full'></div>
                    <div className='text-3xl lg:text-5xl font-black text-white'>30</div>
                  </div>
                  <div className='text-white font-bold text-xl lg:text-2xl'>Experience</div>
                  <div className='text-xs lg:text-sm text-white'>Lorem ipsum dolor sit amet, leo consectetur adipiscing elit Ut.</div>
                </div>

                <div className='text-center md:text-left flex flex-col gap-3 w-60 mt-8'>
                  <div className='flex justify-center md:justify-start items-center gap-5'>
                    <div className='w-16 h-16 bg-white rounded-full'></div>
                    <div className='text-3xl lg:text-5xl font-black text-white'>30</div>
                  </div>
                  <div className='text-white font-bold text-xl lg:text-2xl'>Experience</div>
                  <div className='text-xs lg:text-sm text-white'>Lorem ipsum dolor sit amet, leo consectetur adipiscing elit Ut.</div>
                </div>

            </div>
            </div>
          </Container>
        </div>
      </div>
    )
}

const StatsAndTestamonials: React.FC = () => {

  const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  };

  const [isVisible, elementRef] = useIntersectionObserver({});
  const [stats, setStats] = useState({ fleet: 0, trips: 0, dropped: 0, satisfied: 0 });
  const finalStats = { fleet: 32002, trips: 16008, dropped: 17068, satisfied: 19508 };

  const [translateX, setTranslateX] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('duration-700');
  const cardWidthIncludingGap = 320 + 16;
  const numberOfVisibleCards = 1;
  const slideInterval = 2000;
  const [isHovering, setIsHovering] = useState(false);

  const testimonials = [
    { avatar: "", testimonialText: "Using Bombay taxi company was an absolute breeze! From booking to drop-off, everything was seamless. The driver was punctual, courteous, and the vehicle was clean and comfortable. I highly recommend them for anyone looking for a reliable and stress-free transportation option.", name: "Jane Doe", position:"Managing Director" },
    { avatar: "", testimonialText: "I've been using Bombay Taxi company for my business travel needs for years now, and they never disappoint. Their customer service is top-notch, their vehicles are well-maintained, and their drivers are professional and knowledgeable. I wouldn't trust anyone else with my transportation needs.", name: "John Smith" },
    { avatar: "", testimonialText: "I recently used Bombay Taxi Company for a family trip, and I couldn't be happier with the service. The booking process was quick and easy, the vehicle was spacious enough for my family, and the driver went above and beyond to make sure we had a comfortable journey. I will definitely be using them again for future trips.", name: "Alice Johnson", position:"CEO"},
    { avatar: "", testimonialText: "As a frequent traveller, I've tried many cab rental services, but none compare to Bombay Taxi Company. Their prices are competitive, their fleet is diverse, and their drivers are always professional and courteous. Whether it's a short trip around town or a long-distance journey, I trust Bombay Taxi Company to get me to my destination safely and on time.", name: "Mark Brown"},
    { avatar: "", testimonialText: "I recently used Bombay Taxi Company for airport transfer, and I was thoroughly impressed. The driver was waiting for me at the arrivals area, holding a sign with my name, making it easy for me to locate them. I will definitely be using Bombay Taxi Company for all my future transportation needs.", name: "Emily Clark", position:"Chairmen"},
    // repeat
    { avatar: "", testimonialText: "Using Bombay taxi company was an absolute breeze! From booking to drop-off, everything was seamless. The driver was punctual, courteous, and the vehicle was clean and comfortable. I highly recommend them for anyone looking for a reliable and stress-free transportation option.", name: "Jane Doe" , position:"Managing Director" },
    { avatar: "", testimonialText: "I've been using Bombay Taxi company for my business travel needs for years now, and they never disappoint. Their customer service is top-notch, their vehicles are well-maintained, and their drivers are professional and knowledgeable. I wouldn't trust anyone else with my transportation needs.", name: "John Smith" },
    { avatar: "", testimonialText: "I recently used Bombay Taxi Company for a family trip, and I couldn't be happier with the service. The booking process was quick and easy, the vehicle was spacious enough for my family, and the driver went above and beyond to make sure we had a comfortable journey. I will definitely be using them again for future trips.", name: "Alice Johnson", position:"CEO"},
  ];

  const maxTranslate = -(testimonials.length * cardWidthIncludingGap - window.innerWidth + cardWidthIncludingGap * numberOfVisibleCards);

  useEffect(() => {
    if (!isHovering) {
    const interval = setInterval(() => {
      setTranslateX(currentTranslate => {
        const newTranslate = currentTranslate - cardWidthIncludingGap;
        if (newTranslate < maxTranslate) {
          setTransitionDuration('duration-0'); // Instantly reset position without transition
          setTimeout(() => setTransitionDuration('duration-700'), 50); // Then restore the transition for the next slide
          return 0; // Start over
        }
        return newTranslate;
      });
    }, slideInterval);

    return () => clearInterval(interval);
  }
  }, [testimonials.length, cardWidthIncludingGap, isHovering]);

  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        setStats((prevStats) => ({
          fleet: prevStats.fleet < finalStats.fleet ? prevStats.fleet + Math.ceil(finalStats.fleet / 300) : finalStats.fleet,
          trips: prevStats.trips < finalStats.trips ? prevStats.trips + Math.ceil(finalStats.trips / 300) : finalStats.trips,
          dropped: prevStats.dropped < finalStats.dropped ? prevStats.dropped + Math.ceil(finalStats.dropped / 300) : finalStats.dropped,
          satisfied: prevStats.satisfied < finalStats.satisfied ? prevStats.satisfied + Math.ceil(finalStats.satisfied / 300) : finalStats.satisfied,
        }));
      }, 5);

      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  const handleNext = () => {
    if (translateX > maxTranslate) {
      setTranslateX(translateX - cardWidthIncludingGap);
    }
  };

  const handlePrev = () => {
    if (translateX < 0) {
      setTranslateX(translateX + cardWidthIncludingGap);
    }
  };

  return (
    <>
      <div
        initial="hidden"
        whileInView="visible"
        variants={fadeInDown}
        viewport={{ once: true, amount: 0.5 }}
        className="bg-blue-900 text-white"
        ref={elementRef}
        style={{
          backgroundImage: `url(${Experience})`,
          backgroundSize: 'cover'
        }}
      >
        <div className='flex flex-col justify-center items-center bg-blue-950 w-full h-full bg-opacity-70 text-center p-3'>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className="flex justify-center max-w-6xl mx-auto py-32 px-4">
            <div className="grid text-center gap-y-8 gap-x-8 md:gap-x-0
              grid-cols-2
              lg:grid-cols-4
            ">
              {/* Best Vehicles Fleet */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-5xl md:text-8xl"><CarOutlined /></div>
                <div className='hidden md:block border-b opacity-60 w-60'></div>
                <div className='hidden md:block bg-white rounded-full p-1 my-3'>
                  <div className=' w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-4xl md:text-5xl font-semibold my-3">{stats.fleet}</div>
                <div>Best Vehicles Fleet</div>
              </div>
              {/* Road Trips Done */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-5xl md:text-8xl"><EnvironmentOutlined /></div>
                <div className='hidden md:block border-b opacity-60 w-60'></div>
                <div className='hidden md:block bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-4xl md:text-5xl font-semibold my-3">{stats.trips}</div>
                <div>Road Trips Done</div>
              </div>
              {/* People Dropped */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-5xl md:text-8xl"><UserOutlined /></div>
                <div className='hidden md:block border-b opacity-60 w-60'></div>
                <div className='hidden md:block bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-4xl md:text-5xl font-semibold my-3">{stats.dropped}</div>
                <div>People Dropped</div>
              </div>
              {/* Satisfied Clients */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-5xl md:text-8xl"><SmileOutlined /></div>
                <div className='hidden md:block border-b opacity-60 w-60'></div>
                <div className='hidden md:block bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-4xl md:text-5xl font-semibold my-3">{stats.satisfied}</div>
                <div>Satisfied Client</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className='flex flex-col items-center'
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className='py-16 w-full
          md:px-8
          xl:px-32
          '>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='text-center text-3xl  font-medium'>What Our Customers Say</motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={zoomIn}
            viewport={{ once: true, amount: 0.5 }} className='flex justify-center items-center w-full relative'>
            <button className="bg-white w-14 h-14 hover:bg-yellow-400 text-black font-semibold shadow-xl px-4 rounded-full border-2 border-yellow-500 z-10" onClick={handlePrev}>
                <LeftOutlined/>
              </button>
            <div className='m-8 py-1 overflow-x-scroll scroll-smooth no-scrollbar
              lg:w-[992px]
              md:w-[656px]
              w-[320px]
            '>
              <div className={`flex gap-4  ${transitionDuration}`}
                style={{ gap: `${16}px`, transform: `translateX(${translateX}px)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    avatar={testimonial.avatar}
                    testimonialText={testimonial.testimonialText}
                    name={testimonial.name}
                    position={testimonial.position}
                  />
                ))}
              </div>
            </div>
            <button className="bg-white w-14 h-14 hover:bg-yellow-400 text-black font-semibold px-4 rounded-full border-2 border-yellow-500 z-10 shadow-xl" onClick={handleNext}>
                <RightOutlined/>
              </button>
          </motion.div>
        </div>
      </div>
    </>
  )
}

const AwsomeFeatures: React.FC = () => {

  const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  
  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  const [translateX, setTranslateX] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('duration-700');
  const cardWidthIncludingGap = 320 + 16;
  const numberOfVisibleCards = 1;
  const slideInterval = 2000;
  const [isHovering, setIsHovering] = useState(false);

  const features = [
    { icon: <StarOutlined className='text-5xl' />, text: 'Premium Services' },
    { icon: <SafetyOutlined className='text-5xl' />, text: '100% Safety Guarantee' },
    { icon: <TagOutlined className='text-5xl' />, text: 'Affordable Pricing' },
    { icon: <CarOutlined className='text-5xl' />, text: 'Best Quality Fleet' },
    { icon: <SolutionOutlined className='text-5xl' />, text: 'Professional Expert Drivers' },
    { icon: <CustomerServiceOutlined className='text-5xl' />, text: '24/7 Quick Support' },
    { icon: <CloseCircleOutlined className='text-5xl' />, text: 'Best Deals & Discounts' },
  ];

  const maxTranslate = -(features.length * cardWidthIncludingGap - window.innerWidth + cardWidthIncludingGap * numberOfVisibleCards);

  useEffect(() => {
    if (!isHovering) {
    const interval = setInterval(() => {
      setTranslateX(currentTranslate => {
        const newTranslate = currentTranslate - cardWidthIncludingGap;
        if (newTranslate < maxTranslate) {
          setTransitionDuration('duration-0'); // Instantly reset position without transition
          setTimeout(() => setTransitionDuration('duration-700'), 50); // Then restore the transition for the next slide
          return 0; // Start over
        }
        return newTranslate;
      });
    }, slideInterval);

    return () => clearInterval(interval);
  }
  }, [features.length, cardWidthIncludingGap, isHovering]);

  const handleNext = () => {
    if (translateX > maxTranslate) {
      setTranslateX(translateX - cardWidthIncludingGap);
    }
  };

  const handlePrev = () => {
    if (translateX < 0) {
      setTranslateX(translateX + cardWidthIncludingGap);
    }
  };

  return (
    <>
      <div className='space-y-10 py-20'>
        <div className='flex flex-col justify-center items-center space-y-3 text-center
        px-4
        sm:px-6
        md:px-10
        lg:px-14
        xl:px-20
        2xl:px:32
      '>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} 
            className='text-3xl font-medium '>
            Our Awesome Features
            <span className='text-yellow-500'>.</span>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} 
            className='text-sm text-gray-500
              sm:w-[600px]
        '>
            Explore top-tier service excellence with us. We're committed to ensuring your safety and satisfaction. Our affordable rates make luxury accessible, and our skilled drivers guarantee a stellar journey, any time.
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={slideIn}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className='flex gap-8 justify-center items-center overflow-hidden relative'
            onMouseOver={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >

            <button className="absolute w-14 h-14 left-40 xl:left-60 hidden lg:block bg-white hover:bg-yellow-400 text-black font-semibold px-4 rounded-full border-2 border-yellow-500 z-10 shadow-xl " onClick={handlePrev}>
                <LeftOutlined/>
              </button>

            <div className='m-8 py-1  scroll-smooth no-scrollbar
              lg:w-[992px]
              md:w-[656px]
              w-[320px]
            '>
            <div className={`flex gap-4  ${transitionDuration}`}
                style={{ gap: `${16}px`, transform: `translateX(${translateX}px)` }}
            >
            {features.map((feature, index) => (
              <div key={index} className='flex flex-shrink-0 items-center gap-2 w-80 border border-opacity-10 rounded-3xl p-3'>
                <div className='text-yellow-500'>
                  {feature.icon}
                </div>
                <div className='font-semibold'>
                  {feature.text}<span className='text-yellow-500'>.</span>
                </div>
              </div>
            ))}
            </div>
            </div>
            
            <button className="absolute w-14 h-14 right-40 xl:right-60 hidden lg:block bg-white hover:bg-yellow-400 text-black font-semibold px-4 rounded-full border-2 border-yellow-500 z-10 shadow-xl" onClick={handleNext}>
                <RightOutlined/>
              </button>

          </div>
        </motion.div>
      </div>
    </>
  )
}

const OurBenefitsList: React.FC = () => {

  const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  
  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
  };

  // const benefits = [
  //   {
  //     icon: <CreditCardOutlined className='text-5xl text-yellow-500' />,
  //     title: "Online Payment",
  //     description: "Convenient and secure online payment options with support for multiple gateways.",
  //   },
  //   {
  //     icon: <SafetyOutlined className='text-5xl text-yellow-500' />,
  //     title: "Safety Guarantee",
  //     description: "Top-notch safety measures for every ride ensuring a worry-free travel experience.",
  //   },
  //   {
  //     icon: <CarOutlined className='text-5xl text-yellow-500' />,
  //     title: "Quick Ride",
  //     description: "Efficient booking and dispatch system to minimize wait times and get you on your way faster.",
  //   },
  //   {
  //     icon: <DollarOutlined className='text-5xl text-yellow-500' />,
  //     title: "Free Quotation",
  //     description: "Get a free and instant quote for your ride with no hidden charges.",
  //   },
  //   {
  //     icon: <UserOutlined className='text-5xl text-yellow-500' />,
  //     title: "Cleared Drivers",
  //     description: "Professionally trained drivers with thorough background checks for your peace of mind.",
  //   },
  //   {
  //     icon: <TagOutlined className='text-5xl text-yellow-500' />,
  //     title: "Discount & Promo",
  //     description: "Enjoy exclusive discounts and promotions to save on your rides.",
  //   },
  // ];

  return (
    <>
      <div className='space-y-10 py-20'>
        <div className='flex flex-col justify-center items-center space-y-3 text-center
          px-4
          sm:px-6
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px:32
        '>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='text-3xl font-medium '>We Offer The Best For You<span className='text-yellow-500'>.</span></motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='text-sm text-gray-500
            sm:w-[600px]
          '>
            Discover unmatched services tailored just for you. We prioritize your convenience and safety, delivering quality and reliability with every interaction. Experience excellence redefined.
          </motion.div>
        </div>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={slideIn}
            viewport={{ once: true, amount: 0.5 }} className='flex flex-wrap gap-8 justify-center'>
          <div className='max-w-xs min-w-[320px]'>
            <div className='bg-[#2A2A2A] rounded-2xl p-5 py-8 flex flex-col gap-5 w-full'>
              <div className='flex gap-x-3'>
                <div className='bg-yellow-500 rounded-lg p-3 flex justify-center items-center'>
                  <DollarOutlined className='text-3xl' />
                </div>
                <div className='text-white text-xl flex flex-col justify-between'>
                  <div className='tracking-wide'>
                    Support All Payment
                  </div>
                  <div className='font-light text-sm'>
                    Supports all major payment methods.
                  </div>
                </div>
              </div>
              <hr className="border-zinc-700" />
              <div className='flex justify-center gap-5'>
                <div className='bg-white flex justify-center w-8 h-5 rounded'>
                  <CreditCardOutlined />
                </div>
                <div className='bg-white flex justify-center w-8 h-5 rounded'>
                  <BankOutlined />
                </div>
                <div className='bg-white flex justify-center w-8 h-5 rounded'>
                  <MobileOutlined />
                </div>
                <div className='bg-white flex justify-center w-8 h-5 rounded'>
                  <MoneyCollectOutlined />
                </div>
              </div>
            </div>
          </div>

          <div className='max-w-xs min-w-[320px]'>
            <div className='bg-yellow-500 rounded-2xl p-5 py-8 flex flex-col gap-5 w-full'>
              <div className='flex gap-x-3'>
                <div className='bg-[#2A2A2A] rounded-lg p-3 flex justify-center items-center'>
                  <SafetyOutlined className='text-3xl text-yellow-500' />
                </div>
                <div className='text-xl flex flex-col justify-between'>
                  <div className='tracking-wide'>
                    Safety First
                  </div>
                  <div className='font-light text-sm'>
                    Commitment to safety with every journey you take.
                  </div>
                </div>
              </div>
              <hr className="border-[#2A2A2A]" />
              <div className='flex justify-around gap-5'>
                <div className='flex gap-x-2'>
                  <div className='text-xl flex justify-center w-8 h-5 rounded'>
                    <CreditCardOutlined />
                  </div>
                  <div className='font-light text-sm'>
                    Guarantee
                  </div>
                </div>
                <div className='flex gap-x-2'>
                  <div className='text-xl flex justify-center w-8 h-5 rounded'>
                    <CarOutlined />
                  </div>
                  <div className='font-light text-sm'>
                    Quick Ride
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='max-w-xs min-w-[320px]'>
            <div className='border rounded-2xl p-5 py-8 flex flex-col gap-5 w-full'>
              <div className='flex gap-x-3'>
                <div className='bg-yellow-500 rounded-lg p-3 flex justify-center items-center'>
                  <MobileOutlined className='text-3xl' />
                </div>
                <div className='text-xl flex flex-col justify-between'>
                  <div className='tracking-wide'>
                    100% Digital
                  </div>
                  <div className='font-light text-sm'>
                    Complete digital experience from booking to payment.
                  </div>
                </div>
              </div>
              <hr className="border-zinc-200" />
              <div className='flex justify-around gap-5'>
                <div className='flex gap-x-2'>
                  <div className='text-xl flex justify-center w-8 h-5 rounded'>
                    <AppleFilled className='text-yellow-500' />
                  </div>
                  <div className='font-light text-sm'>
                    Apple
                  </div>
                </div>
                <div className='flex gap-x-2'>
                  <div className='text-xl flex justify-center w-8 h-5 rounded'>
                    <AndroidFilled className='text-yellow-500' />
                  </div>
                  <div className='font-light text-sm'>
                    Android
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {benefits.map((benefit, index) => (
            <div key={index} className='max-w-xs min-w-[320px] bg-white rounded-2xl p-5 py-8 flex flex-col gap-5 w-full shadow-lg'>
              <div className='flex justify-center items-center'>
                {benefit.icon}
              </div>
              <div className='text-center'>
                <div className='text-xl font-semibold'>
                  {benefit.title}
                </div>
                <div className='font-light text-sm mt-2'>
                  {benefit.description}
                </div>
              </div>
            </div>
          ))} */}
        </motion.div>

        {/* <div className='w-full'>
          <div className='flex justify-center -mb-10'>
            <div className='border border-dashed  justify-center w-[400px]
              hidden
              sm:flex
            '/>
          </div>
          <div className='flex flex-col items-center justify-center
            sm:flex-row
          '>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl'>
                <CarOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Booking A Taxi
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center shadow-2xl'>
                <UserOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Get a Driver
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl'>
                <LikeOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Enjoy Your Ride
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

const EasyStep: React.FC = () => {

  const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <>
      <div className='space-y-24 py-20'>
        <div className='flex flex-col justify-center items-center space-y-3 text-center
          px-4
          sm:px-6
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px:32
        '>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} 
            className='text-3xl font-medium '>
              Easy Step For Book Your Taxi<span className='text-yellow-500'>.</span>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='text-sm text-gray-500
            sm:w-[600px]
          '>
            Four simple steps to a smooth, stress-free taxi booking. We ensure a seamless experience from start to finish.
          </motion.div>
        </div>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={zoomIn}
            viewport={{ once: true, amount: 0.5 }} className='w-full'>
          <div className='flex justify-center -mb-10'>
            <div className='border border-dashed  justify-center w-[600px]
              hidden
              sm:flex
            '/>
          </div>
          <div className='flex flex-col items-center justify-center
            sm:flex-row
          '>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl'>
                <CarOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Booking A Taxi
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Choose your pickup and destination.
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center shadow-2xl'>
                <DollarCircleOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Pay Your Taxi
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Safe and secure payment options for you.
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center shadow-2xl'>
                <UserOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Get a Driver
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Match with a skilled local driver for you.
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl'>
                <LikeOutlined className='text-3xl text-yellow-500' />
              </div>
              <div className='text-xl'>
                Enjoy Your Ride
              </div>
              <div className='text-gray-500 text-sm text-center'>
                R elax in comfort to your destination.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

const WhatWeAreOffering: React.FC = () => {

  const fadeInDown = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const services = [
    {
      icon: <EnvironmentOutlined className='text-3xl' />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description: "Book your ride with ease through our online platform, available 24/7 for your convenience.",
      detailsUrl: '/',
      image: WeOffer1
    },
    {
      icon: <ArrowRightOutlined className='text-3xl' />,
      feature: "FEATURE - 02",
      title: "Onewaytrip",
      description: "Efficient and comfortable one-way trips to your desired destination, with no return trip required.",
      detailsUrl: '/',
      image: WeOffer2
    },
    {
      icon: <SyncOutlined className='text-3xl' />,
      feature: "FEATURE - 03",
      title: "Roundtrip",
      description: "Convenient roundtrip services ensuring a seamless journey to your destination and back.",
      detailsUrl: '/',
      image: WeOffer3
    },
    {
      icon: <ClockCircleOutlined className='text-3xl' />,
      feature: "FEATURE - 04",
      title: "Hourly Car Rental",
      description: "Flexible hourly car rental services tailored to meet your short-term travel needs.",
      detailsUrl: '/hourly-rental',
      image: WeOffer4
    },
    {
      icon: <CarOutlined className='text-3xl' />,
      feature: "FEATURE - 05",
      title: "Airport Transfer",
      description: "Reliable airport transfer services for a stress-free journey to and from the airport.",
      detailsUrl: '/',
      image: WeOffer5
    },
    {
      icon: <TeamOutlined className='text-3xl' />,
      feature: "FEATURE - 06",
      title: "Corporate Car Rental",
      description: "Professional corporate car rental services designed for business needs and executive travel.",
      detailsUrl: '/',
      image: WeOffer6
    }
  ];

  const [translateX, setTranslateX] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('duration-700');
  const cardWidthIncludingGap = 440;
  const numberOfVisibleCards = 2;
  const slideInterval = 2000;

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  // useEffect(() => {
  //   if (!isHovering) {
  //     // Only run the interval if not hovering
  //     const maxTranslate = -(services.length * cardWidthIncludingGap - window.innerWidth + cardWidthIncludingGap * numberOfVisibleCards);
  //     const interval = setInterval(() => {
  //       if (!isDragging) { // Pause sliding if dragging
  //         setTranslateX(currentTranslate => {
  //           const newTranslate = currentTranslate - cardWidthIncludingGap;
  //           if (newTranslate < maxTranslate) {
  //             setTransitionDuration('duration-0');
  //             setTimeout(() => setTransitionDuration('duration-700'), 50);
  //             return 0;
  //           }
  //           return newTranslate;
  //         });
  //       }
  //     }, slideInterval);

  //     return () => clearInterval(interval);
  //   }
  // }, [services.length, cardWidthIncludingGap, isHovering, isDragging]);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(translateX);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const dragDistance = e.clientX - startX;
      setTranslateX(currentX + dragDistance);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className='space-y-12 py-20 bg-[#f5f5f5]'>
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='text-center text-3xl font-medium'>
          We Make Your Every Trip Comfortable
        </motion.div>
        <div 
          className='flex justify-center'
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInDown}
            viewport={{ once: true, amount: 0.5 }} className='
            xl:w-[1240px]
            lg:w-[800px] 
            w-[360px]
          '
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          >
            <div className={`flex flex-wrap justify-center gap-8`}>
              {services.map((service, index) => (
                <div 
                  className='service-card' 
                  key={index}
                  onMouseOver={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <ServiceCard
                    icon={service.icon}
                    feature={service.feature}
                    title={service.title}
                    description={service.description}
                    detailsUrl={service.detailsUrl}
                    image={service.image}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
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
        <AwsomeFeatures /> {/* our awesome features for you - https://www.bombaytaxicompany.com/ */}
      </div>
      <WhatWeAreOffering /> {/* // What Were Offering - about us sliding component section should be here */}
      <div className='
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
      '>
        <OurBenefitsList /> {/* Our Benifits List - https://preview.themeforest.net/item/taxico-taxi-company-online-cab-service-elementor-template-kit/full_screen_preview/34438955?_ga=2.197559599.1404235229.1707414958-1271169116.1697727807&_gac=1.124503416.1707415664.CjwKCAiAlJKuBhAdEiwAnZb7lTgzQ4xXO12_mageyJHHEzeZLKuUlDic0mk6CIbaxFw9S68pWfiWVhoCyl4QAvD_BwE */}
      </div>
      <WhyChooseUs /> {/* Title:Our Experience SubTitle:We Are Experienced Since 1992 Until Now. https://themeholy.com/wordpress/taxiar/home-03/ */}
      <div className='
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
      '>
        <EasyStep />
      </div>
        <OurAchievement/>
        <StatsAndTestamonials />
        <CallUsNow />
      <Footer />
    </>
  )
}

export default Home;