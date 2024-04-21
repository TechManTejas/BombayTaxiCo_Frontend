/* eslint-disable @typescript-eslint/no-explicit-any */
import Quote from "../assets/images/quote.png"

export const TestimonialCard:React.FC<{avatar: any, testimonialText: any, name: any, position?: any}> = ({ avatar, testimonialText, name, position }) => {
  return (
    <div className="flex-shrink-0 bg-white w-72 rounded-3xl flex flex-col p-8 space-y-4 shadow">
      <div className="relative justify-center items-center">
        {/* Conditionally render avatar if provided */}
        {/* <div className={`bg-yellow-500 h-16 w-16 rounded-full ${avatar ? 'bg-cover' : ''}`} style={{ backgroundImage: `url(${avatar})` }}>
        </div> */}
        <div className="absolute right-0 top-8">
          <img src={Quote} className='rotate-180 h-12 -mt-10 opacity-10' alt="Quote" />
        </div>
      </div>
      <div className="text-sm text-zinc-500 text-center">
        {testimonialText}
      </div>
      <div className="text-center">
        <div className="font-medium">{name}</div>
        <div className="text-yellow-500 text-sm">{position}</div>
      </div>
    </div>
  );
};