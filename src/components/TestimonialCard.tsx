/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarFilled } from "@ant-design/icons";
import Quote from "../assets/images/quote.png";

// export const TestimonialCard:React.FC<{avatar: any, testimonialText: any, name: any, position?: any}> = ({ avatar, testimonialText, name, position }) => {
//   return (
//     <div className="flex-shrink-0 bg-white w-72 rounded-3xl flex flex-col p-8 space-y-4 shadow">
//       <div className="relative justify-center items-center">
//         {/* Conditionally render avatar if provided */}
//         <div className={`bg-yellow-500 h-16 w-16 rounded-full ${avatar ? 'bg-cover' : ''}`} style={{ backgroundImage: `url(${avatar})` }}>
//         </div>
//         <div className="absolute right-0 top-8">
//           <img src={Quote} className='rotate-180 h-12 -mt-10 opacity-10' alt="Quote" />
//         </div>
//       </div>
//       <div className="text-sm text-zinc-500 text-center">
//         {testimonialText}
//       </div>
//       <div className="text-center">
//         <div className="font-medium">{name}</div>
//         <div className="text-yellow-500 text-sm">{position}</div>
//       </div>
//     </div>
//   );
// };

export const TestimonialCard: React.FC<{
  avatar: any;
  testimonialText: any;
  name: any;
  position?: any;
}> = ({ avatar, testimonialText, name, position }) => {
  return (
    <div className="flex-shrink-0 bg-white w-80 rounded-3xl flex flex-col p-8 space-y-4 shadow" style={{ userSelect: 'none' }}>
      <div className="relative flex gap-1 mb-3">
        <StarFilled className="text-yellow-500"/>
        <StarFilled className="text-yellow-500"/>
        <StarFilled className="text-yellow-500"/>
        <StarFilled className="text-yellow-500"/>
        <StarFilled className="text-yellow-500"/>
        <div className="absolute top-14">
          <img src={Quote} className='rotate-180 h-12 -mt-10 opacity-10' alt="Quote" />
        </div>
      </div>
      <div className="text-sm">
        {testimonialText}
      </div>
      <div className="flex gap-2 items-center">
        <div className={`bg-yellow-500 h-16 w-16 rounded-full ${avatar ? "bg-cover" : ""}`}
          style={{ backgroundImage: `url(${avatar})` }}/>
          <div className="flex flex-col justify-evenly h-full py-1">
            <div className="font-bold text-sm">{name}</div>
            <div className="text-xs">{position}</div>
          </div>
      </div>
    </div>
  );
};
