import React from 'react'

export const CallUsNow: React.FC = () => {
  return (
    <div className='bg-yellow-500 h-60'>
      <div className='flex flex-col justify-center items-center h-full space-y-3'>
        <div className='text-sm'>Call 24 Hour Service Available</div>
        <div className='text-4xl  text-center font-medium
          md:text-5xl md:w-[600px]
        '>Call Now & Book Your Taxi For Your Next Ride</div>
        <a href="tel:+916262744744" className='text-xl font-medium hover:underline'>📞 +91-6262-744-744</a>
      </div>
    </div>
  )
}
