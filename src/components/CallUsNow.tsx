import { PhoneFilled } from '@ant-design/icons'
import { motion } from 'framer-motion';
import React from 'react'

export const CallUsNow: React.FC = () => {
  
  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className='bg-yellow-500 h-60'>
      <motion.div
    initial="hidden"
    whileInView="visible"
    variants={zoomIn}
    viewport={{ once: true, amount: 0.5 }} className='flex flex-col justify-center items-center h-full space-y-3'>
        <div className='text-sm'>Call 24 Hour Service Available</div>
        <div className='text-4xl  text-center font-medium
          md:text-5xl md:w-[600px]
        '>Call Now & Book Your Taxi For Your Next Ride</div>
        <a href="tel:+916262744744" className='text-xl font-medium hover:underline'><span> <PhoneFilled className='text'/> </span> +91-6262-744-744</a>
      </motion.div>
    </div>
  )
}
