import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "tailwindcss/tailwind.css";
import "./CallUsSticky.css"; 

const StickyCallUs = () => {
  const initiateCall = () => {
    window.location.href = "tel:+916262744744";
  };

  return (
    <div className="lg:hidden fixed top-1/3 right-0 transform translate-x-1/2 z-50">
      <div className="sticky-component flex items-center bg-white shadow-lg rounded-l-lg p-2 overflow-hidden">
        <div className="flex flex-col items-center justify-center h-40">
          <span className="flex items-center justify-center h-4 w-4 text-[#FDB813] rounded-full bounce-left-right">
            <ArrowRightOutlined />
          </span>
          <div className="flex flex-col items-center font-extrabold">
            {":SU LLAC".split("").map((char, index) => (
              <span
                key={index}
                className="transform font-bold -rotate-90 -mb-3"
              >
                {char === " " ? <div className="-my-0.5">&nbsp;</div> : char}
              </span>
            ))}
          </div>
          <span className="flex items-center justify-center h-8 w-8 bg-[#FDB813] text-white rounded-full mt-3">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              color="#ffffff"
              style={{ color: "#ffffff" }}
              height="1.2rem"
              width="1.2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </span>
        </div>
        <Button className="ml-3 font-semibold focus:outline-none" onClick={initiateCall}>
          +91 6262-744-744
        </Button>
      </div>
    </div>
  );
};

// Add export alias for test compatibility
const CallUsSticky = StickyCallUs;
export default CallUsSticky;
