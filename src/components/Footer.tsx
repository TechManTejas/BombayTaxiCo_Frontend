import React from 'react'
import { FacebookFilled, TwitterOutlined, InstagramOutlined, FacebookOutlined, ArrowRightOutlined, PhoneFilled, MailFilled, EnvironmentFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-[#2A2A2A] flex justify-center w-ful py-12'>
      <div className='container px-6'>
        <div className='flex justify-between
          flex-col space-y-6
          lg:flex-row lg:space-y-0
        '>
          {/* ABOUT COMPANY  */}
          <div className='space-y-6 w-96'>
            <div className='space-y-2'>
              <div className='text-white font-medium text-2xl'>
                ABOUT COMPANY
              </div>
              <div className='w-20 border border-yellow-500'></div>
            </div>
            <div className='text-zinc-500'>
              Centric applications productize front end vortals visualize front end isite results and value added globally for simplify alternative systems without cross-platform models.
            </div>
            <div className='flex space-x-2'>
              <button className='h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-yellow-500 flex justify-center items-center'>
                <FacebookFilled />
              </button>
              <button className='h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-yellow-500 flex justify-center items-center'>
                <TwitterOutlined />
              </button>
              <button className='h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-yellow-500 flex justify-center items-center'>
                <InstagramOutlined />
              </button>
              <button className='h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-yellow-500 flex justify-center items-center'>
                <FacebookOutlined />
              </button>
            </div>
          </div>
          {/* QUICK LINK */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <div className='text-white font-medium text-2xl'>
                QUICK LINK
              </div>
              <div className='w-20 border border-yellow-500'></div>
            </div>
            <div className='text-zinc-500 space-y-3'>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {

              }}>
                <ArrowRightOutlined />
                <div>Attach Your Taxi</div>
              </button>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {
                navigate("/about")
                window.scrollTo(0, 0);
              }}>
                <ArrowRightOutlined />
                <div>About Us</div>
              </button>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {
                navigate("/contact")
                window.scrollTo(0, 0);
              }}>
                <ArrowRightOutlined />
                <div>Contact Us</div>
              </button>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {
                
              }}>
                <ArrowRightOutlined />
                <div>FAQs</div>
              </button>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {

              }}>
                <ArrowRightOutlined />
                <div>Cancellation Policy</div>
              </button>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {

              }}>
                <ArrowRightOutlined />
                <div>Terms & Conditions</div>
              </button>
              <button className='flex items-center space-x-3 hover:text-yellow-500 transition-all' onClick={() => {

              }}>
                <ArrowRightOutlined />
                <div>Privacy Policy</div>
              </button>
            </div>
          </div>
          {/* CONTACT DETAILS */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <div className='text-white font-medium text-2xl'>
                CONTACT DETAILS
              </div>
              <div className='w-20 border border-yellow-500'></div>
            </div>
            <div className='text-zinc-500 space-y-5'>
              <div className='space-y-1'>
                <div className='text-sm text-white font-medium'>
                  PHONE NUMBER
                </div>
                <div className='flex space-x-2'>
                  <div className='h-6 w-6 bg-yellow-500 text-[#2A2A2A] text-xs flex justify-center items-center rounded'>
                    <PhoneFilled />
                  </div>
                  <a href="tel:+9211144490" className='text-zinc-500 hover:text-yellow-500 hover:underline'>
                    +468 254 762 443
                  </a>
                </div>
              </div>
              <div className='space-y-1'>
                <div className='text-sm text-white font-medium'>
                  EMAIL ADDRESS
                </div>
                <div className='flex space-x-2'>
                  <div className='h-6 w-6 bg-yellow-500 text-[#2A2A2A] text-xs flex justify-center items-center rounded'>
                    <MailFilled />
                  </div>
                  <div className='text-zinc-500'>
                    info@taxiar.com
                  </div>
                </div>
              </div>
              <div className='space-y-1'>
                <div className='text-sm text-white font-medium'>
                  OFFICE LOCATION
                </div>
                <div className='flex space-x-2'>
                  <div className='h-6 w-6 bg-yellow-500 text-[#2A2A2A] text-xs flex justify-center items-center rounded'>
                    <EnvironmentFilled />
                  </div>
                  <div className='text-zinc-500'>
                    25 Street, 145 City Road New Town DD14, USA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
