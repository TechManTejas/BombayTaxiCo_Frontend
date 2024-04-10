/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { CallUsNow } from "../components/CallUsNow";
import { WhyChooseUsCard } from "../components/WhyChooseUsCard";
import {
  ArrowRightOutlined,
  CarOutlined,
  ClockCircleOutlined,
  DollarCircleOutlined,
  EnvironmentOutlined,
  LikeOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import AboutImage from "../assets/images/about.jpg";
import { ServiceCard } from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";

const BreadCrumb: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-gray-700 container py-6 flex space-x-1">
        <button
          className="hover:text-yellow-500 hover:underline"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <div>{">"} About Us</div>
      </div>
    </>
  );
};

const AboutBombayTaxiCompany: React.FC = () => {
  return (
    <>
      <div className="pb-20 flex justify-center w-full">
        <div
          className="flex flex-col justify-center items-center container
          xl:flex-row
        "
        >
          <div
            className="space-y-6 
            w-full
            xl:h-[400px]
            xl:w-1/2
          "
          >
            <div className="text-3xl font-medium">
              About Bombay Taxi Company
            </div>
            <div className="text-gray-700">
              We have been providing the best transportation service for over 7
              years. We offer one-way taxi, outstation taxi, local, corporate
              car hire, airport transfer and bus service
              <br />
              <br />
              Bombay Taxi Company is an experienced and ready-to-ride premium
              car rental service with the most affordable and competitive prices
              in India. We are always looking for new ideas to improve our
              service for new and long-term customers. Bombay Taxi Company is
              always at the forefront of improving customer service and adopting
              new ideas and features to make our customers happy while they are
              with us.
              <br />
              <br />
              We have a large fleet of company-owned vehicles & our tenant’s
              vehicles, Which are all highly maintained & with latest features
              which gives the best experience of the ride to our valuable
              customers.
            </div>
          </div>
          <div className="m-3" />
          <div
            className="rounded-lg flex
            xl:h-[400px] 
          "
          >
            <img src={AboutImage} className="rounded-lg" />
          </div>
        </div>
      </div>
    </>
  );
};

const WhyChooseUs: React.FC = () => {
  return (
    <>
      <div className="space-y-12 py-20 bg-[#F5F5F5]">
        <div className="text-center text-3xl font-medium">Why Choose Us?</div>
        <div
          className="grid grid-cols-1 items-center justify-items-center
          sm:grid-cols-2
          xl:grid-cols-4
        "
        >
          <WhyChooseUsCard
            icon={<UserOutlined />}
            title="Professional Drivers"
            description="Experienced Staff & Professionally trained Chauffers"
          />
          <WhyChooseUsCard
            icon={<CarOutlined />}
            title="Quality Car"
            description="Luxurious and well-maintained vehicles for your comfort."
          />
          <WhyChooseUsCard
            icon={<DollarCircleOutlined />}
            title="Affordable Pricing"
            description="Competitive and budget-friendly prices for quality transportation."
          />
          <WhyChooseUsCard
            icon={<CarOutlined />}
            title="Largest Fleet"
            description="Choose from our extensive fleet for your transportation needs."
          />
        </div>
      </div>
    </>
  );
};

