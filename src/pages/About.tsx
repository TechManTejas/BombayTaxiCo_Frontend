import React from "react";
import ServiceCard from "../components/ServiceCard";

const About: React.FC<{}> = () => {
  return (
    <div>

      <div className="flex justify-center align-top px-28 py-20">
        <div>
          <h2 className="text-2xl font-bold">About Bombay Taxi Company</h2>
          <div className="w-11/12">
            <p className="text-sm mt-4">
              We have been providing the best transportation service for over 7
              years. We offer one way taxi, outstation taxi, local, corporate
              car here, airport transfer and bus service
            </p>
            <p className="text-sm mt-4">
              Bombay Taxi Company is an experienced and ready-to-ride premium
              car rental service with the most affordable and competitive prices
              in India. We are always looking for new ideas to improve our
              service for new and long-term customers. Bombay Taxi Company is
              always the forefront of improving customer service and adopting
              new ideas and features to make our customers happy while they are
              with us.
            </p>
            <p className="text-sm mt-4">
              We have a large fleet of company-owned vehicles & our tenant's
              vehicles, Which are all highly maintained & with latest features
              which gives the best experience of the ride to our valuable
              customers.
            </p>
          </div>
        </div>
        <img className="w-96 rounded-md" src="https://images.pexels.com/photos/8247/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
      </div>

      <div className="py-20 bg-gray-100">

        <div className="flex items-center justify-around">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        </div>

      </div>

      <div className="bg-amber-400 text-center py-14">
        <h6 className="text-gray-800 text-sm font-semibold mb-2">
          Call 24 hour available service
        </h6>
        <h2 className="text-gray-800 text-3xl font-bold">
          Call Now & Book Your Taxi
        </h2>
        <h2 className="text-gray-800 text-3xl font-bold">
          For Your Next Ride.
        </h2>
        <h3 className="flex items-center justify-center mt-6">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            color="#2A2A2A"
            height="36px"
            width="36px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zm-16.39 307.37l-15 65A15 15 0 0 1 354 416C194 416 64 286.29 64 126a15.7 15.7 0 0 1 11.63-14.61l65-15A18.23 18.23 0 0 1 144 96a16.27 16.27 0 0 1 13.79 9.09l30 70A17.9 17.9 0 0 1 189 181a17 17 0 0 1-5.5 11.61l-37.89 31a231.91 231.91 0 0 0 110.78 110.78l31-37.89A17 17 0 0 1 299 291a17.85 17.85 0 0 1 5.91 1.21l70 30A16.25 16.25 0 0 1 384 336a17.41 17.41 0 0 1-.39 3.37z"></path>
          </svg>
          <p className="text-gray-800 font-bold text-2xl ml-1">
            (021) 111 444 90
          </p>
        </h3>
      </div>

    </div>
  );
};

export default About;
