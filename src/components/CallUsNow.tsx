import { motion } from "framer-motion";
import React from "react";

export const CallUsNow: React.FC = () => {
  const zoomIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="hidden bg-[#FDB813] h-60">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={zoomIn}
        viewport={{ once: true, amount: 0.5 }}
        className="flex flex-col justify-center items-center h-full space-y-3"
      >
        <div className="text-sm">Call 24 Hour Service Available</div>
        <div
          className="text-4xl  text-center font-medium
          md:text-5xl md:w-[600px]
        "
        >
          Call Now & Book Your Taxi For Your Next Ride
        </div>
        <a
          href="tel:+916262744744"
          className="text-xl font-medium hover:underline hover:text-yellow-200 flex items-center gap-1 transition-colors"
        >
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              color="#FDB813"
              style={{ color: "#000" }}
              height="1.2rem"
              width="1.2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </span>
          <span>+91-6262-744-744</span>
        </a>
      </motion.div>
    </div>
  );
};
