import React from 'react'

export const CallUsNow: React.FC = () => {
  return (
    <div className='bg-yellow-500 h-60'>
      <div className='flex flex-col justify-center items-center h-full space-y-3'>
        <div className='text-sm'>Call 24 Hour Service Available</div>
        <div className='text-2xl w-96 text-center font-medium
          md:text-3xl
        '>Call Now & Book Your Taxi For Your Next Ride</div>
        <a href="tel:+9211144490" className='text-xl font-medium hover:underline'>📞 (021) 111 444 90</a>
      </div>
    </div>
  )
}
