import { Button } from 'antd';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  icon: ReactNode; 
  feature: string;
  title: string;
  description: string;
  detailsUrl: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, feature, title, description, detailsUrl }) => {

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle redirection when "READ DETAILS" is clicked
  const handleReadDetails = () => {
    navigate(detailsUrl);
    window.scroll(0, 0);
  };

  console.log(feature);

  return (
    <div className='bg-white w-[360px] h-[340px] p-8 space-y-6 rounded shadow'>
      <div className='w-20 h-20 bg-yellow-500 text-white rounded flex justify-center items-center text-3xl'>
        {icon}
      </div>
      <div className='space-y-1'>
        <div className='space-y-3'>
          <div className='text-lg font-medium'>
            {title}
          </div>
          <div className='text-zinc-500 h-[70px]'>
            {description}
          </div>
          <div>
            <Button className='h-12 w-40 font-bold bg-white' onClick={handleReadDetails}>
              READ DETAILS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
