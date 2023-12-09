import React from 'react';
import { Footer } from '../components/Footer';
import { CallUsNow } from '../components/CallUsNow';
import { WhyChooseUsCard } from '../components/WhyChooseUsCard';

const AboutBombayTaxiCompany: React.FC = () => {
  return (
    <>
      <div className='space-y-12 py-20 bg-[#F5F5F5] flex px-20'>
        <div className='w-1/2 mt-14'>
          <div className='h-96 space-y-8'>
            <div className='text-3xl font-medium'>
              Services We offer
            </div>
            <div>
              We have been providing the best transportation service for over 7 years.
              We offer one-way taxi, outstation taxi, local, corporate car hire, airport
              transfer and bus service
              <br />
              <br />
              Bombay Taxi Company is an experienced and ready-to-ride premium car
              rental service with the most affordable and competitive prices in India.
              We are always looking for new ideas to improve our service for new and
              long-term customers. Bombay Taxi Company is always at the forefront of
              improving customer service and adopting new ideas and features to make
              our customers happy while they are with us.
              <br />
              <br />
              We have a large fleet of company-owned vehicles & our tenant’s vehicles,
              Which are all highly maintained & with latest features which gives the best
              experience of the ride to our valuable customers.
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <div className='w-full h-96 bg-yellow-500 rounded-xl'></div>
        </div>
      </div>
    </>
  )
}

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

const EasyStep: React.FC = () => {
  return (
    <>
      <div className='space-y-24 my-20'>
        <div className='flex flex-col justify-center items-center space-y-3'>
          <div className='text-3xl font-medium '>Easy Step For Book Your Taxi<span className='text-yellow-500'>.</span></div>
          <div className=' text-center text-sm w-[600px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua erat libero condimentum metus.</div>
        </div>
        <div>
          <div className='flex justify-center w-full -mb-10'>
            <div className='border border-dashed flex justify-center w-[440px]' />
          </div>
          <div className='flex items-center justify-center'>
            <div className='w-56 flex flex-col justify-center items-center space-y-2'>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl'>

              </div>
              <div className='text-xl'>
                Booking A Taxi
              </div>
              <div className='text-gray-400 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2'>
              <div className='h-20 w-20 bg-[#ffffff] rounded-2xl shadow-2xl'>

              </div>
              <div className='text-xl'>
                Get a Driver
              </div>
              <div className='text-gray-400 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2'>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl'>

              </div>
              <div className='text-xl'>
                Enjoy Your Ride
              </div>
              <div className='text-gray-400 text-sm text-center'>
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
      <div className='space-y-12 py-20 bg-[#F5F5F5] h-[600px]'>
        <div className='text-center text-3xl font-medium'>
          Services We offer
        </div>
      </div>
    </>
  )
}

const About: React.FC = () => {
  return (
    <>
      <AboutBombayTaxiCompany />
      <WhyChooseUs />
      <EasyStep />
      <ServiceWeOffer />
      <CallUsNow />
      <Footer />
    </>
  );
};

export default About;
