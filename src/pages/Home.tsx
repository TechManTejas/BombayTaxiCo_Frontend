import React from 'react';
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="bg-[#2A2A2A]">
        <div className="container px-2 mx-auto flex justify-center md:justify-between py-4">
          <div className="hidden md:block">
            <p className="text-white">
              We Provide{/* */}
              <span className="text-yellow-500 mx-1">
                The Best Service &amp; Discounts
              </span>
              for you{/* */}
            </p>
          </div>
          <div>
            <div className="inline-block mr-4">
              <a
                href="mailto:support@bombaytaxicompany.com"
                className="inline-block text-sm align-middle text-white hover-desktop:hover:underline"
              >
                <span className="inline-block mr-1 align-middle">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    color="#FDB813"
                    style={{ color: "#FDB813" }}
                    height="1.2rem"
                    width="1.2rem"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </span>
                <span>
                  {" "}
                  {/* */}support@bombaytaxicompany.com{/* */} {/* */}
                </span>
              </a>
            </div>
            <div className="inline-block">
              <a
                href="tel:+91-6262-744-744"
                className="inline-block text-sm align-middle text-white hover-desktop:hover:underline"
              >
                <span className="inline-block align-middle">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    color="#FDB813"
                    style={{ color: "#FDB813" }}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
