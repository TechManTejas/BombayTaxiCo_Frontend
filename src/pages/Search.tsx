import { SwapOutlined } from '@ant-design/icons';
import React from 'react';
import { Footer } from '../components/Footer';

const Search: React.FC = () => {
  return (
    <div>
      <div className='p-6'>
        <div className='flex justify-center'>
          <div className='h-20 bg-[#2A2A2A] rounded-xl'>
            <div className='flex items-center h-full py-2'>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[220px]'>
                <div className='text-yellow-500'>TRIP TYPE</div>
                <div className='text-white'>One Way Trip</div>
              </div>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[140px]'>
                <div className='text-yellow-500'>FROM</div>
                <div className='text-white'>Mumbai</div>
              </div>

              <div>
                <SwapOutlined className='text-white' />
              </div>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[140px]'>
                <div className='text-yellow-500'>TO</div>
                <div className='text-white'>Pune</div>
              </div>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[140px]'>
                <div className='text-yellow-500'>PICKUP DATE</div>
                <div className='text-white'>3 May 2023</div>
              </div>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[140px]'>
                <div className='text-yellow-500'>RETURN DATE</div>
                <div className='text-white'>13 May 2023</div>
              </div>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[140px]'>
                <div className='text-yellow-500'>PICKUP TIME</div>
                <div className='text-white'>10:00</div>
              </div>

              <div className='bg-[#404040] m-2 p-2 rounded-lg w-[140px]'>
                <div className='text-yellow-500'>DROP TIME</div>
                <div className='text-white'>24:00</div>
              </div>

              <button className='bg-yellow-500 hover:bg-yellow-400 m-2 p-2 rounded-lg w-[180px] h-full flex justify-center items-center text-xl font-medium'>
                SEARCH
              </button>

            </div>
          </div>
        </div>
      </div>
      <div className='p-6 flex justify-center h-[720px]'>
        <div className=' w-[1380px] flex space-x-6'>
          <div className='w-[30%]'>

            <div>
              <div className='text-xl my-1'>Fare Details</div>
              <div className='font-light space-y-1'>
                <div className='flex justify-between'>
                  <div>Base Fare</div>
                  <div>Included</div>
                </div>
                <div className='flex justify-between'>
                  <div>GST(5% on Base Fare)</div>
                  <div>Not Included</div>
                </div>
                <div className='flex justify-between'>
                  <div>State, Toll Tax</div>
                  <div>Included</div>
                </div>
                <div className='flex justify-between'>
                  <div>Vehicles & Fuel Charges</div>
                  <div>148KM</div>
                </div>
                <div className='flex justify-between'>
                  <div>One Pickup & Drop</div>
                  <div>Included</div>
                </div>
              </div>
            </div>
            <hr className='my-3' />
            <div>
              <div className='text-xl my-1'>Other Charges</div>
              <div className='font-light space-y-1'>
                <div className='flex justify-between'>
                  <div>Parking & Airport Entry</div>
                  <div>If Applicable</div>
                </div>
                <div className='flex justify-between'>
                  <div>Waiting Charges</div>
                  <div>₹2/Min</div>
                </div>
                <div className='flex justify-between'>
                  <div>Night Charges <br /> (11 PM & 6 AM)</div>
                  <div>₹250/Day</div>
                </div>
                <div className='flex justify-between'>
                  <div>Extra Pickup/Drop</div>
                  <div>₹99</div>
                </div>
              </div>
            </div>
            <hr className='my-3' />
            <div>
              <div className='text-xl my-1'>Other Charges</div>
              <div className='font-light space-y-1'>
                <div className='flex justify-between'>
                  <div>Economy</div>
                  <div>₹15/KM</div>
                </div>
                <div className='flex justify-between'>
                  <div>Comfort</div>
                  <div>₹15/KM</div>
                </div>
                <div className='flex justify-between'>
                  <div>Premium</div>
                  <div>₹15/KM</div>
                </div>
              </div>
            </div>

          </div>
          <div className='w-[70%] space-y-6'>
            <div className='border-2 w-full flex rounded-lg p-4'>
              <div className='h-40 w-48 bg-gray-300 rounded-lg' />
              <div className='flex justify-between w-full mx-4'>
                <div className='space-y-3'>
                  <div>
                    <div className='text-2xl font-semibold'>Economy</div>
                    <div>Indica / Wagonr Or Similar</div>
                  </div>
                  <div className='space-y-1'>
                    <div className='text-sm font-medium'>CAR FEATURES</div>
                    <div className='flex'>
                      <div className='space-y-1'>
                        <div className='tracking-wider w-36'>
                          AC
                        </div>
                        <div className='tracking-wider w-36'>
                          4 Seater
                        </div>
                      </div>
                      <div className='space-y-1'>
                        <div className='tracking-wider w-36'>
                          2 Bags
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-end space-y-3'>
                  <div className='text-end my-1'>
                    <div className='font-bold text-yellow-500'>13% OFF</div>
                    <div className='space-x-3'>
                      <span className='font-semibold' style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}>
                        ₹3404
                      </span>
                      <span className='text-2xl font-bold'>
                        ₹3304
                      </span>
                    </div>
                    <div className='text-xl font-light'>
                      Inclusive Of Toll & Sate Tax
                    </div>
                  </div>
                  <div>
                    <button className='bg-yellow-500 hover:bg-yellow-400 p-2 rounded-lg w-[180px] h-full flex justify-center items-center text-xl font-medium'>
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-2 w-full flex rounded-lg p-4'>
              <div className='h-40 w-48 bg-gray-300 rounded-lg' />
              <div className='flex justify-between w-full mx-4'>
                <div className='space-y-3'>
                  <div>
                    <div className='text-2xl font-semibold'>Economy</div>
                    <div>Indica / Wagonr Or Similar</div>
                  </div>
                  <div className='space-y-1'>
                    <div className='text-sm font-medium'>CAR FEATURES</div>
                    <div className='flex'>
                      <div className='space-y-1'>
                        <div className='tracking-wider w-36'>
                          AC
                        </div>
                        <div className='tracking-wider w-36'>
                          4 Seater
                        </div>
                      </div>
                      <div className='space-y-1'>
                        <div className='tracking-wider w-36'>
                          2 Bags
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-end space-y-3'>
                  <div className='text-end my-1'>
                    <div className='font-bold text-yellow-500'>13% OFF</div>
                    <div className='space-x-3'>
                      <span className='font-semibold' style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}>
                        ₹3404
                      </span>
                      <span className='text-2xl font-bold'>
                        ₹3304
                      </span>
                    </div>
                    <div className='text-xl font-light'>
                      Inclusive Of Toll & Sate Tax
                    </div>
                  </div>
                  <div>
                    <button className='bg-yellow-500 hover:bg-yellow-400 p-2 rounded-lg w-[180px] h-full flex justify-center items-center text-xl font-medium'>
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default Search;
