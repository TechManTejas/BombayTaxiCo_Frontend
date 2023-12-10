import React from 'react';
import { CallUsNow } from '../components/CallUsNow';
import { Footer } from '../components/Footer';
import { Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const Cards: React.FC = () => {

  return (
    <div className='flex flex-wrap justify-center items-center py-16'>
      <div className='p-4 rounded-3xl bg-white m-8 w-[272px] h-[232px]'>
        <div className='p-3 border-t-[3px] border-r-[3px] rounded-r-3xl border-yellow-500'>
          <div className='flex flex-col justify-center items-center space-y-3'>
            <div className='absolute -mt-48 w-[236px] h-[10px]' style={{
              borderTop: "3px solid",
              borderImage: "linear-gradient(to right, #fff 70%, transparent 30%) 100% 0"
            }} />
            <div className='h-20 w-20 bg-yellow-500 rounded-full'></div>
            <div className='font-black text-2xl'>Office Address</div>
            <div className='font-medium '>25/B Milford, New York, USA</div>
          </div>
        </div>
      </div >
      <div className='p-4 rounded-3xl bg-white m-8 w-[272px] h-[232px]'>
        <div className='p-3 border-t-[3px] border-r-[3px] rounded-r-3xl border-yellow-500'>
          <div className='flex flex-col justify-center items-center space-y-3'>
            <div className='absolute -mt-48 w-[236px] h-[10px]' style={{
              borderTop: "3px solid",
              borderImage: "linear-gradient(to right, #fff 70%, transparent 30%) 100% 0"
            }} />
            <div className='h-20 w-20 bg-yellow-500 rounded-full'></div>
            <div className='font-black text-2xl'>Call Us</div>
            <div className='font-medium '>+2 123 4565 789</div>
          </div>
        </div>
      </div >
      <div className='p-4 rounded-3xl bg-white m-8 w-[272px] h-[232px]'>
        <div className='p-3 border-t-[3px] border-r-[3px] rounded-r-3xl border-yellow-500'>
          <div className='flex flex-col justify-center items-center space-y-3'>
            <div className='absolute -mt-48 w-[236px] h-[10px]' style={{
              borderTop: "3px solid",
              borderImage: "linear-gradient(to right, #fff 70%, transparent 30%) 100% 0"
            }} />
            <div className='h-20 w-20 bg-yellow-500 rounded-full'></div>
            <div className='font-black text-2xl'>Email Us</div>
            <div className='font-medium '>info@example.com</div>
          </div>
        </div>
      </div >
      <div className='p-4 rounded-3xl bg-white m-8 w-[282px] h-[232px]'>
        <div className='p-3 border-t-[3px] border-r-[3px] rounded-r-3xl border-yellow-500'>
          <div className='flex flex-col justify-center items-center space-y-3'>
            <div className='absolute -mt-48 w-[246px] h-[10px]' style={{
              borderTop: "3px solid",
              borderImage: "linear-gradient(to right, #fff 70%, transparent 30%) 100% 0"
            }} />
            <div className='h-20 w-20 bg-yellow-500 rounded-full'></div>
            <div className='font-black text-2xl'>Open Timing</div>
            <div className='font-medium '>Mon - Sat (10.00AM - 5.30PM)</div>
          </div>
        </div>
      </div >
    </div>
  )
}

const GetInTouch: React.FC = () => {
  return (
    <>
      <div className='flex justify-center items-center mb-32 px-32 space-x-12 bg-white p-4 rounded-lg'>
        <div className='w-[640px] h-[600px] bg-yellow-500 rounded-3xl rounded-r-full rounded-b-full p-4'>
          <div className='w-full h-[570px] bg-white rounded-r-full rounded-b-full p-4'>
            <div className='w-full h-[540px] bg-gray-500 rounded-r-full rounded-b-full p-4'>

            </div>
          </div>
        </div>
        <div className='w-[720px]'>
          <div className='space-y-3'>
            <div className='text-3xl font-bold'>Get In Touch</div>
            <div className='text-gray-500'>It is a long established face that a reader will be distracted by th readable content of a page randomised words slighty when looking at this layout</div>
          </div>
          <div className='w-full my-8'>
            <div className='flex w-full space-x-8'>
              <div className='w-full'><Input className='rounded-lg text-lg h-12' placeholder='Your Name'></Input></div>
              <div className='w-full'><Input className='rounded-lg text-lg h-12' placeholder='Your Email'></Input></div>
            </div>
            <div className='my-8'>
              <Input className='rounded-lg text-lg h-12' placeholder='Your Subject'></Input>
            </div>
            <div>
              <TextArea style={{height: "160px"}} className='text-lg' placeholder='Write Your Message'></TextArea>
            </div>
          </div>
          <div className='my-8'>
            <Button className='font-black rounded-3xl h-12 w-40 bg-yellow-500'>
              SEND MESSAGE
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const Map: React.FC = () => {
  return (
    <>
      <div style={{ width: '100%', height: '400px' }}>
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: '0' }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224497.57524876792!2d-74.0061!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903f1db3a33%3A0xfbc8881b500713e9!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1619584178044!5m2!1sen!2sus"
          allowFullScreen
        ></iframe>
      </div>
    </>
  )
}

const Contact: React.FC = () => {
  return (
    <div className='bg-[#F5F5F5]'>
      <Cards />
      <GetInTouch />
      <Map />
      <CallUsNow />
      <Footer />
    </div>
  );
};

export default Contact;
