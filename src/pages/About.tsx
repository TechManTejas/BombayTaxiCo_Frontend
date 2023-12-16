import React from 'react';
import { Footer } from '../components/Footer';
import { CallUsNow } from '../components/CallUsNow';
import { WhyChooseUsCard } from '../components/WhyChooseUsCard';
import { ArrowLeftOutlined, ArrowRightOutlined, CarOutlined, CarryOutOutlined, DollarCircleOutlined, LikeOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';

import AboutImage from "../assets/images/about.jpg"
import { ServiceCard } from '../components/ServiceCard';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const BreadCrumb: React.FC = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className='text-gray-700 container py-6 flex space-x-1'>
        <button className='hover:text-yellow-500 hover:underline' onClick={()=>{
          navigate("/")
        }}>
          Home 
        </button>
        <div>
        {'>'} About Us
        </div>
      </div>
    </>
  )
}

const AboutBombayTaxiCompany: React.FC = () => {
  return (
    <>
      <div className='pb-20 flex justify-center w-full'>
        <div className='flex flex-col justify-center items-center container
          xl:flex-row
        '>
          <div className='space-y-6 
            w-full
            xl:h-[400px]
            xl:w-1/2
          '>
            <div className='text-3xl font-medium'>
              About Bombay Taxi Company
            </div>
            <div className='text-gray-700'>
              We have been providing the best transportation service for over 7 years.
              We offer one-way taxi, outstation taxi, local, corporate car hire, airport
              transfer and bus service
              <br /><br />
              Bombay Taxi Company is an experienced and ready-to-ride premium car
              rental service with the most affordable and competitive prices in India.
              We are always looking for new ideas to improve our service for new and
              long-term customers. Bombay Taxi Company is always at the forefront of
              improving customer service and adopting new ideas and features to make
              our customers happy while they are with us.
              <br /><br />
              We have a large fleet of company-owned vehicles & our tenant’s vehicles,
              Which are all highly maintained & with latest features which gives the best
              experience of the ride to our valuable customers.
            </div>
          </div>
          <div className='m-3' />
          <div className='rounded-lg flex
            xl:h-[400px] 
          '>
            <img src={AboutImage} className='rounded-lg' />
          </div>
        </div>
      </div>
    </>
  )
}

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat libero condimentum metus.
          </div>
        </div>
        <div className='w-full'>
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
        </div>
      </div>
    </>
  )
}

const ServiceWeOffer: React.FC = () => {
  return (
    <>
      <div className='space-y-12 py-20 bg-[#F5F5F5]'>
        <div className='text-center text-3xl font-medium'>
          Services We offer
        </div>
        <div className='flex justify-center '>
          <div className='grid grid-cols-1 justify-items-center container
            lg:grid-cols-3
          '>
            <ServiceCard
              icon={<CarOutlined />}
              feature="FEATURE - 01"
              title="AIRPORT TRANSFERS"
              description="Monetize flexible action items before mission critical redibly intuitive."
            />
            <ServiceCard
              icon={<CarryOutOutlined />}
              feature="FEATURE - 02"
              title="BUSINESS TRANSFERS"
              description="Monetize flexible action items before mission critical redibly intuitive."
            />
            <ServiceCard
              icon={<TrophyOutlined />}
              feature="FEATURE - 03"
              title="EVENTS & WEDDING"
              description="Monetize flexible action items before mission critical redibly intuitive."
            />
          </div>
        </div>
        <div className='flex w-full justify-center space-x-6 my-3'>
          <div className='shadow-xl'>
            <Button size='large' icon={<ArrowLeftOutlined />} className='bg-white border-white' />
          </div>
          <div className='shadow-xl'>
            <Button size='large' icon={<ArrowRightOutlined />} className='bg-white border-white' />
          </div>
        </div>
      </div>
    </>
  )
}

const About: React.FC = () => {
  return (
    <>
      <div className='
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
        '>
        <BreadCrumb />
        <AboutBombayTaxiCompany />
        <WhyChooseUs />
      </div>
      <EasyStep />
      <ServiceWeOffer />
      <CallUsNow />
      <Footer />
    </>
  );
};

export default About;
