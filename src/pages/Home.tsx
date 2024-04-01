/* eslint-disable @typescript-eslint/no-explicit-any */
import { AndroidFilled, AppleFilled, ArrowLeftOutlined, ArrowRightOutlined, BankOutlined, CarOutlined, ClockCircleOutlined, CloseCircleOutlined, CreditCardOutlined, CustomerServiceOutlined, DollarCircleOutlined, DollarOutlined, EnvironmentOutlined, LikeOutlined, MobileOutlined, MoneyCollectOutlined, SafetyOutlined, SmileOutlined, SolutionOutlined, StarOutlined, SwapOutlined, SyncOutlined, TagOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Dropdown, MenuProps, Segmented, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import axios from "../api/axios"
import { City } from '../types/citys.types';
import { useNavigate } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { Footer } from '../components/Footer';
import { CallUsNow } from '../components/CallUsNow';
import { WhyChooseUsCard } from '../components/WhyChooseUsCard';
// import { PackageCard } from '../components/PackageCard';

import HeroImage from "../assets/images/hero.jpg"
import Experience from "../assets/images/experience.jpg"
// import HappyCustomer from "../assets/images/happy_customers.jpg"
// import TajMahal from "../assets/images/taj_mahal.jpg"
import Quote from "../assets/images/quote.png"
import Face1 from "../assets/images/face1.jpg"
import Face2 from "../assets/images/face2.jpg"
import Face3 from "../assets/images/face3.jpg"
import { generateTimeOptions } from '../utils/GenerateTimeOptions';
import { generateDistanceOptions } from '../utils/GenerateDistanceOptions';
import { ServiceCard } from '../components/ServiceCard';

import './rotatingtexts.css'
import './ServiceCardAnimation.css';
import { useIntersectionObserver } from '../components/UseIntersectionObserver.jsx';
// import useCounter from '../components/Counter';

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
  const [hourlyPackage, setHourlyPackage] = useState<string>('1 hr 10 kms')

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
    console.log(date)
    setPickupDate(date)
    togglePickupDatePicker()
  };

  const handleReturnDateChange = (date: Dayjs | null, dateString: string) => {
    console.log('Selected Date:', dateString);
    console.log(date)
    setReturnDate(date)
    toggleReturnDatePicker()
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
    style: { height: '300px', overflow: 'auto' }
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

  let currentIndex = 0;
  const texts = document.querySelectorAll('.rotating-text-item');
  const textCount = texts.length;

  setInterval(() => {
    (texts[currentIndex] as any).style.display = 'none';
    currentIndex = (currentIndex + 1) % textCount;
    (texts[currentIndex] as any).style.display = 'block';
  }, 3000); // Change text every 3 seconds

  return (
    <>
      <div className='bg-[#2a2a2a81] h-[720px] ' style={{ backgroundImage: `url(${HeroImage})`, backgroundSize: 'cover' }}>
        <div className='bg-[#00000095] h-full w-full flex flex-col justify-center items-center space-y-20'>
          {/* <!-- Rotating Text Container --> */}
          <div id='rotatingText' className='text-4xl font-medium text-white text-center
            mt-24
            lg:mt-0
          '>
            <div className='rotating-text-item h-40 lg:h-max flex flex-col justify-center'>
              Welcome to Bombay Taxi Co. Book Taxi For Your Ride
            </div>
            <div className='rotating-text-item' style={{
              display: 'none'
            }}>24/7 Online taxi For Your Ride Enjoying Comfortable TRip With Bombay Taxi Co.</div>
            <div className='rotating-text-item h-40 lg:h-max flex flex-col justify-center' style={{
              display: 'none'
            }}>Lets Ride With Us Enjoy Your Luxury Taxi With Low Price</div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='rounded-xl bg-white  shadow-lg -mb-6 z-10
              lg:px-20
            '>
              <Segmented
                onChange={(value) => {
                  handleTabChange(value.toString())
                }}
                options={[
                  {
                    label: (
                      <div className='lg:text-lg m-2'>
                        <ArrowRightOutlined className='hidden lg:inline-flex' />
                        <span className='mx-2'>
                          One-Way Trip
                        </span>
                      </div>
                    ),
                    value: 'One-Way Trip'
                  },
                  {
                    label: (
                      <div className='lg:text-lg m-2'>
                        <SyncOutlined className='hidden lg:inline-flex' />
                        <span className='mx-2'>
                          Round Trip
                        </span>
                      </div>
                    ),
                    value: 'Round Trip',
                  },
                  {
                    label: (
                      <div className='lg:text-lg m-2'>
                        <ClockCircleOutlined className='hidden lg:inline-flex' />
                        <span className='mx-2'>
                          Hourly Rental
                        </span>
                      </div>
                    ),
                    value: 'Hourly Rental',
                  },
                ]}
              />
            </div>
            <div className='bg-white rounded-lg -mb-6 flex justify-center items-center py-8 
              lg:px-6
            '>
              <div className='w-full rounded gap-2
                lg:flex
              '>
                {activeTab === "Hourly Rental" &&
                  <div className='w-full lg:w-[188px] p-3 pb-4 space-y-1 border'>
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
                    <div className='w-[188px] p-3 pb-4 space-y-1 border'>
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
                    <div className='w-[188px] p-3 pb-4 space-y-1 border'>
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
                <div className='relative w-full lg:w-[188px] p-3 pb-4 space-y-1 border'>
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
                <div className='w-full lg:w-[188px] p-3 pb-4 space-y-1 border'>
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
                  <div className='relative w-full lg:w-[188px] p-3 pb-4 space-y-1 border'>
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
                                current ? current.isBefore(dayjs().startOf('day')) || current.isAfter(dayjs().add(30, 'days')) : false
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
                    <div className='w-[393px] lg:w-[250px] p-3 pb-4 space-y-1 border'>
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

const StatsAndTestamonials: React.FC = () => {

  const [isVisible, elementRef] = useIntersectionObserver({});
  const [stats, setStats] = useState({ fleet: 0, trips: 0, dropped: 0, satisfied: 0 });
  const finalStats = { fleet: 32002, trips: 16008, dropped: 17068, satisfied: 19508 };
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "Manik Patil",
      image: Face1, // Assuming you've imported these images at the top
      feedback: "Great experience with this company. I have used many others in Oakland but this was by far the best. You guys made our trip so easy. Great customer service, wonderful drivers and by far the best and most affordable transportation company I have used. Thank you soo much!",
    },
    {
      name: "Manik Patil",
      image: Face2, // Assuming you've imported these images at the top
      feedback: "Great experience with this company. I have used many others in Oakland but this was by far the best. You guys made our trip so easy. Great customer service, wonderful drivers and by far the best and most affordable transportation company I have used. Thank you soo much!",
    },
    {
      name: "Manik Patil",
      image: Face3, // Assuming you've imported these images at the top
      feedback: "Great experience with this company. I have used many others in Oakland but this was by far the best. You guys made our trip so easy. Great customer service, wonderful drivers and by far the best and most affordable transportation company I have used. Thank you soo much!",
    }
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((currentTestimonialIndex) =>
        (currentTestimonialIndex + 1) % testimonials.length
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentTestimonialIndex];
  const prevTestimonialIndex = currentTestimonialIndex - 1 < 0 ? testimonials.length - 1 : currentTestimonialIndex - 1;
  const nextTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;

  return (
    <>
      <div
        className="bg-blue-900 text-white"
        ref={elementRef}
        style={{
          backgroundImage: `url(${Experience})`,
          backgroundSize: 'cover'
        }}
      >
        <div className='flex flex-col justify-center items-center bg-blue-950 w-full h-full bg-opacity-70 text-center p-3'>
          <div className="flex justify-center max-w-6xl mx-auto py-32 px-4">
            <div className="grid grid-cols-1 text-center gap-y-4
              sm:grid-cols-2
              lg:grid-cols-4
            ">
              {/* Best Vehicles Fleet */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-8xl"><CarOutlined /></div>
                <div className='border-b opacity-60 w-60'></div>
                <div className='bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-5xl font-semibold my-3">{stats.fleet}</div>
                <div>Best Vehicles Fleet</div>
              </div>
              {/* Road Trips Done */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-8xl"><EnvironmentOutlined /></div>
                <div className='border-b opacity-60 w-60'></div>
                <div className='bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-5xl font-semibold my-3">{stats.trips}</div>
                <div>Road Trips Done</div>
              </div>
              {/* People Dropped */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-8xl"><UserOutlined /></div>
                <div className='border-b opacity-60 w-60'></div>
                <div className='bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-5xl font-semibold my-3">{stats.dropped}</div>
                <div>People Dropped</div>
              </div>
              {/* Satisfied Clients */}
              <div className="flex flex-col items-center">
                <div className="mb-2 text-8xl"><SmileOutlined /></div>
                <div className='border-b opacity-60 w-60'></div>
                <div className='bg-white rounded-full p-1 my-3'>
                  <div className='w-2.5 h-2.5 bg-red-600 rounded-full'></div>
                </div>
                <div className="text-5xl font-semibold my-3">{stats.satisfied}</div>
                <div>Satisfied Client</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        {/* <div className='h-72 flex flex-col justify-center items-center w-full' style={{ backgroundImage: `url(${HappyCustomer})`, backgroundSize: 'cover' }}>
          <div className='flex flex-col justify-center items-center bg-black w-full h-full -mb-16 bg-opacity-70 text-center p-3'>
            <div className='text-3xl font-medium text-white'>We Are Experienced Since 1992 Until Now</div>
            <div className='text-white text-center text-sm
            md:w-[600px]
          '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat libero condimentum metus.</div>
          </div>
          <div className='h-16' />
        </div> */}
        {/* <div className='bg-white border border-black rounded-lg items-center justify-around -mt-16 z-10
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
        </div> */}
        <div className='py-16  w-full
          md:px-8
          xl:px-32
          '>

          <div className='text-center text-3xl font-medium'>What Our Customers Say</div>

          <div className='flex justify-center items-center p-8'>
            <div className='flex-col justify-center items-center m-16 hidden md:flex'>
              <div className='h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center'>
                <img src={testimonials[prevTestimonialIndex].image} className='h-[76px] w-[76px] bg-yellow-500 rounded-full object-cover' alt="Previous testimonial" />
              </div>
            </div>
            <div className='m-6 shadow-xl hidden md:block'>
              <Button size='large' icon={<ArrowLeftOutlined />} className='bg-white border-white' onClick={() => setCurrentTestimonialIndex(prevTestimonialIndex)} />
            </div>
            <div className='p-4 flex flex-col justify-center items-center w-full xl:w-2/5 text-center'>
              <div className='h-40 w-40 bg-yellow-500 rounded-full flex justify-center items-center'>
                <img src={currentTestimonial.image} className='h-[152px] w-[152px] bg-yellow-500 rounded-full object-cover' alt={currentTestimonial.name} />
              </div>
              <div className='font-medium text-2xl py-4'>{currentTestimonial.name}</div>
              <div className='relative'>
                <img src={Quote} className='absolute opacity-10 h-12 -mt-10' alt="Quote" />
                <div className='text text-center text-gray-800'>{currentTestimonial.feedback}</div>
                <div className='flex w-full justify-end'>
                  <img src={Quote} className='absolute opacity-10 h-12 -mt-5 transform -scale-x-100' alt="Quote" />
                </div>
              </div>
            </div>
            <div className='m-6 shadow-xl hidden md:block'>
              <Button size='large' icon={<ArrowRightOutlined />} className='bg-white border-white' onClick={() => setCurrentTestimonialIndex(nextTestimonialIndex)} />
            </div>
            <div className='flex-col justify-center items-center m-16 hidden md:flex'>
              <div className='h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center'>
                <img src={testimonials[nextTestimonialIndex].image} className='h-[76px] w-[76px] bg-yellow-500 rounded-full object-cover' alt="Next testimonial" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AwsomeFeatures: React.FC = () => {

  const features = [
    { icon: <StarOutlined className='text-5xl' />, text: 'Premium Services' },
    { icon: <SafetyOutlined className='text-5xl' />, text: '100% Safety Guarantee' },
    { icon: <TagOutlined className='text-5xl' />, text: 'Affordable Pricing' },
    { icon: <CarOutlined className='text-5xl' />, text: 'Quality Taxi' },
    { icon: <SolutionOutlined className='text-5xl' />, text: 'Professional Drivers' },
    { icon: <CustomerServiceOutlined className='text-5xl' />, text: '24/7 Quick Support' },
    { icon: <CloseCircleOutlined className='text-5xl' />, text: 'Free Cancellations' },
  ];

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
          <div className='text-3xl font-medium '>Our Awesome Features<span className='text-yellow-500'>.</span></div>
          <div className='text-sm text-gray-500
          sm:w-[600px]
        '>
            Explore top-tier service excellence with us. We're committed to ensuring your safety and satisfaction. Our affordable rates make luxury accessible, and our skilled drivers guarantee a stellar journey, any time.
          </div>
        </div>
        <div className='flex flex-wrap gap-8 justify-center'>

          {features.map((feature, index) => (
            <div key={index} className='flex items-center gap-2 text-zinc-600 w-40'>
              <div>
                {feature.icon}
              </div>
              <div className='font-semibold'>
                {feature.text}<span className='text-yellow-500'>.</span>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

const OurBenefitsList: React.FC = () => {

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
          <div className='text-3xl font-medium '>We Offer The Best For You<span className='text-yellow-500'>.</span></div>
          <div className='text-sm text-gray-500
            sm:w-[600px]
          '>
            Discover unmatched services tailored just for you. We prioritize your convenience and safety, delivering quality and reliability with every interaction. Experience excellence redefined.
          </div>
        </div>
        <div className='flex flex-wrap gap-8 justify-center'>
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
        </div>

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
          <div className='text-3xl font-medium '>Easy Step For Book Your Taxi<span className='text-yellow-500'>.</span></div>
          <div className='text-sm text-gray-500
            sm:w-[600px]
          '>
            Four simple steps to a smooth, stress-free taxi booking. We ensure a seamless experience from start to finish.
          </div>
        </div>
        <div className='w-full'>
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
        </div>
      </div>
    </>
  )
}

const WhatWeAreOffering: React.FC = () => {

  const services = [
    {
      icon: <EnvironmentOutlined className='text-5xl' />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description: "Book your ride with ease through our online platform, available 24/7 for your convenience."
    },
    {
      icon: <ArrowRightOutlined className='text-5xl' />,
      feature: "FEATURE - 02",
      title: "Onewaytrip",
      description: "Efficient and comfortable one-way trips to your desired destination, with no return trip required."
    },
    {
      icon: <SyncOutlined className='text-5xl' />,
      feature: "FEATURE - 03",
      title: "Roundtrip",
      description: "Convenient roundtrip services ensuring a seamless journey to your destination and back."
    },
    {
      icon: <ClockCircleOutlined className='text-5xl' />,
      feature: "FEATURE - 04",
      title: "Hourly Car Rental",
      description: "Flexible hourly car rental services tailored to meet your short-term travel needs."
    },
    {
      icon: <CarOutlined className='text-5xl' />,
      feature: "FEATURE - 05",
      title: "Airport Transfer",
      description: "Reliable airport transfer services for a stress-free journey to and from the airport."
    },
    {
      icon: <TeamOutlined className='text-5xl' />,
      feature: "FEATURE - 06",
      title: "Corporate Car Rental",
      description: "Professional corporate car rental services designed for business needs and executive travel."
    },
    {
      icon: <EnvironmentOutlined className='text-5xl' />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description: "Book your ride with ease through our online platform, available 24/7 for your convenience."
    },
    {
      icon: <ArrowRightOutlined className='text-5xl' />,
      feature: "FEATURE - 02",
      title: "Onewaytrip",
      description: "Efficient and comfortable one-way trips to your desired destination, with no return trip required."
    },
    {
      icon: <SyncOutlined className='text-5xl' />,
      feature: "FEATURE - 03",
      title: "Roundtrip",
      description: "Convenient roundtrip services ensuring a seamless journey to your destination and back."
    },
  ];

  const parentDivRef = useRef(null); // Step 1: Creating a ref
  const [gap, setGap] = useState(230); // Initialize with your default gap size

  const [translateX, setTranslateX] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('duration-700');
  const cardWidthIncludingGap = gap + 360; // This should include the card width plus any gap between cards
  const numberOfVisibleCards = 1; // Adjust based on how many cards you want visible at the end before reset
  const slideInterval = 2000; // Time interval for sliding effect

  useEffect(() => {
    // Calculate maxTranslate to stop before the reset
    const maxTranslate = -(services.length * cardWidthIncludingGap - window.innerWidth + cardWidthIncludingGap * numberOfVisibleCards);
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
  }, [services.length, cardWidthIncludingGap]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        console.log(width)

        const calculatedGap = 230 * ((width / 1600) * (width / 1600) / 2); 

        setGap(calculatedGap);
      }
    });

    if (parentDivRef.current) {
      resizeObserver.observe(parentDivRef.current);
    }

    return () => {
      if (parentDivRef.current) {
        resizeObserver.unobserve(parentDivRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className='space-y-12 py-20 bg-[#ff0000]' ref={parentDivRef}>
        <div className='text-center text-3xl font-medium'>
          What We Are Offering?
        </div>
        <div className='relative flex justify-center overflow-hidden'>
          <div className={`flex justify-items-center container ${transitionDuration}`}
            style={{ gap: `${gap}px`, transform: `translateX(${translateX}px)` }}
          >
            {services.map((service, index) => (
              <div className='service-card' key={index}>
                <ServiceCard
                  icon={service.icon}
                  feature={service.feature}
                  title={service.title}
                  description={service.description}
                />
              </div>
            ))}
          </div>
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
        <WhatWeAreOffering /> {/* // What Were Offering - about us sliding component section should be here */}
        <OurBenefitsList /> {/* Our Benifits List - https://preview.themeforest.net/item/taxico-taxi-company-online-cab-service-elementor-template-kit/full_screen_preview/34438955?_ga=2.197559599.1404235229.1707414958-1271169116.1697727807&_gac=1.124503416.1707415664.CjwKCAiAlJKuBhAdEiwAnZb7lTgzQ4xXO12_mageyJHHEzeZLKuUlDic0mk6CIbaxFw9S68pWfiWVhoCyl4QAvD_BwE */}
        <WhyChooseUs /> {/* Title:Our Experience SubTitle:We Are Experienced Since 1992 Until Now. https://themeholy.com/wordpress/taxiar/home-03/ */}
        <EasyStep />
        {/* <PopularPackages /> */}
      </div>
      <StatsAndTestamonials />
      <CallUsNow />
      <Footer />
    </>
  )
}

export default Home;