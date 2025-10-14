/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { CallUsNow } from "../components/CallUsNow";
import { WhyChooseUsCard } from "../components/WhyChooseUsCard";
import {
  CarOutlined,
  DollarCircleOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import WeOffer1 from "../assets/images/Online easy booking.png";
import WeOffer2 from "../assets/images/One way trip.png";
import WeOffer3 from "../assets/images/Round trip.png";
import WeOffer4 from "../assets/images/Hourly Rental.png";
import WeOffer5 from "../assets/images/Airport.png";
import WeOffer6 from "../assets/images/corporate trip.png";
import HeroImage1 from "../assets/images/hero1.jpg";
import AboutImage from "../assets/images/about.jpg";
import { ServiceCard } from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { OnlineEasyBookingIcon } from "../icons/OnlineEasyBooking";
import { OneWayTripIcon } from "../icons/OneWayTripIcon";
import { RoundTripIcon } from "../icons/RoundTripIcon";
import { HourlyRentalIcon } from "../icons/HourlyRentalIcon";
import { AirportTransferIcon } from "../icons/AirportTransfer";
import { CorporateCarRentalIcon } from "../icons/CorporateCarRental";
import { ReadyToBook } from "../components/ReadyToBook";
import { DividerWithLogo } from "../components/DividerWithLogo";
import { DividerWithoutLogo } from "../components/DividerWithoutLogo";
import { FlexibleCancellation } from "../icons/FlexibleCancellation";
import { TransparentBilling } from "../icons/TransparentBilling";
import { TransparentBillingYellow } from "../icons/TransparentBillingYellow";
import { OurAchievement, StatsAndTestamonials } from "./Home";

const BreadCrumb: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-gray-700 container pt-6 flex space-x-1">
        <button
          className="hover:text-[#FDB813] hover:underline"
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

const Badge: React.FC = () => {
  return (
    <div
      className="rounded-3xl my-12"
      style={{
        backgroundImage: `url(${HeroImage1})`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#00000099] text-white space-y-1 rounded-3xl p-4 lg:p-24">
        <div className="text-center text-6xl font-bold">
          <span className="text-[#FDB813]">About</span> Us
          <span className="text-[#FDB813]">.</span>
        </div>
        <div className="text-center text-sm">
          Reliable, affordable taxi services for safe and comfortable journeys.
        </div>
      </div>
    </div>
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
            <div className="text-3xl font-bold">About Bombay Taxi Company</div>
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
    <div className="flex w-full justify-center">
      <div className="space-y-12 py-20 w-full container">
        <div className="text-center text-4xl">
          <div className="text-base pb-5 text-[#FDB813]">Why Choose Us?</div>
          <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
            Why Choose Bombay Taxi Company
            <span className="text-[#FDB813]">.</span>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-5 items-center justify-center
        "
        >
          {/* <WhyChooseUsCard
            icon={<UserOutlined />}
            title="Personalized Rides"
            description="Book our services and adjust according to your need."
          /> */}
          <div className="bg-[#FDB813] flex flex-col justify-center items-center hover:border-2 w-60 h-60 rounded-xl  hover:border-yellow-500 space-y-2 shadow hover:shadow-xl transition-all">
            <div className="bg-[#2A2A2A] text-2xl w-16 h-16 rounded-full flex text-white justify-center items-center mb-2">
              <UserOutlined className="text-[#FDB813]" />
            </div>
            <div className="text-xl font-medium">
              Personalized Rides<span className="text-[#FDB813]">.</span>
            </div>
            <div className="text-center text-sm w-48">
              Book our services and adjust according to your need.
            </div>
          </div>
          {/* <WhyChooseUsCard
            icon={<FlexibleCancellation />}
            title="Flexible Cancellation"
            description="Easy trip cancel through our user-friendly booking platform."
          /> */}
          <div className="bg-[#2A2A2A] flex flex-col justify-center items-center hover:border-2 w-60 h-60 rounded-xl  hover:border-yellow-500 space-y-2 shadow hover:shadow-xl transition-all text-white">
            <div className="bg-[#FDB813] text-2xl w-16 h-16 rounded-full flex text-white justify-center items-center mb-2">
              <FlexibleCancellation />
            </div>
            <div className="text-xl font-medium">
              Flexible Cancellation<span className="text-[#FDB813]">.</span>
            </div>
            <div className="text-center text-sm w-48">
              Easy trip cancel through our user-friendly booking platform.
            </div>
          </div>
          <WhyChooseUsCard
            icon={<TransparentBilling />}
            title="Transparent Billing"
            description="Competitive and budget-friendly prices for quality transportation."
          />
          {/* <WhyChooseUsCard
            icon={<CarOutlined />}
            title="Largest Fleet"
            description="Choose from our extensive fleet for your transportation needs."
          /> */}
          <div className="bg-[#FDB813] flex flex-col justify-center items-center hover:border-2 w-60 h-60 rounded-xl  hover:border-yellow-500 space-y-2 shadow hover:shadow-xl transition-all">
            <div className="bg-[#2A2A2A] text-2xl w-16 h-16 rounded-full flex text-white justify-center items-center mb-2">
              <CarOutlined className="text-[#FDB813]" />
            </div>
            <div className="text-xl font-medium">
              Largest Fleet<span className="text-[#FDB813]">.</span>
            </div>
            <div className="text-center text-sm w-48">
              Choose from our extensive fleet for your transportation needs.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EasyStep: React.FC = () => {
  return (
    <>
      <div className="space-y-24 py-20">
        <div
          className="flex flex-col justify-center items-center space-y-2 text-center
          px-4
          sm:px-6
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px:32
        "
        >
          <div className="text-base text-[#FDB813]">How We Work</div>
          <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
            Easy Step For Book Your Taxi
            <span className="text-[#FDB813]">.</span>
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
              <div className="h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center">
                <CarOutlined className="text-3xl text-[#FDB813]" />
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
              <div className="h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center border">
                <TransparentBillingYellow />
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
              <div className="h-20 w-20 bg-[#FDB813] rounded-2xl flex justify-center items-center">
                <UserOutlined className="text-3xl text-black" />
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
              <div className="h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center">
                <LikeOutlined className="text-3xl text-[#FDB813]" />
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
      icon: <OnlineEasyBookingIcon />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description:
        "Book your ride with ease through our online platform, available 24/7 for your convenience.",
      detailsUrl: "/",
      image: WeOffer1,
    },
    {
      icon: <OneWayTripIcon />,
      feature: "FEATURE - 02",
      title: "One-Way Trip",
      description:
        "Efficient and comfortable one-way trips to your desired destination, with no return trip required.",
      detailsUrl: "/",
      image: WeOffer2,
    },
    {
      icon: <RoundTripIcon />,
      feature: "FEATURE - 03",
      title: "Round Trip",
      description:
        "Convenient roundtrip services ensuring a seamless journey to your destination and back.",
      detailsUrl: "/",
      image: WeOffer3,
    },
    {
      icon: <HourlyRentalIcon />,
      feature: "FEATURE - 04",
      title: "Hourly Car Rental",
      description:
        "Flexible hourly car rental services tailored to meet your short-term travel needs.",
      detailsUrl: "/hourly-rental",
      image: WeOffer4,
    },
    {
      icon: <AirportTransferIcon />,
      feature: "FEATURE - 05",
      title: "Airport Transfer",
      description:
        "Reliable airport transfer services for a stress-free journey to and from the airport.",
      detailsUrl: "/",
      image: WeOffer5,
    },
    {
      icon: <CorporateCarRentalIcon />,
      feature: "FEATURE - 06",
      title: "Corporate Car Rental",
      description:
        "Professional corporate car rental services designed for business needs and executive travel.",
      detailsUrl: "/",
      image: WeOffer6,
    },
  ];

  const [translateX, setTranslateX] = useState(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

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
    <div className="">
      <div className="flex flex-col justify-center items-center text-center space-y-2 py-20">
        <div className="text-[#FDB813]">Ride In Comfort</div>
        <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
          We Make Your Every Trip Comfortable
          <span className="text-[#FDB813]">.</span>
        </div>
        <div className="text-[13px] text-gray-500 sm:w-[600px]">
          Discover unmatched services tailored just for you. We prioritize your
          convenience and safety, delivering quality and reliability with every
          interaction. Experience excellence redefined.
        </div>
        <div
          className="flex justify-center"
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="
            xl:w-[1240px]
            lg:w-[800px] 
            w-[360px]
          "
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className={`flex flex-wrap justify-center gap-8 mt-3`}>
              {services.map((service, index) => (
                <div className="service-card">
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
          </div>
        </div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <>
      <Container>
        <BreadCrumb />
        <Badge />
        <AboutBombayTaxiCompany />
      </Container>
      <WhyChooseUs />
      <Container>
        <DividerWithLogo />
      </Container>
      <EasyStep />
      <Container>
        <DividerWithoutLogo />
      </Container>
      <WhatWeAreOffering />
      <div className="lg:hidden">
        <OurAchievement />
        <DividerWithLogo />
        <StatsAndTestamonials />
      </div>
      <CallUsNow />
      <ReadyToBook />
      <Footer />
    </>
  );
};

export default About;
