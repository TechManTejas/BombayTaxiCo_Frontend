/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AndroidFilled,
  AppleFilled,
  BankOutlined,
  CarOutlined,
  CompassOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  EnvironmentFilled,
  LikeOutlined,
  MobileOutlined,
  MoneyCollectOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DatePicker, Dropdown, MenuProps, Segmented, message } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import axios from "../api/axios";
import { ICity } from "../types/citys.types";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { Footer } from "../components/Footer";
import { CallUsNow } from "../components/CallUsNow";
import { WhyChooseUsCard } from "../components/WhyChooseUsCard";
import HeroImage1 from "../assets/images/Banner.png";
import WeOffer1 from "../assets/images/Online easy booking.png";
import WeOffer2 from "../assets/images/One way trip.png";
import WeOffer3 from "../assets/images/Round trip.png";
import WeOffer4 from "../assets/images/Hourly Rental.png";
import WeOffer5 from "../assets/images/Airport.png";
import WeOffer6 from "../assets/images/corporate trip.png";
import Experience from "../assets/images/experience.jpg";
import { generateTimeOptions } from "../utils/GenerateTimeOptions";
import { generateDistanceOptions } from "../utils/GenerateDistanceOptions";
import { ServiceCard } from "../components/ServiceCard";
import { useIntersectionObserver } from "../components/UseIntersectionObserver.jsx";
import { TestimonialCard } from "../components/TestimonialCard.js";
import { RoundTripIcon } from "../icons/RoundTripIcon.js";
import { OneWayTripIcon } from "../icons/OneWayTripIcon.js";
import { HourlyRentalIcon } from "../icons/HourlyRentalIcon.js";
import "../css/Fade.css";
import "../css/NoScrollbar.css";
// import { BestVehiclesFleetIcon } from "../icons/BestVehiclesFleet.js";
import { RoadTripsDoneIcon } from "../icons/RoadTripsDone.js";
import { PeopleDroppedIcon } from "../icons/PeopleDropped.js";
import { SatisfiedClientIcon } from "../icons/SatisfiedClient.js";

import QuickSupport from "../assets/images/24-7 Quick Support.png";
import SafetyGaurantee from "../assets/images/100 Safety Guarantee.png";
import AffordablePricing from "../assets/images/Affordable Pricing.png";
import BestDealsDiscounts from "../assets/images/Best Deals & Discounts.png";
import BestQualityFleet from "../assets/images/Best Quality Fleet.png";
import PremiumServices from "../assets/images/Premium Services.png";
import ProfessionalExpertDrivers from "../assets/images/Professional Expert Drivers.png";
import Man from "../assets/images/man.png";
import Woman from "../assets/images/woman.png";
import { OnlineEasyBookingIcon } from "../icons/OnlineEasyBooking.js";
import { AirportTransferIcon } from "../icons/AirportTransfer.js";
import { CorporateCarRentalIcon } from "../icons/CorporateCarRental.js";
import { FaCalendarAlt, FaClock, FaRupeeSign } from "react-icons/fa";
import { ReadyToBook } from "../components/ReadyToBook.js";
import { From } from "../icons/From.js";
import { DividerWithLogo } from "../components/DividerWithLogo.js";
import { DividerWithoutLogo } from "../components/DividerWithoutLogo.js";
import { Swap } from "../icons/Swap.js";
import { TransparentBilling } from "../icons/TransparentBilling.js";
import { FlexibleCancellation } from "../icons/FlexibleCancellation.js";
import { TransparentBillingYellow } from "../icons/TransparentBillingYellow.js";

