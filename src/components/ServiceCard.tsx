import { ArrowRightOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Button } from "antd";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  icon: ReactNode;
  feature: string;
  title: string;
  description: string;
  detailsUrl: string;
  image: string;
}

// export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, feature, title, description, detailsUrl }) => {

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Function to handle redirection when "READ DETAILS" is clicked
//   const handleReadDetails = () => {
//     navigate(detailsUrl);
//     window.scroll(0, 0);
//   };

//   console.log(feature);

//   return (
//     <div className='bg-white w-[360px] h-[340px] p-8 space-y-6 rounded shadow select-none'>
//       <div className='w-20 h-20 bg-yellow-500 text-white rounded flex justify-center items-center text-3xl'>
//         {icon}
//       </div>
//       <div className='space-y-1'>
//         <div className='space-y-3'>
//           <div className='text-lg font-medium'>
//             {title}
//           </div>
//           <div className='text-zinc-500 h-[70px]'>
//             {description}
//           </div>
//           <div>
//             <Button className='h-12 w-40 font-bold bg-white' onClick={handleReadDetails}>
//               READ DETAILS
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  feature,
  title,
  description,
  detailsUrl,
  image
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle redirection when "READ DETAILS" is clicked
  const handleReadDetails = () => {
    navigate(detailsUrl);
    window.scroll(0, 0);
  };

  console.log(feature);

  return (
    <div className="relative w-[320px] h-[340px] select-none">
      <div className="absolute top-0 right-8 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center z-30">
        {icon}
      </div>
      <img src={image} className="absolute top-0 left-8 right-0 bg-zinc-200 h-[256px] rounded-3xl z-20"/>
      <div className="absolute bottom-0 left-0 right-0 bg-yellow-500 h-[160px] rounded-3xl mx-8 p-4 flex flex-col items-center justify-between z-30">
        <div className="font-semibold text-xl">{title}</div>
        <div className="text-center text-sm">{description}</div>
        <div className="text-xs hover:text-base transition-all cursor-pointer" onClick={handleReadDetails}>
          Learn More <ArrowRightOutlined className="" />
        </div>
      </div>
    </div>
  );
};
