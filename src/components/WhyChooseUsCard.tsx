import { ReactNode } from 'react'; 
interface WhyChooseUsCardProps {
  icon: ReactNode; 
  title: string;
  description: string;
}

export const WhyChooseUsCard: React.FC<WhyChooseUsCardProps> = ({ icon, title, description }) => {
  return (
    <>
        <div className='bg-white flex flex-col justify-center items-center hover:border-2 w-60 h-60 rounded-xl  hover:border-yellow-500 space-y-1 shadow hover:shadow-xl transition-all'>
            <div className='bg-[#2A2A2A] text-2xl w-16 h-16 rounded-full flex text-white justify-center items-center'>
              {icon}  
            </div>
            <div className='text-xl font-medium'>
                {title}<span className='text-[#FDB813]'>.</span>
            </div>
            <div className='text-center text-sm w-48'>
                {description}
            </div>
        </div>
    </>
  )
}
