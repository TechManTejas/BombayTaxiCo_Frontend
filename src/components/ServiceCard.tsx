import React from "react";

const ServiceCard: React.FC<{}> = () => {
  return (
    <div className="border bg-white w-96  p-10">
      <img
        className="w-16 h-16"
        src="https://images.pexels.com/photos/7211201/pexels-photo-7211201.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
      />
      <h4 className="font-bold text-gray-400 text-sm mt-6">FEATURE - 01</h4>
      <h3 className="font-bold text-gray-800 mt-1">CITY TRANSPORT</h3>
      <p className="font-bold text-gray-400 text-sm mt-4">
        Monetize flexible action items before mission critical redibly intuitive
      </p>
      <button className="font-bold border text-gray-600 text-sm px-6 py-3 mt-5">READ DETAILS</button>
    </div>
  );
};

export default ServiceCard;
