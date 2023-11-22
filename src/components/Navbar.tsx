import React from "react";
import Logo from "../assets/images/logo.webp";

const Navbar: React.FC<{}> = () => {
  return (
    <>
      <div className="bg-[#2A2A2A]">
        <div className="container px-2 mx-auto flex justify-center md:justify-between py-4">
          <div className="hidden md:block">
            <p className="text-white">
              We Provide
              <span className="text-yellow-500 mx-1">
                The Best Service &amp; Discounts
              </span>
              for you
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
      <div className="container mx-auto">
        <nav className="bg-secondary rounded-xl drop-shadow flex justify-between items-center content-center">
          <h1 className="p-4 w-52 md:w-72">
            <span
              style={{
                boxSizing: "border-box",
                display: "block",
                overflow: "hidden",
                width: "initial",
                height: "initial",
                background: "none",
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: "relative",
              }}
            >
              <span
                style={{
                  boxSizing: "border-box",
                  display: "block",
                  width: "initial",
                  height: "initial",
                  background: "none",
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  paddingTop: "17.842323651452283%",
                }}
              />
              <img
                alt="Bombay Taxi Logo"
                src={Logo}
                decoding="async"
                data-nimg="responsive"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  boxSizing: "border-box",
                  padding: 0,
                  border: "none",
                  margin: "auto",
                  display: "block",
                  width: 0,
                  height: 0,
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100%",
                  maxHeight: "100%",
                }}
                sizes="100vw"
              />
              <noscript>
                &lt;img alt="Bombay Taxi Logo" sizes="100vw"
                srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=640&amp;amp;q=75
                640w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=750&amp;amp;q=75
                750w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=828&amp;amp;q=75
                828w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=1080&amp;amp;q=75
                1080w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=1200&amp;amp;q=75
                1200w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=1920&amp;amp;q=75
                1920w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=2048&amp;amp;q=75
                2048w,
                /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=3840&amp;amp;q=75
                3840w"
                src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-f.9e5f1ed1.png&amp;amp;w=3840&amp;amp;q=75"
                decoding="async" data-nimg="responsive"
                style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
                loading="lazy"/&gt;
              </noscript>
            </span>
          </h1>
          <div className="text-xl font-bold hidden md:block">LOGIN</div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