message.config({
  top: "25%",
  duration: 2,
  maxCount: 3,
  prefixCls: "my-message",
});

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const [pickupCity, setPickupCity] = useState<string>("");
  const [pickupCityId, setPickupCityId] = useState<string | null>(null);
  const [from, setFrom] = useState<string>("");
  const [fromId, setFromId] = useState<string | null>(null);
  const [to, setTo] = useState("");
  const [toId, setToId] = useState<string | null>(null);
  const [pickupDateOpen, setPickupDateOpen] = useState<boolean>(false);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs());
  const [returnDateOpen, setReturnDateOpen] = useState<boolean>(false);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(
    dayjs().add(1, "day")
  );

  const [pickupTime, setPickupTime] = useState<string>("");
  const [hourlyPackage, setHourlyPackage] = useState<string>("8 hr 80 kms");

  const [activeTab, setActiveTab] = useState("One-Way Trip");
  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    const timeOptions = generateTimeOptions(pickupDate ?? dayjs());
    if (timeOptions.length === 0) {
      // No time options available, shift to the next day
      const nextDay = (pickupDate ?? dayjs()).add(1, "day");
      setPickupDate(nextDay);
      setPickupTime(generateTimeOptions(nextDay)[0]?.label ?? "");
    } else {
      setPickupTime(timeOptions[0]?.label ?? "");
    }
  }, [pickupDate]);

  const togglePickupDatePicker = () => {
    setPickupDateOpen(!pickupDateOpen);
  };

  const toggleReturnDatePicker = () => {
    setReturnDateOpen(!returnDateOpen);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleMenuClickPickupCity = (e: any) => {
    setPickupCity(
      cities.find((c: ICity) => c._id === e.key)?.name ?? "Select an Option"
    );
    setPickupCityId(e.key);
  };

  const handleMenuClickFrom = (e: any) => {
    setFrom(
      cities.find((c: ICity) => c._id === e.key)?.name ?? "Select an Option"
    );
    setFromId(e.key);
  };

  const handleMenuClickTo = (e: any) => {
    setTo(
      cities.find((c: ICity) => c._id === e.key)?.name ?? "Select an Option"
    );
    setToId(e.key);
  };

  const handleMenuClickTime = (e: any) => {
    setPickupTime(e.key);
  };

  const handleMenuClickPackage = (e: any) => {
    setHourlyPackage(e.key);
  };

  const handlePickupDateChange = (date: Dayjs | null, dateString: string) => {
    console.log("Selected Date:", dateString);
    if (date) {
      setPickupDate(date);
      if (
        !returnDate ||
        returnDate.isBefore(date, "day") ||
        returnDate.isSame(date, "day")
      ) {
        setReturnDate(date.add(1, "day"));
      }
      // togglePickupDatePicker()
    }
  };

  const handleReturnDateChange = (date: Dayjs | null, dateString: string) => {
    console.log("Selected Return Date:", dateString);
    if (date) {
      if (pickupDate && date.isBefore(pickupDate, "day")) {
        setReturnDate(pickupDate.add(1, "day"));
        message.warning("Return date cannot be before the pickup date.");
      } else {
        setReturnDate(date);
      }
      // toggleReturnDatePicker();
    }
  };

  const menuCities: MenuProps["items"] = cities.map((city: ICity) => ({
    label: city.name,
    key: city._id,
  }));

  const menuTime: MenuProps["items"] = generateTimeOptions(
    pickupDate ?? dayjs()
  ).map((option) => ({
    label: option.label,
    key: option.key,
  }));

  const menuDistance: MenuProps["items"] = generateDistanceOptions();

  const menuPropsPickupCity = {
    items: cities.map((city: ICity) => ({
      label: (
        <div className="flex items-center">
            <div>{<From />}</div>
            <div>{city.name}</div>
          </div>
      ),
      key: city._id,
    })),
    onClick: handleMenuClickPickupCity,
  };

  const menuPropsFrom = {
    items: cities
      .filter((city: ICity) => city._id !== toId)
      .map((city: ICity) => ({
        label: (
          <div className="flex items-center">
            <div>{<From />}</div>
            <div>{city.name}</div>
          </div>
        ),
        key: city._id,
      })),
    onClick: handleMenuClickFrom,
  };

  const menuPropsTo = {
    items: cities
      .filter((city: ICity) => city._id !== fromId)
      .map((city: ICity) => ({
        label: (
          <span>
            {<EnvironmentFilled />} {city.name}
          </span>
        ),
        key: city._id,
      })),
    onClick: handleMenuClickTo,
  };

  const menuPropsTime = {
    items: menuTime,
    onClick: handleMenuClickTime,
    style: { height: "300px", overflow: "auto" },
  };

  const menuPropsDistance = {
    items: menuDistance,
    onClick: handleMenuClickPackage,
    style: { overflow: "auto" },
  };

  const switchValues = () => {
    setFrom((prevFrom) => {
      const tempFrom = prevFrom;
      setFrom(to);
      setTo(tempFrom);

      const tempFromId = fromId;
      setFromId(toId);
      setToId(tempFromId);

      return to;
    });
  };

  const handleLetsRideClick = () => {
    if (activeTab !== "Hourly Rental") {
      if (!from || !to) {
        // Prompt the user to select FROM and TO cities
        message.warning(
          "Please select both FROM and TO cities before proceeding."
        );
        return;
      }
    }

    if (activeTab === "Hourly Rental") {
      if (!pickupCity) {
        // Prompt the user to select FROM and TO cities
        message.warning("Please select city before proceeding.");
        return;
      }
    }

    const state = {
      pickupCity,
      pickupCityId,
      hourlyPackage,
      from,
      fromId,
      to,
      toId,
      pickupDate: pickupDate?.format("YYYY-MM-DD"),
      pickupTime,
      returnDate: returnDate?.format("YYYY-MM-DD"),
      activeTab,
    };

    // Navigate to the search page or perform other actions
    navigate("/search", { state: state });
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/citys", {
          params: {
            filter: JSON.stringify({ status: "Active" }),
          },
        });
        // Assuming the cities are available in an array under the 'cities' key in the response
        const fetchedCities = response.data.citys || [];
        console.log(response.data.citys);

        setCities(fetchedCities);

        // Set initial values for from and to based on the first two cities
        // if (fetchedCities.length > 0) {
        //   setFrom(fetchedCities[0].name);
        //   setFromId(fetchedCities[0]._id);

        //   setTo(fetchedCities[1].name);
        //   setToId(fetchedCities[1]._id);

        //   setPickupCity(fetchedCities[1].name);
        //   setPickupCityId(fetchedCities[1]._id);
        // }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${HeroImage1})`,
          backgroundSize: "cover",
        }}
      >
        <div className="bg-[#00000000] h-full w-full flex flex-col justify-center items-center space-y-8 pt-8">
          {/* <!-- Rotating Text Container --> */}
          <div
            className="lg:w-[1036px]
          "
          >
            <div className="h-16 lg:h-max text-center space-y-4">
              <div className="text-[#FDB813]">Welcome to Bombay Taxi Co.</div>
              <div className="text-[1.6rem] lg:text-[3.2rem] font-bold text-white">
                Enjoy Your Comfortable Trip
                <span className="text-[#FDB813]">.</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-[370px]">
            <div className="rounded-2xl bg-white shadow-lg -mb-16 lg:-mb-6 z-10 border border-yellow-500">
              <Segmented
                value={activeTab}
                className="rounded-2xl p-1"
                onChange={(value) => {
                  handleTabChange(value.toString());
                }}
                options={[
                  {
                    label: (
                      <div className="lg:text-lg m-2">
                        <div className="flex items-center">
                          <div className="hidden">
                            <OneWayTripIcon />
                          </div>
                          <span className="-mx-1.5 lg:mx-2">One-Way Trip</span>
                        </div>
                      </div>
                    ),
                    value: "One-Way Trip",
                  },
                  {
                    label: (
                      <div className="lg:text-lg m-2">
                        <div className="flex items-center">
                          <div className="hidden">
                            <RoundTripIcon />
                          </div>
                          <span className="-mx-1.5 lg:mx-2">Round Trip</span>
                        </div>
                      </div>
                    ),
                    value: "Round Trip",
                  },
                  {
                    label: (
                      <div className="lg:text-lg m-2">
                        <div className="flex items-center">
                          <div className="hidden">
                            <HourlyRentalIcon />
                          </div>
                          <span className="-mx-1.5 lg:mx-2">Hourly Rental</span>
                        </div>
                      </div>
                    ),
                    value: "Hourly Rental",
                  },
                ]}
              />
            </div>
            <div
              className="bg-white rounded-3xl -mb-6 flex justify-center items-center shadow-lg py-8 px-6 pt-20 lg:pt-8
              lg:px-6
            "
            >
              <div
                className="w-full rounded gap-2
                lg:flex
              "
              >
                {activeTab === "Hourly Rental" && (
                  <div className="group w-full lg:w-[330px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[#FDB813] transition-all duration-300">
                    <div className="text-xs flex items-center gap-1">
                      {" "}
                      <From />
                      <div className="-ml-2">
                      PICKUP LOCATION
                      </div>
                    </div>
                    <Dropdown
                      menu={menuPropsPickupCity}
                      placement="bottomLeft"
                      className="w-full"
                    >
                      <button
                        className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300 w-full text-left"
                        style={{
                          border: "none",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {pickupCity || "Select City"}
                      </button>
                    </Dropdown>
                  </div>
                )}
                {activeTab !== "Hourly Rental" && (
                  <div className="lg:flex gap-2 relative">
                    {
                      <>
                        <div className="hidden absolute w-full h-full lg:flex justify-center items-center">
                          <button
                            className="bg-white z-30 border rounded-xl border-yellow-500"
                            onClick={switchValues}
                          >
                            <div className="border rounded-xl p-1 text-xl hover:bg-gray-200 shadow-lg">
                              <Swap />
                            </div>
                          </button>
                        </div>
                      </>
                    }
                    <div className="group w-[328px] lg:w-[228px]  p-3 pb-4 space-y-1 border-2 rounded-xl z-20 hover:border-[#FDB813] transition-all duration-300">
                      <div className="text-xs flex items-center gap-1">
                        <From />
                        <div className="-ml-2">
                          FROM
                        </div>
                      </div>
                      <Dropdown
                        menu={menuPropsFrom}
                        placement="bottomLeft"
                        className="w-full"
                      >
                        <button
                          className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300 w-full text-left"
                          style={{
                            border: "none",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {from || "Select City"}
                        </button>
                      </Dropdown>
                    </div>

                    <div className="group w-full lg:w-[228px] p-3 pb-4 space-y-1 border-2 rounded-xl z-20 hover:border-[#FDB813] transition-all duration-300">
                      <div className="text-xs flex items-center gap-1">
                        <EnvironmentFilled />
                        TO
                      </div>
                      <Dropdown
                        menu={menuPropsTo}
                        placement="bottomLeft"
                        className="w-full"
                      >
                        <button
                          className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300 w-full text-left"
                          style={{
                            border: "none",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {to || "Select City"}
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                )}
                <div className="group relative w-full lg:w-[164px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[#FDB813] transition-all duration-300">
                  <div className="text-xs flex items-center gap-1">
                    <FaCalendarAlt />
                    PICKUP DATE
                  </div>
                  <button
                    className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300"
                    onClick={togglePickupDatePicker}
                  >
                    {pickupDate?.format("D MMM") ?? (
                      <button className="border p-1 rounded-lg bg-gray-100 text-base">
                        select a pickup date
                      </button>
                    )}{" "}
                    <span className="text-base">
                      {pickupDate?.format("YYYY")}
                    </span>
                  </button>
                  <DatePicker
                    className="absolute bottom-0 left-0 w-0 h-0"
                    style={{
                      visibility: "hidden",
                    }}
                    open={pickupDateOpen}
                    onOpenChange={(open) => setPickupDateOpen(open)}
                    onChange={handlePickupDateChange}
                    disabledDate={(current: Dayjs | null) =>
                      current
                        ? current.isBefore(dayjs().startOf("day")) ||
                          current.isAfter(dayjs().add(90, "days"))
                        : false
                    }
                    // Highlight Sundays using dateRender
                    dateRender={(currentDate) => {
                      const isSunday = currentDate.day() === 0; // 0 represents Sunday in dayjs
                      return (
                        <div
                          className={`ant-picker-cell-inner ${
                            isSunday ? "bg-[#FDB813]" : ""
                          }`}
                        >
                          {currentDate.date()}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="group w-full lg:w-[164px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[rgb(253,184,19)] transition-all duration-300">
                  <div className="text-xs flex items-center gap-1">
                    {" "}
                    <FaClock />
                    PICKUP TIME
                  </div>
                  <Dropdown menu={menuPropsTime} placement="bottomLeft">
                    <button
                      className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300"
                      style={{ border: "none" }}
                    >
                      {pickupTime || "Select a Time"}
                    </button>
                  </Dropdown>
                </div>
                {activeTab !== "Hourly Rental" && (
                  <div className="group relative w-full lg:w-[166px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[rgb(253,184,19)] transition-all duration-300">
                    <div className="text-xs flex items-center gap-1">
                      {" "}
                      <FaClock />
                      RETURN DATE
                    </div>
                    <div>
                      {activeTab === "Round Trip" ? (
                        <>
                          <button
                            className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300"
                            onClick={toggleReturnDatePicker}
                          >
                            {returnDate?.format("D MMM") ?? (
                              <button className="border p-1 rounded-lg bg-gray-100 text-base">
                                select a pickup date
                              </button>
                            )}{" "}
                            <span className="text-base">
                              {returnDate?.format("YYYY")}
                            </span>
                          </button>
                          <DatePicker
                            className="absolute bottom-0 left-0 w-0 h-0"
                            style={{
                              visibility: "hidden",
                            }}
                            open={returnDateOpen}
                            onOpenChange={(open) => setReturnDateOpen(open)}
                            onChange={handleReturnDateChange}
                            disabledDate={(current: Dayjs | null) =>
                              current
                                ? current.isBefore(pickupDate, "day") ||
                                  current.isAfter(dayjs().add(90, "days"))
                                : false
                            }
                            dateRender={(currentDate) => {
                              const isSunday = currentDate.day() === 0; // 0 represents Sunday in dayjs
                              return (
                                <div
                                  className={`ant-picker-cell-inner ${
                                    isSunday ? "bg-[#FDB813]" : ""
                                  }`}
                                >
                                  {currentDate.date()}
                                </div>
                              );
                            }}
                          />
                        </>
                      ) : (
                        <>
                          <button
                            className="text-xs text-left group-hover:text-[#FDB813] md:absolute"
                            onClick={() => setActiveTab("Round Trip")}
                          >
                            Add return date for bigger discount
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
                {activeTab === "Hourly Rental" && (
                  <div>
                    <div className="group w-[328px] lg:w-[300px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[rgb(253,184,19)] transition-all duration-300">
                      <div className="text-xs flex items-center gap-1">
                        {" "}
                        <CompassOutlined />
                        SELECT PACKAGE
                      </div>
                      <Dropdown menu={menuPropsDistance} placement="bottomLeft">
                        <button
                          className="text-[1.4rem] group-hover:text-[#FDB813] transition-all duration-300"
                          style={{ border: "none" }}
                        >
                          {hourlyPackage || "Select a Time"}
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button
                className="text-sm lg:text-base bg-[#FDB813] hover:bg-yellow-400 text-black font-semibold w-32 lg:w-40 h-12 rounded-lg border-yellow-500 z-10"
                onClick={handleLetsRideClick}
              >
                SEE TAXI FARE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WhyChooseUs: React.FC = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="space-y-12 py-20 w-full container">
        <div className="text-center text-4xl">
          <div className="text-base pb-5 text-[#FDB813]">Why Choose Us?</div>
          <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
            Why Choose Bombay Taxi Company
            <span className="text-[#FDB813]">.</span>
          </div>
        </div>
        <div
          className="flex flex-wrap gap-5 items-center justify-center
        "
        >
          <WhyChooseUsCard
            icon={<UserOutlined />}
            title="Personalized Rides"
            description="Book our services and adjust according to your need."
          />
          <WhyChooseUsCard
            icon={<FlexibleCancellation />}
            title="Flexible Cancellation"
            description="Easy trip cancel through our user-friendly booking platform."
          />
          <WhyChooseUsCard
            icon={<TransparentBilling />}
            title="Transparent Billing"
            description="Competitive and budget-friendly prices for quality transportation."
          />
          <WhyChooseUsCard
            icon={<CarOutlined />}
            title="Largest Fleet"
            description="Choose from our extensive fleet for your transportation needs."
          />
        </div>
      </div>
    </div>
  );
};

// const PopularPackages: React.FC = () => {

//   const packageData = [
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Agra To',
//       destinations: [
//         { name: 'New Delhi', distance: '552km (6hr 53min)' },
//         { name: 'Gurgoan', distance: '552km (6hr 53min)' },
//         { name: 'Noida', distance: '552km (6hr 53min)' },
//         { name: 'Faridabad', distance: '552km (6hr 53min)' },
//         { name: 'Ghaziabad', distance: '552km (6hr 53min)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Delhi To',
//       destinations: [
//         { name: 'Agra', distance: '200km (3hr 30min)' },
//         { name: 'Shimla', distance: '350km (7hr)' },
//         { name: 'Manali', distance: '500km (10hr)' },
//         { name: 'Amritsar', distance: '450km (6hr 30min)' },
//         { name: 'Dehradun', distance: '250km (5hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Mumbai To',
//       destinations: [
//         { name: 'Goa', distance: '600km (10hr)' },
//         { name: 'Pune', distance: '150km (3hr)' },
//         { name: 'Nashik', distance: '180km (4hr)' },
//         { name: 'Shirdi', distance: '250km (5hr)' },
//         { name: 'Lonavala', distance: '80km (2hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Bangalore To',
//       destinations: [
//         { name: 'Mysuru', distance: '150km (3hr)' },
//         { name: 'Chennai', distance: '350km (6hr)' },
//         { name: 'Ooty', distance: '300km (6hr 30min)' },
//         { name: 'Coorg', distance: '250km (5hr)' },
//         { name: 'Hampi', distance: '340km (7hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Kolkata To',
//       destinations: [
//         { name: 'Digha', distance: '180km (4hr)' },
//         { name: 'Darjeeling', distance: '600km (12hr)' },
//         { name: 'Sundarbans', distance: '100km (2hr 30min)' },
//         { name: 'Puri', distance: '500km (10hr)' },
//         { name: 'Bodh Gaya', distance: '550km (11hr)' },
//       ],
//     },
//     {
//       imageUrl: TajMahal,
//       title: 'Cabs From Chennai To',
//       destinations: [
//         { name: 'Pondicherry', distance: '160km (3hr)' },
//         { name: 'Mahabalipuram', distance: '60km (1hr 30min)' },
//         { name: 'Kanchipuram', distance: '70km (2hr)' },
//         { name: 'Tirupati', distance: '130km (3hr)' },
//         { name: 'Vellore', distance: '140km (3hr 30min)' },
//       ],
//     },
//   ];

//   return (
//     <>
//       <div className='space-y-12 py-20'>
//         <div className='text-center text-3xl font-medium'>
//           Popular Packages
//         </div>
//         <div className='grid grid-cols-1 items-center justify-items-center
//           lg:grid-cols-2
//           xl:grid-cols-3
//         '>
//           {packageData.map((packageInfo, index) => (
//             <PackageCard key={index} {...packageInfo} />
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }

const OurAchievement: React.FC = () => {
  const [isVisible, elementRef] = useIntersectionObserver({});
  const [stats, setStats] = useState({
    fleet: 0,
    trips: 0,
    dropped: 0,
    satisfied: 0,
  });
  const finalStats = {
    fleet: 32002,
    trips: 16008,
    dropped: 17068,
    satisfied: 19508,
  };

  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        setStats((prevStats) => ({
          fleet:
            prevStats.fleet < finalStats.fleet
              ? prevStats.fleet + Math.ceil(finalStats.fleet / 300)
              : finalStats.fleet,
          trips:
            prevStats.trips < finalStats.trips
              ? prevStats.trips + Math.ceil(finalStats.trips / 300)
              : finalStats.trips,
          dropped:
            prevStats.dropped < finalStats.dropped
              ? prevStats.dropped + Math.ceil(finalStats.dropped / 300)
              : finalStats.dropped,
          satisfied:
            prevStats.satisfied < finalStats.satisfied
              ? prevStats.satisfied + Math.ceil(finalStats.satisfied / 300)
              : finalStats.satisfied,
        }));
      }, 5);

      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  return (
    <div ref={elementRef} className="my-24">
      <div className="flex justify-center">
        <div
          className="rounded-3xl"
          style={{
            backgroundImage: `url(${Experience})`,
            backgroundSize: "cover",
          }}
        >
          <div className="px-14 p-12 py-24 bg-blue-950 bg-opacity-70 rounded-3xl flex flex-col gap-6">
            <div className="text-center">
              <div className="text-base text-[#FDB813] pb-5">
                Our Experience
              </div>
              <div className="text-3xl lg:text-4xl text-white font-extrabold ">
                We Are Experienced Since 2022 Until Now
                <span className="text-[#FDB813]">.</span>
              </div>
            </div>
            <div className="flex flex-wrap md:flex md:flex-nowrap justify-center md:justify-between gap-24">
              {/* <div className="text-center md:text-left flex flex-col gap-3 w-60 mt-8">
                <div className="flex justify-center md:justify-start items-center gap-5">
                  <div className="flex justify-center w-16 h-16 bg-[#FDB813] rounded-full">
                    <BestVehiclesFleetIcon />
                  </div>
                  <div className="text-3xl lg:text-5xl font-black text-white">
                    {stats.fleet}
                  </div>
                </div>
                <div className="text-white font-bold text-xl lg:text-2xl text-center">
                  Best Vehicles Fleet
                </div>
              </div> */}

              <div className="text-center md:text-left flex flex-col gap-3 w-60 mt-8">
                <div className="flex justify-center md:justify-start items-center gap-5">
                  <div className="flex justify-center w-16 h-16 bg-[#FDB813] rounded-full">
                    <RoadTripsDoneIcon />
                  </div>
                  <div className="text-3xl lg:text-5xl font-black text-white">
                    {stats.trips}
                  </div>
                </div>
                <div className="text-white text-xl lg:text-2xl text-center">
                  Road Trips Done
                </div>
                {/* <div className="text-xs lg:text-sm text-white">
                  Lorem ipsum dolor sit amet, leo consectetur adipiscing elit
                  Ut.
                </div> */}
              </div>

              <div className="text-center md:text-left flex flex-col gap-3 w-60 mt-8">
                <div className="flex justify-center md:justify-start items-center gap-5">
                  <div className="flex justify-center w-16 h-16 bg-[#FDB813] rounded-full">
                    <PeopleDroppedIcon />
                  </div>
                  <div className="text-3xl lg:text-5xl font-black text-white">
                    {stats.dropped}
                  </div>
                </div>
                <div className="text-white text-xl lg:text-2xl text-center">
                  People Dropped
                </div>
                {/* <div className="text-xs lg:text-sm text-white">
                  Lorem ipsum dolor sit amet, leo consectetur adipiscing elit
                  Ut.
                </div> */}
              </div>

              <div className="text-center md:text-left flex flex-col gap-3 w-60 mt-8">
                <div className="flex justify-center md:justify-start items-center gap-5">
                  <div className="flex justify-center w-16 h-16 bg-[#FDB813] rounded-full">
                    <SatisfiedClientIcon />
                  </div>
                  <div className="text-3xl lg:text-5xl font-black text-white">
                    {stats.satisfied}
                  </div>
                </div>
                <div className="text-white text-xl lg:text-2xl text-center">
                  Satisfied Client
                </div>
                {/* <div className="text-xs lg:text-sm text-white">
                  Lorem ipsum dolor sit amet, leo consectetur adipiscing elit
                  Ut.
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsAndTestamonials: React.FC = () => {
  const [isVisible, elementRef] = useIntersectionObserver({});
  const [stats, setStats] = useState({
    fleet: 0,
    trips: 0,
    dropped: 0,
    satisfied: 0,
  });

  const finalStats = {
    fleet: 32002,
    trips: 16008,
    dropped: 17068,
    satisfied: 19508,
  };

  const [translateX, setTranslateX] = useState(-(320 + 30));
  const [transitionDuration, setTransitionDuration] = useState("duration-700");
  const cardWidthIncludingGap = 320 + 30;
  const numberOfVisibleCards = 1;
  const slideInterval = 2000;

  const testimonials = [
    {
      avatar: Man,
      testimonialText:
        "Using Bombay taxi company was an absolute breeze! From booking to drop-off, everything was seamless. The driver was punctual, courteous, and the vehicle was clean and comfortable. I highly recommend them for anyone looking for a reliable and stress-free transportation option.",
      name: "Jane Doe",
      position: "Managing Director",
    },
    {
      avatar: Man,
      testimonialText:
        "I've been using Bombay Taxi company for my business travel needs for years now, and they never disappoint. Their customer service is top-notch, their vehicles are well-maintained, and their drivers are professional and knowledgeable. I wouldn't trust anyone else with my transportation needs.",
      name: "John Smith",
    },
    {
      avatar: Woman,
      testimonialText:
        "I recently used Bombay Taxi Company for a family trip, and I couldn't be happier with the service. The booking process was quick and easy, the vehicle was spacious enough for my family, and the driver went above and beyond to make sure we had a comfortable journey. I will definitely be using them again for future trips.",
      name: "Alice Johnson",
      position: "CEO",
    },
    {
      avatar: Man,
      testimonialText:
        "As a frequent traveller, I've tried many cab rental services, but none compare to Bombay Taxi Company. Their prices are competitive, their fleet is diverse, and their drivers are always professional and courteous. Whether it's a short trip around town or a long-distance journey, I trust Bombay Taxi Company to get me to my destination safely and on time.",
      name: "Mark Brown",
    },
    {
      avatar: Woman,
      testimonialText:
        "I recently used Bombay Taxi Company for airport transfer, and I was thoroughly impressed. The driver was waiting for me at the arrivals area, holding a sign with my name, making it easy for me to locate them. I will definitely be using Bombay Taxi Company for all my future transportation needs.",
      name: "Emily Clark",
      position: "Chairmen",
    },
    {
      avatar: Woman,
      testimonialText:
        "Bombay Taxi Company made my trip stress-free from start to finish. Booking was quick, the driver was exceptionally friendly, and the car was spotless. It was the perfect experience, and I can't recommend them enough for anyone needing reliable and comfortable transportation.",
      name: "Sophia Patel",
      position: "Marketing Head",
    },
    //repeat
    {
      avatar: Man,
      testimonialText:
        "Using Bombay taxi company was an absolute breeze! From booking to drop-off, everything was seamless. The driver was punctual, courteous, and the vehicle was clean and comfortable. I highly recommend them for anyone looking for a reliable and stress-free transportation option.",
      name: "Jane Doe",
      position: "Managing Director",
    },
    {
      avatar: Man,
      testimonialText:
        "I've been using Bombay Taxi company for my business travel needs for years now, and they never disappoint. Their customer service is top-notch, their vehicles are well-maintained, and their drivers are professional and knowledgeable. I wouldn't trust anyone else with my transportation needs.",
      name: "John Smith",
    },
    {
      avatar: Woman,
      testimonialText:
        "I recently used Bombay Taxi Company for a family trip, and I couldn't be happier with the service. The booking process was quick and easy, the vehicle was spacious enough for my family, and the driver went above and beyond to make sure we had a comfortable journey. I will definitely be using them again for future trips.",
      name: "Alice Johnson",
      position: "CEO",
    },
    {
      avatar: Man,
      testimonialText:
        "As a frequent traveller, I've tried many cab rental services, but none compare to Bombay Taxi Company. Their prices are competitive, their fleet is diverse, and their drivers are always professional and courteous. Whether it's a short trip around town or a long-distance journey, I trust Bombay Taxi Company to get me to my destination safely and on time.",
      name: "Mark Brown",
    },
    {
      avatar: Woman,
      testimonialText:
        "I recently used Bombay Taxi Company for airport transfer, and I was thoroughly impressed. The driver was waiting for me at the arrivals area, holding a sign with my name, making it easy for me to locate them. I will definitely be using Bombay Taxi Company for all my future transportation needs.",
      name: "Emily Clark",
      position: "Chairmen",
    },
    {
      avatar: Woman,
      testimonialText:
        "Bombay Taxi Company made my trip stress-free from start to finish. Booking was quick, the driver was exceptionally friendly, and the car was spotless. It was the perfect experience, and I can't recommend them enough for anyone needing reliable and comfortable transportation.",
      name: "Sophia Patel",
      position: "Marketing Head",
    }
  ];

  const maxTranslate = -(
    testimonials.length * cardWidthIncludingGap -
    window.innerWidth +
    cardWidthIncludingGap * numberOfVisibleCards
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((currentTranslate) => {
        const newTranslate = currentTranslate - cardWidthIncludingGap;
        if (newTranslate < maxTranslate) {
          setTransitionDuration("duration-0"); // Instantly reset position without transition
          setTimeout(() => setTransitionDuration("duration-700"), 50); // Then restore the transition for the next slide
          return -(320 + 30); // Start over
        }
        return newTranslate;
      });
    }, slideInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, cardWidthIncludingGap]);

  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        setStats((prevStats) => ({
          fleet:
            prevStats.fleet < finalStats.fleet
              ? prevStats.fleet + Math.ceil(finalStats.fleet / 300)
              : finalStats.fleet,
          trips:
            prevStats.trips < finalStats.trips
              ? prevStats.trips + Math.ceil(finalStats.trips / 300)
              : finalStats.trips,
          dropped:
            prevStats.dropped < finalStats.dropped
              ? prevStats.dropped + Math.ceil(finalStats.dropped / 300)
              : finalStats.dropped,
          satisfied:
            prevStats.satisfied < finalStats.satisfied
              ? prevStats.satisfied + Math.ceil(finalStats.satisfied / 300)
              : finalStats.satisfied,
        }));
      }, 5);

      return () => clearInterval(intervalId);
    }
  }, [isVisible]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div
          className="py-16 w-full text-center
          md:px-8
          xl:px-32
          "
        >
          <div className="text-base text-[#FDB813] pb-2">
            Customers Feedback
          </div>
          <div className=" text-[2.7rem] text-[#2a2a2a]  font-bold">
            Our Customers Reviews<span className="text-[#FDB813]">.</span>
          </div>
          <div className="flex justify-center items-center w-full relative">
            <div
              className="m-8 py-1 overflow-x-scroll scroll-smooth no-scrollbar
              lg:w-[1020px]
              md:w-[670px]
              w-[320px]
            "
            >
              <div
                className={`flex gap-4  ${transitionDuration}`}
                style={{
                  gap: `${30}px`,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    avatar={testimonial.avatar}
                    testimonialText={testimonial.testimonialText}
                    name={testimonial.name}
                    position={testimonial.position}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AwsomeFeatures: React.FC = () => {
  const [translateX, setTranslateX] = useState(-(320 + 30));
  const [transitionDuration, setTransitionDuration] = useState("duration-700");
  const cardWidthIncludingGap = 320 + 30;
  const numberOfVisibleCards = 1;
  const slideInterval = 2000;

  const features = [
    {
      icon: <img src={BestDealsDiscounts} className="w-12 h-12" />,
      text: "Best Deals & Discounts",
      description: "Unlock best value with premium deals & exclusive discounts",
    },
    {
      icon: <img src={PremiumServices} className="w-12 h-12" />,
      text: "Premium Services",
      description: "Experience unmatched luxury and comfort",
    },
    {
      icon: <img src={SafetyGaurantee} className="w-12 h-12" />,
      text: "100% Safety Guarantee",
      description: "Ensuring your safety is our top priority",
    },
    {
      icon: <img src={AffordablePricing} className="w-12 h-12" />,
      text: "Affordable Pricing",
      description: "Enjoy great services at unbeatable prices",
    },
    {
      icon: <img src={BestQualityFleet} className="w-12 h-12" />,
      text: "Best Quality Fleet",
      description: "Offering unparalleled choices for your travel needs",
    },
    {
      icon: <img src={ProfessionalExpertDrivers} className="w-12 h-12" />,
      text: "Professional Expert Drivers",
      description: "Driven by highly skilled and courteous drivers",
    },
    {
      icon: <img src={QuickSupport} className="w-12 h-12" />,
      text: "24/7 Quick Support",
      description: "Available for all your bus booking needs",
    },
    {
      icon: <img src={BestDealsDiscounts} className="w-12 h-12" />,
      text: "Best Deals & Discounts",
      description: "Unlock best value with premium deals & exclusive discounts",
    },
    {
      icon: <img src={PremiumServices} className="w-12 h-12" />,
      text: "Premium Services",
      description: "Experience unmatched luxury and comfort",
    },
    {
      icon: <img src={SafetyGaurantee} className="w-12 h-12" />,
      text: "100% Safety Guarantee",
      description: "Ensuring your safety is our top priority",
    },
    {
      icon: <img src={AffordablePricing} className="w-12 h-12" />,
      text: "Affordable Pricing",
      description: "Enjoy great services at unbeatable prices",
    },
    {
      icon: <img src={BestQualityFleet} className="w-12 h-12" />,
      text: "Best Quality Fleet",
      description: "Offering unparalleled choices for your travel needs",
    },
  ];

  const maxTranslate = -(
    (features.length + 1) * cardWidthIncludingGap -
    window.innerWidth +
    cardWidthIncludingGap * numberOfVisibleCards
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((currentTranslate) => {
        const newTranslate = currentTranslate - cardWidthIncludingGap;
        if (newTranslate < maxTranslate) {
          setTransitionDuration("duration-0"); // Instantly reset position without transition
          setTimeout(() => setTransitionDuration("duration-700"), 50); // Then restore the transition for the next slide
          return -(320 + 30); // Start over
        }
        return newTranslate;
      });
    }, slideInterval);

    return () => clearInterval(interval);
  }, [features.length, cardWidthIncludingGap]);

  return (
    <>
      <div className="space-y-10 py-20 pt-40">
        <div
          className="flex flex-col justify-center items-center space-y-2 text-center
        md:px-8
          xl:px-32
      "
        >
          <div className="text-[#FDB813]">Our Features</div>
          <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
            Our Awesome Features
            <span className="text-[#FDB813]">.</span>
          </div>
        </div>
        <div className="relative">
          <div className="flex justify-center items-center overflow-hidden">
            <div
              className="scroll-smooth no-scrollbar  overflow-hidden
              lg:w-[1020px]
              md:w-[670px]
              w-[320px]
            "
            >
              <div
                className={`flex gap-4 ${transitionDuration}`}
                style={{
                  gap: `${30}px`,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-shrink-0 items-center gap-2 w-80 border border-opacity-10 rounded-3xl p-3"
                  >
                    <div className="text-[#FDB813] flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {feature.text}
                        <span className="text-[#FDB813]">.</span>
                      </div>
                      <div className="text-sm text-zinc-500">
                        {feature?.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OurBenefitsList: React.FC = () => {
  return (
    <>
      <div className="space-y-10 py-20">
        <div
          className="flex flex-col justify-center items-center space-y-2 text-center
          px-4
          sm:px-6
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px:32
        "
        >
          <div className="text-base text-[#FDB813]">What We Offer</div>
          <div className="text-[2.7rem] text-[#2a2a2a] font-bold ">
            We Offer The Best For You<span className="text-[#FDB813]">.</span>
          </div>
          <div className="text-[13px] text-gray-500 sm:w-[600px]">
            Discover unmatched services tailored just for you. We prioritize
            your convenience and safety, delivering quality and reliability with
            every interaction. Experience excellence redefined.
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="max-w-xs min-w-[320px]">
            <div className="bg-[#2A2A2A] rounded-2xl p-5 py-8 flex flex-col gap-5 w-full">
              <div className="flex gap-x-3">
                <div className="bg-[#FDB813] rounded-lg p-3 flex justify-center items-center">
                  <FaRupeeSign className="text-3xl" />
                </div>
                <div className="text-white text-xl flex flex-col gap-2 justify-between">
                  <div className="tracking-wide">All Payment</div>
                  <div className="font-light text-sm">
                    Supports all major payment methods.
                  </div>
                </div>
              </div>
              <hr className="border-zinc-700" />
              <div className="flex justify-center gap-5">
                <div className="bg-white flex justify-center w-8 h-5 rounded">
                  <CreditCardOutlined />
                </div>
                <div className="bg-white flex justify-center w-8 h-5 rounded">
                  <BankOutlined />
                </div>
                <div className="bg-white flex justify-center w-8 h-5 rounded">
                  <MobileOutlined />
                </div>
                <div className="bg-white flex justify-center w-8 h-5 rounded">
                  <MoneyCollectOutlined />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xs min-w-[320px]">
            <div className="bg-[#FDB813] rounded-2xl p-5 py-8 flex flex-col gap-5 w-full">
              <div className="flex gap-x-3">
                <div className="bg-[#2A2A2A] rounded-lg p-3 flex justify-center items-center">
                  <SafetyOutlined className="text-3xl text-[#FDB813]" />
                </div>
                <div className="text-xl flex flex-col gap-2 justify-between">
                  <div className="tracking-wide">Safety First</div>
                  <div className="font-light text-sm">
                    Commitment to safety with every journey you take.
                  </div>
                </div>
              </div>
              <hr className="border-[#2A2A2A]" />
              <div className="flex justify-around gap-5">
                <div className="flex gap-x-2">
                  <div className="text-xl flex justify-center w-8 h-5 rounded">
                    <CreditCardOutlined />
                  </div>
                  <div className="font-light text-sm">Guarantee</div>
                </div>
                <div className="flex gap-x-2">
                  <div className="text-xl flex justify-center w-8 h-5 rounded">
                    <CarOutlined />
                  </div>
                  <div className="font-light text-sm">Quick Ride</div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-xs min-w-[320px]">
            <div className="border rounded-2xl p-5 py-8 flex flex-col gap-5 w-full">
              <div className="flex gap-x-3">
                <div className="bg-[#FDB813] rounded-lg p-3 flex justify-center items-center">
                  <MobileOutlined className="text-3xl" />
                </div>
                <div className="text-xl flex flex-col gap-2 justify-between">
                  <div className="tracking-wide">100% Digital</div>
                  <div className="font-light text-sm">
                    Complete digital experience from booking to payment.
                  </div>
                </div>
              </div>
              <hr className="border-zinc-200" />
              <div className="flex justify-around gap-5">
                <div className="flex gap-x-2">
                  <div className="text-xl flex justify-center w-8 h-5 rounded">
                    <AppleFilled className="text-[#FDB813]" />
                  </div>
                  <div className="font-light text-sm">Apple</div>
                </div>
                <div className="flex gap-x-2">
                  <div className="text-xl flex justify-center w-8 h-5 rounded">
                    <AndroidFilled className="text-[#FDB813]" />
                  </div>
                  <div className="font-light text-sm">Android</div>
                </div>
              </div>
            </div>
          </div>

          {/* {benefits.map((benefit, index) => (
            <div key={index} className='max-w-xs min-w-[320px] bg-white rounded-2xl p-5 py-8 flex flex-col gap-5 w-full shadow-lg'>
              <div className='flex justify-center items-center'>
                {benefit.icon}
              </div>
              <div className='text-center'>
                <div className='text-xl font-semibold'>
                  {benefit.title}
                </div>
                <div className='font-light text-sm mt-2'>
                  {benefit.description}
                </div>
              </div>
            </div>
          ))} */}
        </div>

        {/* <div className='w-full'>
          <div className='flex justify-center -mb-10'>
            <div className='border border-dashed  justify-center w-[400px]
              hidden
              sm:flex
            '/>
          </div>
          <div className='flex flex-col items-center justify-center
            sm:flex-row
          '>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl'>
                <CarOutlined className='text-3xl text-[#FDB813]' />
              </div>
              <div className='text-xl'>
                Booking A Taxi
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center shadow-2xl'>
                <UserOutlined className='text-3xl text-[#FDB813]' />
              </div>
              <div className='text-xl'>
                Get a Driver
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
            <div className='w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            '>
              <div className='h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center shadow-2xl'>
                <LikeOutlined className='text-3xl text-[#FDB813]' />
              </div>
              <div className='text-xl'>
                Enjoy Your Ride
              </div>
              <div className='text-gray-500 text-sm text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

const EasyStep: React.FC = () => {
  return (
    <>
      <div className="space-y-24 py-20">
        <div
          className="flex flex-col justify-center items-center space-y-2 text-center
          px-4
          sm:px-6
          md:px-10
          lg:px-14
          xl:px-20
          2xl:px:32
        "
        >
          <div className="text-base text-[#FDB813]">How We Work</div>
          <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
            Easy Step For Book Your Taxi
            <span className="text-[#FDB813]">.</span>
          </div>
          <div
            className="text-sm text-gray-500
            sm:w-[600px]
          "
          >
            Four simple steps to a smooth, stress-free taxi booking. We ensure a
            seamless experience from start to finish.
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-center -mb-10">
            <div
              className="border border-dashed  justify-center w-[600px]
              hidden
              sm:flex
            "
            />
          </div>
          <div
            className="flex flex-col items-center justify-center
            sm:flex-row
          "
          >
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center">
                <CarOutlined className="text-3xl text-[#FDB813]" />
              </div>
              <div className="text-xl">Booking A Taxi</div>
              <div className="text-gray-500 text-sm text-center">
                Choose your pickup and destination.
              </div>
            </div>
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#ffffff] rounded-2xl flex justify-center items-center border">
              <TransparentBillingYellow />
              </div>
              <div className="text-xl">Pay Your Taxi</div>
              <div className="text-gray-500 text-sm text-center">
                Safe and secure payment options for you.
              </div>
            </div>
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#FDB813] rounded-2xl flex justify-center items-center">
                <UserOutlined className="text-3xl text-black" />
              </div>
              <div className="text-xl">Get a Driver</div>
              <div className="text-gray-500 text-sm text-center">
                Match with a skilled local driver for you.
              </div>
            </div>
            <div
              className="w-56 flex flex-col justify-center items-center space-y-2 m-3
              sm:m-0
            "
            >
              <div className="h-20 w-20 bg-[#2A2A2A] rounded-2xl flex justify-center items-center">
                <LikeOutlined className="text-3xl text-[#FDB813]" />
              </div>
              <div className="text-xl">Enjoy Your Ride</div>
              <div className="text-gray-500 text-sm text-center">
                R elax in comfort to your destination.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const WhatWeAreOffering: React.FC = () => {
  const services = [
    {
      icon: <OnlineEasyBookingIcon />,
      feature: "FEATURE - 01",
      title: "Online Easy Booking",
      description:
        "Book your ride with ease through our online platform, available 24/7 for your convenience.",
      detailsUrl: "/",
      image: WeOffer1,
    },
    {
      icon: <OneWayTripIcon />,
      feature: "FEATURE - 02",
      title: "One-Way Trip",
      description:
        "Efficient and comfortable one-way trips to your desired destination, with no return trip required.",
      detailsUrl: "/",
      image: WeOffer2,
    },
    {
      icon: <RoundTripIcon />,
      feature: "FEATURE - 03",
      title: "Round Trip",
      description:
        "Convenient roundtrip services ensuring a seamless journey to your destination and back.",
      detailsUrl: "/",
      image: WeOffer3,
    },
    {
      icon: <HourlyRentalIcon />,
      feature: "FEATURE - 04",
      title: "Hourly Car Rental",
      description:
        "Flexible hourly car rental services tailored to meet your short-term travel needs.",
      detailsUrl: "/hourly-rental",
      image: WeOffer4,
    },
    {
      icon: <AirportTransferIcon />,
      feature: "FEATURE - 05",
      title: "Airport Transfer",
      description:
        "Reliable airport transfer services for a stress-free journey to and from the airport.",
      detailsUrl: "/",
      image: WeOffer5,
    },
    {
      icon: <CorporateCarRentalIcon />,
      feature: "FEATURE - 06",
      title: "Corporate Car Rental",
      description:
        "Professional corporate car rental services designed for business needs and executive travel.",
      detailsUrl: "/",
      image: WeOffer6,
    },
  ];

  const [translateX, setTranslateX] = useState(0);

  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(translateX);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      const dragDistance = e.clientX - startX;
      setTranslateX(currentX + dragDistance);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center text-center space-y-2 py-20">
        <div className="text-[#FDB813]">Ride In Comfort</div>
        <div className="text-[2.7rem] text-[#2a2a2a] font-bold">
          We Make Your Every Trip Comfortable
          <span className="text-[#FDB813]">.</span>
        </div>
        <div className="text-[13px] text-gray-500 sm:w-[600px]">
          Discover unmatched services tailored just for you. We prioritize your
          convenience and safety, delivering quality and reliability with every
          interaction. Experience excellence redefined.
        </div>
        <div
          className="flex justify-center"
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className="
            xl:w-[1240px]
            lg:w-[800px] 
            w-[360px]
          "
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className={`flex flex-wrap justify-center gap-8 mt-3`}>
              {services.map((service, index) => (
                <div className="service-card">
                  <ServiceCard
                    icon={service.icon}
                    feature={service.feature}
                    title={service.title}
                    description={service.description}
                    detailsUrl={service.detailsUrl}
                    image={service.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <div
        className="
        bg-white
        -mt-24
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
      "
      >
        <AwsomeFeatures />
      </div>
      <Container>
        <DividerWithoutLogo />
      </Container>
      <WhatWeAreOffering />
      <Container>

      <DividerWithLogo />
      </Container>
      <div
        className="
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
      "
      >
        <OurBenefitsList />
      </div>
      <Container>

      <DividerWithoutLogo />
      </Container>
      <WhyChooseUs />
      <Container>

      <DividerWithLogo />
      </Container>
      <Container>
        <EasyStep />
      </Container>
      <Container>

      <DividerWithoutLogo />
      </Container>
      <OurAchievement />
      <DividerWithLogo />
      <StatsAndTestamonials />
      <CallUsNow />
      <ReadyToBook />
      <Footer />
    </div>
  );
};

export default Home;
