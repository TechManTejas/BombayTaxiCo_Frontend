/* eslint-disable @typescript-eslint/no-explicit-any */
import { LeftOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DatePicker, Select, Spin, message, Collapse } from "antd";
const { Panel } = Collapse;
import { Option } from "antd/es/mentions";
import dayjs, { Dayjs } from "dayjs";
import { Footer } from "../components/Footer";
import CarCard from "../components/CarCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

import { generateTimeOptions } from "../utils/GenerateTimeOptions";

import { ICity } from "../types/citys.types";
import { ISettings } from "../types/settings.types";
import { IRoute } from "../types/routes.types";
import { ITaxiType } from "../types/taxiTypes.types";
import { generateDistanceOptions } from "../utils/GenerateDistanceOptions";
import { Container } from "@mui/material";
import { Swap } from "../icons/Swap";

interface BillCardProps {
  routeDistance: number;
  tripRates: any;
  tripType: string;
}

interface TripRate {
  taxiType: ITaxiType;
  originalPrice: number;
  discountedPrice: number;
  extraKmCharges: number;
}

const WaitingAndDriverAllowance = (settings) => {
  return (
    <>
      <div className="bg-white border my-3  rounded-lg">
        <Collapse accordion className="bg-white rounded-2xl border-none">
          <Panel header="Waiting and Driver allowance" key="4">
            <div
              className="lg:flex gap-8
            lg:w-[730px]
          "
            >
              <div className="font-light space-y-2">
              <div className="flex justify-between">
                <div>Driver Allowance</div>
                <div>{settings?.parkingAndAirportEntry}</div>
              </div>
              <div className="flex justify-between">
                <div>Waiting Charges</div>
                <div>
                  ₹ {settings?.waitingChargesPerMinute?.toLocaleString()}
                </div>
              </div>
            </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

const BillCard: React.FC<BillCardProps> = ({
  routeDistance,
  tripRates,
  tripType,
}) => {
  const [settings, setSettings] = useState<ISettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/settings/get");

        setSettings(response.data.settings);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      <div className="min-w-[360px] max-w-xs w-full m-1 sticky top-36 text-sm">
        <div className="mb-3 p-3 border bg-white rounded-lg">
          <div>
            <div className="text-lg my-1 font-semibold">Fare Details</div>
            <div className="font-light space-y-2">
              <div className="flex justify-between">
                <div>Base Fare</div>
                <div>{settings?.baseFare}</div>
              </div>
              <div className="flex justify-between">
                <div>GST(5% on Base Fare)</div>
                <div>{settings?.gst}</div>
              </div>
              <div className="flex justify-between">
                <div>State, Toll Tax</div>
                <div>{settings?.stateTollTax}</div>
              </div>
              <div className="flex justify-between">
                <div>Vehicles & Fuel Charges</div>
                <div>{routeDistance}KM</div>
              </div>
              <div className="flex justify-between">
                <div>One Pickup & Drop</div>
                <div>{settings?.onePickupAndDrop}</div>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div>
            <div className="text-lg my-1 font-semibold">Other Charges</div>
            <div className="font-light space-y-2">
              <div className="flex justify-between">
                <div>Parking & Airport Entry</div>
                <div>{settings?.parkingAndAirportEntry}</div>
              </div>
              <div className="flex justify-between">
                <div>Waiting Charges</div>
                <div>
                  ₹ {settings?.waitingChargesPerMinute?.toLocaleString()}
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  Night Charges <br /> (11 PM & 6 AM)
                </div>
                <div>₹ {settings?.nightChargePerDay?.toLocaleString()}</div>
              </div>
              <div className="flex justify-between">
                <div>Extra Pickup/Drop</div>
                <div>{settings?.extraPickupDropCharges?.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <div>
            <div className="text-lg my-1 font-semibold">
              {tripType !== "Hourly Rental" ? (
                <>Extra Km Charges</>
              ) : (
                <>Extra Hr Charges</>
              )}
            </div>
            <div className="font-light space-y-2">
              {tripRates.map((tripRate: TripRate) => (
                <div
                  key={tripRate.taxiType._id}
                  className="flex justify-between"
                >
                  <div>{tripRate.taxiType.name}</div>
                  {tripType !== "Hourly Rental" ? (
                    <div>₹ {tripRate.extraKmCharges}/KM</div>
                  ) : (
                    <div>₹ {tripRate.taxiType.price_hour}/hr</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <WaitingAndDriverAllowance settings={settings}/>
      </div>
    </>
  );
};

const Search: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  console.log(state.pickupTime);

  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [loading, setLoading] = useState<boolean>(true);
  const [tripRates, setTripRates] = useState<any[]>([]);
  const [route, setRoute] = useState<IRoute | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  const [tripType, setTripType] = useState<string>(
    state.activeTab || "One-Way Trip"
  );
  const [pickupCity, setPickupCity] = useState<string>(
    state.pickupCity || "Select City"
  );
  const [pickupCityId, setPickupCityId] = useState<string | null>(
    state.pickupCityId || null
  );
  const [from, setFrom] = useState<string>(state.from || "Select City");
  const [fromId, setFromId] = useState<string | null>(state.fromId || null);
  const [to, setTo] = useState(state.to || "Select City");
  const [toId, setToId] = useState<string | null>(state.toId || null);
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(
    dayjs(state.pickupDate) || dayjs()
  );
  const [returnDate, setReturnDate] = useState<Dayjs | null>(
    dayjs(state.returnDate) || dayjs()
  );
  const [pickupTime, setPickupTime] = useState<string>("");
  const [hourlyPackage, setHourlyPackage] = useState<string>(
    state.hourlyPackage || "1 hr 10 kms"
  );

  const [tripTypeOpen, setTripTypeOpen] = useState<boolean>(false);
  const [pickupCityOpen, setPickupCityOpen] = useState<boolean>(false);
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [pickupDateOpen, setPickupDateOpen] = useState<boolean>(false);
  const [returnDateOpen, setReturnDateOpen] = useState<boolean>(false);
  const [pickupTimeOpen, setPickupTimeOpen] = useState<boolean>(false);
  const [hourlyPackageOpen, setHourlyPackageOpen] = useState<boolean>(false);

  const [cities, setCities] = useState<ICity[]>([]);

  useEffect(() => {
    const timeOptions = generateTimeOptions(pickupDate ?? dayjs());
    if (timeOptions.length === 0) {
      // No time options available, shift to the next day
      const nextDay = (pickupDate ?? dayjs()).add(1, "day");
      setPickupDate(nextDay);
      setPickupTime(generateTimeOptions(nextDay)[0]?.label ?? "");
    } else {
      setPickupTime(state.pickupTime ?? timeOptions[0]?.label ?? "");
    }
  }, [pickupDate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(dayjs());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const toggleTripType = () => {
    setTripTypeOpen(!tripTypeOpen);
  };

  const togglePickupCity = () => {
    setPickupCityOpen(!pickupCityOpen);
  };

  const toggleFrom = () => {
    setFromOpen(!fromOpen);
  };

  const toggleTo = () => {
    setToOpen(!toOpen);
  };

  const togglePickupDatePicker = () => {
    setPickupDateOpen(!pickupDateOpen);
  };

  const toggleReturnDatePicker = () => {
    if (tripType === "One-Way Trip") {
      setTripType("Round Trip");
    }
    setReturnDateOpen(!returnDateOpen);
  };

  const togglePickupTime = () => {
    setPickupTimeOpen(!pickupTimeOpen);
  };

  const toggleHourlyPackage = () => {
    setHourlyPackageOpen(!hourlyPackageOpen);
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

  const handleTripTypeChange = (value: string) => {
    setTripType(value);
  };

  const handlePickupCityChange = (value: string) => {
    setPickupCity(value);
    setPickupCityId(cities.find((c: ICity) => c.name === value)?._id ?? null);
  };

  const handleFromChange = (value: string) => {
    setFrom(value);
    setFromId(cities.find((c: ICity) => c.name === value)?._id ?? null);
  };

  const handleToChange = (value: string) => {
    setTo(value);
    setToId(cities.find((c: ICity) => c.name === value)?._id ?? null);
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
    }
  };

  const handlePickupTimeChange = (value: string) => {
    setPickupTime(value);
  };

  const handleHourlyPackageChange = (value: string) => {
    setHourlyPackage(value);
  };

  const menuTimeOptions = generateTimeOptions(pickupDate ?? dayjs()).map(
    (option) => ({
      label: option.label,
      key: option.key,
    })
  );

  const menuDistanceOptions = generateDistanceOptions();

  const onSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/search", {
        tripType: tripType,
        pickupCityId: pickupCityId,
        fromId: fromId,
        toId: toId,
        pickupDate: pickupDate?.format("YYYY-MM-DD"),
        returnDate: returnDate?.format("YYYY-MM-DD"),
        pickupTime: pickupTime,
        hourlyPackage: hourlyPackage,
      });

      // Extract the trip rates from the response
      const rates = response.data.taxi_rates || [];
      console.log(rates);
      setTripRates(rates);

      const route = response.data.route || null;
      setRoute(route);

      const distance = response.data.distance || null;
      setDistance(distance);
    } catch (error) {
      console.error("Error making API request:", error);
    } finally {
      setLoading(false);
    }
  };

  const onBook = (taxi_rate: any) => {
    navigate("/details", {
      state: {
        taxi_rate: taxi_rate,
        route: route,
        from: from,
        to: to,
        pickupDate: pickupDate?.format("YYYY-MM-DD"),
        returnDate: returnDate?.format("YYYY-MM-DD"),
        pickupTime: pickupTime,
        tripType: tripType,
        pickupCity: pickupCity,
        pickupCityId: pickupCityId,
        hourlyPackage: hourlyPackage,
      },
    });
  };

  useEffect(() => {
    onSearch();

    const fetchCities = async () => {
      try {
        const response = await axios.get("/citys", {
          params: {
            filter: JSON.stringify({ status: "Active" }),
          },
        });
        // Assuming the cities are available in an array under the 'cities' key in the response
        const fetchedCities = response.data.citys || [];

        setCities(fetchedCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  return (
    <>
      <div className="bg-[#ececf4] px-1 space-y-2">
        <div
          className="justify-center w-full
          hidden
          lg:flex
        "
        >
          <div className="container flex justify-center bg-[#2A2A2A] rounded-lg w-[1164px]">
            <div className="flex items-center h-full py-2">
              <div
                className={`relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                ${tripType === "Hourly Rental" ? "w-48" : "w-36 xl:w-40"}
              `}
                onClick={toggleTripType}
              >
                <div className="px-2 flex justify-between items-center">
                  <div>
                    <div className="text-[#FDB813]">Trip Type</div>
                    <div className={`text-white ${tripType ? 'font-bold' : ''}`}>{tripType}</div>
                  </div>
                  <svg
                    className="ml-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
                <Select
                  open={tripTypeOpen}
                  className="absolute w-0 h-0"
                  defaultValue="One Way Trip"
                  style={{ visibility: "hidden", width: "100%" }}
                  onChange={handleTripTypeChange}
                  onDropdownVisibleChange={(open) => setTripTypeOpen(open)}
                >
                  <Option value="One-Way Trip">One-Way Trip</Option>
                  <Option value="Round Trip">Round Trip</Option>
                  <Option value="Hourly Rental">Hourly Rental</Option>
                </Select>
              </div>

              {tripType !== "Hourly Rental" && (
                <div className="flex relative">
                  <div
                    className="relative bg-[#404040] mx-1 mr-2 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer z-20
                w-36
                xl:w-44
              "
                    onClick={toggleFrom}
                  >
                    <div className="px-2 w-full">
                      <div className="text-[#FDB813]">From</div>
                      <div
                        className={`text-white w-full ${from ? 'font-bold' : ''}`}
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {from}
                      </div>
                    </div>
                    <Select
                      open={fromOpen}
                      className="absolute w-0 h-0"
                      defaultValue="One Way Trip"
                      style={{ visibility: "hidden", width: "100%" }}
                      onChange={handleFromChange}
                      onDropdownVisibleChange={(open) => setFromOpen(open)}
                    >
                      {cities
                        .filter((c: ICity) => c._id != toId)
                        .map((city) => (
                          <Option key={city._id} value={city.name}>
                            {city.name}
                          </Option>
                        ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>

                  <div className="absolute w-full h-full flex justify-center items-center">
                    <button
                      className="hover:shadow-xl border-yellow-500 border rounded-xl xl:w-7 xl:h-7 z-30 hover:bg-yellow-500 bg-zinc-500 w-full flex justify-center items-center p-1"
                      onClick={switchValues}
                    >
                      <Swap />
                    </button>
                  </div>

                  <div
                    className="relative bg-[#404040] mx-1 ml-2 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer z-20
                w-36
                xl:w-44
              "
                    onClick={toggleTo}
                  >
                    <div className="px-2 w-full">
                      <div className="text-[#FDB813]">To</div>
                      <div
                        className={`text-white w-full ${to ? 'font-bold' : ''}`}
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {to}
                      </div>
                    </div>
                    <Select
                      open={toOpen}
                      className="absolute w-0 h-0"
                      defaultValue="One Way Trip"
                      style={{ visibility: "hidden", width: "100%" }}
                      onChange={handleToChange}
                      onDropdownVisibleChange={(open) => setToOpen(open)}
                    >
                      {cities
                        .filter((c: ICity) => c._id != fromId)
                        .map((city) => (
                          <Option key={city._id} value={city.name}>
                            {city.name}
                          </Option>
                        ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </div>
              )}
              {tripType === "Hourly Rental" && (
                <>
                  <div
                    className={`relative bg-[rgb(64,64,64)] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                    ${tripType === "Hourly Rental" ? "w-48" : "w-36 xl:w-40"}
                  `}
                    onClick={togglePickupCity}
                  >
                    <div className="px-2 w-full">
                      <div className="text-[#FDB813]">Pickup Location</div>
                      <div
                        className={`text-white w-full ${pickupCity ? 'font-bold' : ''}`}
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {pickupCity}
                      </div>
                    </div>
                    <Select
                      open={pickupCityOpen}
                      className="absolute w-0 h-0"
                      defaultValue="One Way Trip"
                      style={{ visibility: "hidden", width: "100%" }}
                      onChange={handlePickupCityChange}
                      onDropdownVisibleChange={(open) =>
                        setPickupCityOpen(open)
                      }
                    >
                      {cities.map((city) => (
                        <Option key={city._id} value={city.name}>
                          {city.name}
                        </Option>
                      ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </>
              )}

              <div
                className={`relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                ${tripType === "Hourly Rental" ? "w-48" : "w-32 xl:w-36"}
              `}
              >
                <div className="px-2" onClick={togglePickupDatePicker}>
                  <div className="text-[#FDB813]">Pickup Date</div>
                  <div className={`text-white ${pickupDate ? 'font-bold' : ''}`}>
                    {pickupDate?.format("D MMM YYYY")}
                  </div>
                </div>
                <DatePicker
                  className="absolute bottom-0 left-0 w-0 h-0"
                  style={{
                    visibility: "hidden",
                  }}
                  open={pickupDateOpen}
                  onOpenChange={(open) => setPickupDateOpen(open)}
                  onChange={handlePickupDateChange}
                  disabledDate={(current) =>
                    current
                      ? current.isBefore(currentDate.startOf("day")) ||
                        current.isAfter(currentDate.add(30, "days"))
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
              </div>

              <div
                className={`relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                ${tripType === "Hourly Rental" ? "w-48" : "w-32 xl:w-36"}
              `}
                onClick={togglePickupTime}
              >
                <div className="px-2">
                  <div className="text-[#FDB813]">Pickup Time</div>
                  <div className={`text-white ${pickupTime ? 'font-bold' : ''}`}>{pickupTime}</div>
                </div>
                <Select
                  open={pickupTimeOpen}
                  className="absolute w-0 h-0"
                  defaultValue="One Way Trip"
                  style={{ visibility: "hidden", width: "100%" }}
                  onChange={handlePickupTimeChange}
                  onDropdownVisibleChange={(open) => setPickupTimeOpen(open)}
                >
                  {menuTimeOptions.map((time) => (
                    <Option key={time.key} value={time.label}>
                      {time.label}
                    </Option>
                  ))}
                  {/* Add more options as needed */}
                </Select>
              </div>

              {tripType !== "Hourly Rental" && (
                <div
                  className="relative bg-[#404040] mx-1 p-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                w-32
                xl:w-36
              "
                >
                  {tripType === "Round Trip" ? (
                    <>
                      <div className="" onClick={toggleReturnDatePicker}>
                        <div className="text-[#FDB813]">Return Date</div>
                        <div className={`text-white ${returnDate ? 'font-bold' : ''}`}>
                          {returnDate?.format("D MMM YYYY")}
                        </div>
                      </div>
                      <DatePicker
                        value={returnDate}
                        open={returnDateOpen}
                        onOpenChange={(open) => setReturnDateOpen(open)}
                        onChange={handleReturnDateChange}
                        className="absolute bottom-0 left-0 w-0 h-0"
                        style={{
                          visibility: "hidden",
                        }}
                        disabledDate={(current) =>
                          current
                            ? current.isBefore(pickupDate, "day") ||
                              current.isAfter(currentDate.add(90, "days"))
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
                      <div className="" onClick={toggleReturnDatePicker}>
                        <div className="text-[#FDB813]">Return Date</div>
                        <div className="text-white text-center">
                          --- --- ---
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {tripType === "Hourly Rental" && (
                <>
                  <div
                    className={`relative bg-[#404040] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer
                    ${tripType === "Hourly Rental" ? "w-48" : "w-32 xl:w-36"}
              `}
                    onClick={toggleHourlyPackage}
                  >
                    <div className="px-2">
                      <div className="text-[#FDB813]">Select Package</div>
                      <div className="text-white">{hourlyPackage}</div>
                    </div>
                    <Select
                      open={hourlyPackageOpen}
                      className="absolute w-0 h-0"
                      defaultValue="One Way Trip"
                      style={{ visibility: "hidden", width: "100%" }}
                      onChange={handleHourlyPackageChange}
                      onDropdownVisibleChange={(open) =>
                        setHourlyPackageOpen(open)
                      }
                    >
                      {menuDistanceOptions.map((distance) => (
                        <Option key={distance.key} value={distance.label}>
                          {distance.label}
                        </Option>
                      ))}
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </>
              )}

              {/* <div className='w-32 bg-[#404040] mx-1 p-2 rounded-lg text-sm'>
                <div className='text-[#FDB813]'>DROP TIME</div>
                <div className='text-white'>24:00</div>
              </div> */}

              <button
                className="bg-yellow-500 hover:bg-yellow-400 mx-1 h-full rounded-lg flex justify-center items-center font-medium
                w-32
                xl:w-[150px]
              "
                onClick={onSearch}
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className="flex container justify-center
            flex-col-reverse items-center
            lg:flex-row lg:items-start gap-2
          "
          >
            <BillCard
              routeDistance={distance || 0}
              tripRates={tripRates}
              tripType={tripType}
            />
            <div className="w-full lg:w-[800px]">
              {loading ? (
                // Display loading indicator here
                <div className="flex justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : tripRates.length > 0 ? (
                // Map and display car cards here
                <div className="space-y-3 pb-3">
                  {tripRates.map((rate: any, index: number) => (
                    <div className="my-1">
                      <CarCard
                        key={index}
                        category={rate.taxiType?.name || ""}
                        description={rate.taxiType?.description || ""}
                        features={rate.taxiType?.car_features || []}
                        originalPrice={rate.originalPrice || ""}
                        discountedPrice={rate.discountedPrice || ""}
                        discount={
                          rate.taxiType.discount_percentage.toString() || ""
                        }
                        carImage={rate.taxiType.image || ""}
                        onBook={() => onBook(rate)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Display a message when there are no car cards
                <div className="text-center py-32 text-lg font-medium">
                  Sorry, we are working to reach out to you.
                </div>
              )}
            </div>
            <div className="lg:hidden w-full">
              <div
                className="border w-full flex rounded-lg  gap-2 bg-white shadow-lg flex-row p-1"
                onClick={() => {
                  navigate("/");
                }}
              >
                <div className="w-full">
                  <div className="flex justify-center items-center h-12">
                    <div className="ml-8 text-xl">
                      <LeftOutlined />
                    </div>
                    {tripType != "Hourly Rental" ? (
                      <div className="-ml-8 text-center text-xl font-medium w-full">
                        {from} to {to}
                      </div>
                    ) : (
                      <div className="-ml-8 text-center text-xl font-medium w-full">
                        {pickupCity} - {hourlyPackage}
                      </div>
                    )}
                  </div>
                  <hr className="border" />
                  <div className="p-2">
                    <div className="text-sm text-zinc-500">
                      SCHEDULED PICK UP
                    </div>
                    <div className="space-x-1">
                      <span className="font-semibold">
                        {pickupDate?.format("DD MMM")},
                      </span>
                      <span className="text-sm">{pickupTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-3 mx-6">
                <div className="text-xl font-bold ">Book cabs</div>
                <div className="text-sm">5 cab option(s)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-8">
        <Container className="container text-center space-x-1">
          <span className="text-zinc-800 font-semibold">Disclaimer:</span>
          <span className="text-zinc-600">
            Fare listed above are estimated based on gathered information. Final
            fare shall depend on actual travelled distance. Mileage & Timings
            will be calculated from Customer pickup location to customer drop
            location.
            <br />
            Your trip has a KM & Time limit, if your usage exceeds this limit,
            you will be charges for exes.
          </span>
        </Container>
      </div>
      {/* <ReadyToBook/> */}
      <Footer />
    </>
  );
};

export default Search;