const EasyStep: React.FC = () => {
  return (
    <>
      <div className="space-y-24 py-20">
        <div
          className="flex flex-col justify-center items-center space-y-3 text-center
          px-4
          sm:px-6
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px:32
        "
        >
          <div className="text-3xl font-medium ">
            Easy Step For Book Your Taxi
            <span className="text-yellow-500">.</span>
          </div>
          <div
            className="text-sm text-gray-500
            sm:w-[600px]
          "
          >
            Four simple steps to a smooth, stress-free taxi booking. We ensure a
            seamless experience from start to finish.
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-center -mb-10">
            <div
              className="border border-dashed  justify-center w-[600px]
              hidden
              sm:flex
            "
            />
          </div>
          <div
            className="flex flex-col items-center justify-center
            sm:flex-row
          "
          >
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl">
                <CarOutlined className="text-3xl text-yellow-500" />
              </div>
              <div className="text-xl">Booking A Taxi</div>
              <div className="text-gray-500 text-sm text-center">
                Choose your pickup and destination.
              </div>
            </div>
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center shadow-2xl">
                <DollarCircleOutlined className="text-3xl text-yellow-500" />
              </div>
              <div className="text-xl">Pay Your Taxi</div>
              <div className="text-gray-500 text-sm text-center">
                Safe and secure payment options for you.
              </div>
            </div>
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center shadow-2xl">
                <UserOutlined className="text-3xl text-yellow-500" />
              </div>
              <div className="text-xl">Get a Driver</div>
              <div className="text-gray-500 text-sm text-center">
                Match with a skilled local driver for you.
              </div>
            </div>
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl">
                <LikeOutlined className="text-3xl text-yellow-500" />
              </div>
              <div className="text-xl">Enjoy Your Ride</div>
              <div className="text-gray-500 text-sm text-center">
                R elax in comfort to your destination.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WhatWeAreOffering: React.FC = () => {

  const services = [
    {
      icon: <EnvironmentOutlined className='text-5xl' />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description: "Book your ride with ease through our online platform, available 24/7 for your convenience.",
      detailsUrl: '/'
    },
    {
      icon: <ArrowRightOutlined className='text-5xl' />,
      feature: "FEATURE - 02",
      title: "Onewaytrip",
      description: "Efficient and comfortable one-way trips to your desired destination, with no return trip required.",
      detailsUrl: '/'
    },
    {
      icon: <SyncOutlined className='text-5xl' />,
      feature: "FEATURE - 03",
      title: "Roundtrip",
      description: "Convenient roundtrip services ensuring a seamless journey to your destination and back.",
      detailsUrl: '/'
    },
    {
      icon: <ClockCircleOutlined className='text-5xl' />,
      feature: "FEATURE - 04",
      title: "Hourly Car Rental",
      description: "Flexible hourly car rental services tailored to meet your short-term travel needs.",
      detailsUrl: '/hourly-rental'
    },
    {
      icon: <CarOutlined className='text-5xl' />,
      feature: "FEATURE - 05",
      title: "Airport Transfer",
      description: "Reliable airport transfer services for a stress-free journey to and from the airport.",
      detailsUrl: '/'
    },
    {
      icon: <TeamOutlined className='text-5xl' />,
      feature: "FEATURE - 06",
      title: "Corporate Car Rental",
      description: "Professional corporate car rental services designed for business needs and executive travel.",
      detailsUrl: '/'
    },
    {
      icon: <EnvironmentOutlined className='text-5xl' />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description: "Book your ride with ease through our online platform, available 24/7 for your convenience.",
      detailsUrl: '/'
    },
    {
      icon: <ArrowRightOutlined className='text-5xl' />,
      feature: "FEATURE - 02",
      title: "Onewaytrip",
      description: "Efficient and comfortable one-way trips to your desired destination, with no return trip required.",
      detailsUrl: '/one-way-trip'
    },
    {
      icon: <SyncOutlined className='text-5xl' />,
      feature: "FEATURE - 03",
      title: "Roundtrip",
      description: "Convenient roundtrip services ensuring a seamless journey to your destination and back.",
      detailsUrl: '/'
    },
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

  useEffect(() => {
    if (!isHovering) {
      // Only run the interval if not hovering
      const maxTranslate = -(services.length * cardWidthIncludingGap - window.innerWidth + cardWidthIncludingGap * numberOfVisibleCards);
      const interval = setInterval(() => {
        if (!isDragging) { // Pause sliding if dragging
          setTranslateX(currentTranslate => {
            const newTranslate = currentTranslate - cardWidthIncludingGap;
            if (newTranslate < maxTranslate) {
              setTransitionDuration('duration-0');
              setTimeout(() => setTransitionDuration('duration-700'), 50);
              return 0;
            }
            return newTranslate;
          });
        }
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [services.length, cardWidthIncludingGap, isHovering, isDragging]);

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
        <div className='text-center text-3xl font-medium'>
          What We Are Offering?
        </div>
        <div 
          className='flex justify-center'
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className='relative overflow-hidden
            xl:w-[1240px]
            lg:w-[800px] 
            w-[360px]
          '
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          >
            <div className={`flex justify-items-center gap-20 ${transitionDuration}`}
              style={{ transform: `translateX(${translateX}px)` }}
            >
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
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const About: React.FC = () => {
  return (
    <>
      <div
        className="
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
        "
      >
        <BreadCrumb />
        <AboutBombayTaxiCompany />
      </div>
      <WhyChooseUs />
      <EasyStep />
      <WhatWeAreOffering />
      <CallUsNow />
      <Footer />
    </>
  );
};

export default About;
