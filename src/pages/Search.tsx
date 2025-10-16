/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowRightOutlined,
  CloseOutlined,
  CompassOutlined,
  DownOutlined,
  EditFilled,
  EditOutlined,
  EnvironmentFilled,
  FacebookFilled,
  FacebookOutlined,
  InstagramOutlined,
  LeftOutlined,
  MailFilled,
  TwitterOutlined,
  UpOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { DatePicker, Select, Spin, message, Collapse, Dropdown, Segmented, MenuProps } from "antd";
const { Panel } = Collapse;
import { Option } from "antd/es/mentions";
import dayjs, { Dayjs } from "dayjs";
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
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { From } from "../icons/From";
import { HourlyRentalIcon } from "../icons/HourlyRentalIcon";
import { RoundTripIcon } from "../icons/RoundTripIcon";
import { OneWayTripIcon } from "../icons/OneWayTripIcon";

interface BillCardProps {
  routeDistance: number;
  tripRates: any;
  tripType: string;
  hourlyPackage: string
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
  hourlyPackage
}) => {
  const [settings, setSettings] = useState<ISettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/settings/get");
        console.log(response.data.settings);
        setSettings(response.data.settings);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      <div className="min-w-[360px] lg:max-w-xs w-full lg:sticky lg:m-1 lg:top-36 text-sm">
        <div className="mb-3 p-3 border bg-white rounded-lg">
          <div>
            <div className="text-lg my-1 font-semibold">Fare Details</div>
            <div className="font-light space-y-2">
              <div className="flex justify-between">
                <div>Base Fare</div>
                <div>{settings?.baseFare}</div>
              </div>
              <div className="flex justify-between">
                <div>Vehicles & Fuel Charges</div>
                <div>{settings?.vehiclesAndFuelCharges}</div>
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
                <div>Included Kms</div>
                <div>{routeDistance}KM</div>
              </div>
              {tripType === "One-Way Trip" && (
                <div className="flex justify-between">
                  <div>One Pickup & Drop</div>
                  <div>{settings?.onePickupAndDrop}</div>
                </div>
                )
              }
              {tripType === "Round Trip" && (
                <div className="flex justify-between">
                  <div>Timing (1 day) </div>
                  <div> 12:01 AM To 11:59 PM </div>
                </div>
                )
              }
              {tripType === "Hourly Rental" && (
                <div className="flex justify-between">
                  <div>Included Hrs</div>
                  <div>{String(hourlyPackage.match(/^\d+/)?.[0] || "0").padStart(2, "0")} Hrs </div>
                </div>
                )
              }
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
                <div>Waiting Charges <br /> (After 45 mins)</div>
                <div>
                  ₹ {settings?.waitingChargesPerMinute?.toLocaleString()}
                </div>
              </div>
              {tripType === "Round Trip" && (
                <div className="flex justify-between">
                  <div>Driver Allowance</div>
                  <div>₹ 250/Day</div>
                </div>
                )
              }
              {tripType === "Hourly Rental" && (
                <div className="flex justify-between">
                  <div>Beyond {String(hourlyPackage.match(/^\d+/)?.[0] || "0").padStart(2, "0")} Hours</div>
                  <div>₹ 100/hour</div>
                </div>
                )
              }
              <div className="flex justify-between">
                <div>
                  Night Charges <br /> (11 PM & 6 AM)
                </div>
                <div>₹ {settings?.nightChargePerDay?.toLocaleString()}/Night</div>
              </div>
              {tripType === "One-Way Trip" && (
                <div className="flex justify-between">
                  <div>Extra Pickup/Drop</div>
                  <div>{settings?.extraPickupDropCharges?.toLocaleString()}</div>
                </div>
                )
              }
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
        {/* <WaitingAndDriverAllowance settings={settings} /> */}
      </div>
    </>
  );
};

const BillCardSticky: React.FC<BillCardProps> = ({
  routeDistance,
  tripRates,
  tripType,
  hourlyPackage
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
      <div className="min-w-[360px] lg:max-w-xs w-full lg:sticky lg:m-1 lg:top-36 text-sm">
        <div className="bg-white rounded-lg">
        <div>
            <div className="text-lg my-1 font-semibold">Fare Details</div>
            <div className="font-light space-y-2">
              <div className="flex justify-between">
                <div>Base Fare</div>
                <div>{settings?.baseFare}</div>
              </div>
              <div className="flex justify-between">
                <div>Vehicles & Fuel Charges</div>
                <div>{settings?.vehiclesAndFuelCharges}</div>
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
                <div>Included Kms</div>
                <div>{routeDistance}KM</div>
              </div>
              {tripType === "One-Way Trip" && (
                <div className="flex justify-between">
                  <div>One Pickup & Drop</div>
                  <div>{settings?.onePickupAndDrop}</div>
                </div>
                )
              }
              {tripType === "Round Trip" && (
                <div className="flex justify-between">
                  <div>Timing (1 day) </div>
                  <div> 12:01 AM To 11:59 PM </div>
                </div>
                )
              }
              {tripType === "Hourly Rental" && (
                <div className="flex justify-between">
                  <div>Included Hrs</div>
                  <div>{String(hourlyPackage.match(/^\d+/)?.[0] || "0").padStart(2, "0")} Hrs </div>
                </div>
                )
              }
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
                <div>Waiting Charges <br /> (After 45 mins)</div>
                <div>
                  ₹ {settings?.waitingChargesPerMinute?.toLocaleString()}
                </div>
              </div>
              {tripType === "Round Trip" && (
                <div className="flex justify-between">
                  <div>Driver Allowance</div>
                  <div>₹ 250/Day</div>
                </div>
                )
              }
              {tripType === "Hourly Rental" && (
                <div className="flex justify-between">
                  <div>Beyond {String(hourlyPackage.match(/^\d+/)?.[0] || "0").padStart(2, "0")} Hours</div>
                  <div>₹ 100/hour</div>
                </div>
                )
              }
              <div className="flex justify-between">
                <div>
                  Night Charges <br /> (11 PM & 6 AM)
                </div>
                <div>₹ {settings?.nightChargePerDay?.toLocaleString()}/Night</div>
              </div>
              {tripType === "One-Way Trip" && (
                <div className="flex justify-between">
                  <div>Extra Pickup/Drop</div>
                  <div>{settings?.extraPickupDropCharges?.toLocaleString()}</div>
                </div>
                )
              }
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
      </div>
    </>
  );
};

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center lg:py-8">
      <Container className="bg-[#2A2A2A] flex justify-center py-12 lg:rounded-3xl">
        <div className="container px-6">
          <div
            className="flex justify-between
          flex-col space-y-6
          lg:flex-row lg:space-y-0
        "
          >
            {/* ABOUT COMPANY  */}
            <div className="space-y-6 md:w-96">
              <div className="space-y-2">
                <div className="text-white font-medium text-2xl">
                  ABOUT COMPANY
                </div>
                <div className="w-20 border border-yellow-500"></div>
              </div>
              <div className="text-zinc-500">
                Traveling one way, but worried about the return journey fare
                that cab operators make your shell out needlessly? Now stop
                worrying about return fares as we at Bombay Taxi Company have
                exclusive one-way taxi fares for you. Our one-way taxi booking
                service lets you enjoy all the conveniences of our signature car
                rental services.
              </div>
              <div className="flex space-x-2">
                <button className="h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-[#FDB813] flex justify-center items-center">
                  <FacebookFilled />
                </button>
                <button className="h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-[#FDB813] flex justify-center items-center">
                  <TwitterOutlined />
                </button>
                <button className="h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-[#FDB813] flex justify-center items-center">
                  <InstagramOutlined />
                </button>
                <button className="h-10 w-10 border rounded-full border-zinc-500 text-zinc-500 hover:border-yellow-500 hover:text-[#FDB813] flex justify-center items-center">
                  <FacebookOutlined />
                </button>
              </div>
            </div>
            {/* QUICK LINK */}
            <div className="hidden lg:block space-y-6">
              <div className="space-y-2">
                <div className="text-white font-medium text-2xl">
                  QUICK LINK
                </div>
                <div className="w-20 border border-yellow-500"></div>
              </div>
              <div className="text-zinc-500 space-y-3">
                {/* <button
                className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                onClick={() => {
                  navigate("/attach-taxi");
                  window.scrollTo(0, 0);
                }}
              >
                <ArrowRightOutlined />
                <div>Attach Your Taxi</div>
              </button> */}
                <button
                  className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                  onClick={() => {
                    navigate("/about");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ArrowRightOutlined />
                  <div>About Us</div>
                </button>
                <button
                  className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                  onClick={() => {
                    navigate("/contact");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ArrowRightOutlined />
                  <div>Contact Us</div>
                </button>
                <button
                  className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                  onClick={() => {
                    navigate("/faqs");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ArrowRightOutlined />
                  <div>FAQs</div>
                </button>
                <button
                  className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                  onClick={() => {
                    navigate("/cancellation-policy");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ArrowRightOutlined />
                  <div>Cancellation Policy</div>
                </button>
                <button
                  className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                  onClick={() => {
                    navigate("/terms-conditions");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ArrowRightOutlined />
                  <div>Terms & Conditions</div>
                </button>
                <button
                  className="flex items-center space-x-3 hover:text-[#FDB813] transition-all"
                  onClick={() => {
                    navigate("/privacy-policy");
                    window.scrollTo(0, 0);
                  }}
                >
                  <ArrowRightOutlined />
                  <div>Privacy Policy</div>
                </button>
              </div>
            </div>
            {/* CONTACT DETAILS */}
            <div className="hidden lg:block space-y-6">
              <div className="space-y-2">
                <div className="text-white font-medium text-2xl">
                  CONTACT DETAILS
                </div>
                <div className="w-20 border border-yellow-500"></div>
              </div>
              <div className="text-zinc-500 space-y-5">
                <div className="space-y-1">
                  <div className="text-sm text-white font-medium">
                    PHONE NUMBER
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-[#FDB813] text-[#2A2A2A] text-xs flex justify-center items-center rounded">
                      <span className="inline-block align-middle">
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
                    </div>
                    <a
                      href="tel:+916262744744"
                      className="text-zinc-500 hover:text-[#FDB813] hover:underline"
                    >
                      +91-6262-744-744
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-white font-medium">
                    EMAIL ADDRESS
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-[#FDB813] text-[#2A2A2A] text-xs flex justify-center items-center rounded">
                      <MailFilled />
                    </div>
                    <a
                      href="mailto:bombaytaxicompany@gmail.com"
                      className="text-zinc-500"
                    >
                      bombaytaxicompany@gmail.com
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-white font-medium">
                    OFFICE LOCATION
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-[#FDB813] text-[#2A2A2A] text-xs flex justify-center items-center rounded">
                      <EnvironmentFilled />
                    </div>
                    <div className="text-zinc-500 max-w-sm">
                      Office no. 1 Sai Society, Mhada Colony, <br />
                      Laxmi Nagar, Ghatkopar East, Mumbai 400075
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Search: React.FC = () => {
  const location = useLocation();
  const { state } = location;

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

  const [fairDetailsOpen, setFairDetailsOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState("One-Way Trip");
  const [showEmergency, setShowEmergency] = useState<boolean>(false);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

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

  const menuTime: MenuProps["items"] = generateTimeOptions(
      pickupDate ?? dayjs()
    ).map((option, index) => ({
      label: option.label,
      key: option.key,
      index: index,
    }));
  
    const handleMenuClickTime = (e: any) => {
      setPickupTime(e.key);
      const selectedTime = menuTime?.find((item) => item?.key === e.key);
  
      const isToday = pickupDate?.isSame(dayjs(), "day");
  
      // Check if the index is 8 or less and the selected date is today
      if (selectedTime && selectedTime?.index < 8 && isToday) {
        setShowEmergency(true);
      } else {
        setShowEmergency(false);
      }
    };
  
    const handleMenuClickPackage = (e: any) => {
      setHourlyPackage(e.key);
    };

  const menuDistance: MenuProps["items"] = generateDistanceOptions();
  
  
    const menuPropsTime = {
      items: menuTime,
      onClick: handleMenuClickTime,
      style: { height: "200px", overflow: "auto" },
    };
  
    const menuPropsDistance = {
      items: menuDistance,
      onClick: handleMenuClickPackage,
      style: { overflow: "auto" },
    };

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
      setSearchOpen(false)
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
      <div
        className={`${
          fairDetailsOpen || searchOpen ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-50`}
        onClick={() => {
          setFairDetailsOpen(false);

          setSearchOpen(false);
        }}
      />

      {/* <div
        className={`${
          true ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen bg-black opacity-70`}
        onClick={() => {
          setSearchOpen(!searchOpen);
        }}
      /> */}

      <div className={`${searchOpen ? '' : 'hidden'} fixed top-0 bg-white w-full z-[100]`}>
      <div className="m-3 p-1 flex items-center justify-between bg-white rounded-md">
            <button onClick={()=>{setSearchOpen(false)}} className="w-10 flex justify-center items-center text-gray-700 flex-shrink-0">
              <CloseOutlined />
            </button>
          </div>
        <div className="pb-3 flex flex-col items-center justify-center w-screen lg:w-min">
            <div className="rounded-2xl lg:shadow-lg -mb-[68px] lg:-mb-6 z-10 w-full lg:w-min">
                <div className="bg-white rounded-2xl mx-2 lg:mx-0 border border-yellow-500">

                
                <Segmented
                  value={activeTab}
                  className="w-full rounded-2xl p-1 flex"
                  onChange={(value) => {
                    handleTabChange(value.toString());
                  }}
                  options={[
                    {
                      label: (
                        <div className="lg:text-lg m-2  w-full text-center">
                          <div className="flex items-center">
                            <div className="hidden">
                              <OneWayTripIcon />
                            </div>
                            <span className="-mx-1.5 lg:mx-2 w-full text-center">One-Way Trip</span>
                          </div>
                        </div>
                      ),
                      value: "One-Way Trip",
                      className: "flex-1 text-center justify-center",
                    },
                    {
                      label: (
                        <div className="lg:text-lg m-2 w-full text-center">
                          <div className="flex items-center">
                            <div className="hidden">
                              <RoundTripIcon />
                            </div>
                            <span className="-mx-1.5 lg:mx-2 w-full text-center">Round Trip</span>
                          </div>
                        </div>
                      ),
                      value: "Round Trip",
                      className: "flex-1 text-center justify-center",
                    },
                    {
                      label: (
                        <div className="lg:text-lg m-2 w-full text-center">
                          <div className="flex items-center">
                            <div className="hidden">
                              <HourlyRentalIcon />
                            </div>
                            <span className="-mx-1.5 lg:mx-2 w-full text-center">Hourly Rental</span>
                          </div>
                        </div>
                      ),
                      value: "Hourly Rental",
                      className: "flex-1 text-center justify-center",
                    },
                  ]}
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                />

                </div>
            </div>

            <div
                className="bg-white lg:rounded-3xl -mb-6 flex flex-col justify-center items-center lg:shadow-lg py-8 px-2 pt-20 lg:pt-8
                lg:px-6 w-full
              "
              >
                <div
                  className="w-full rounded gap-2  flex flex-col lg:flex-row
                  lg:flex
                "
                >
                  {activeTab === "Hourly Rental" && (
                    <div className="group w-full lg:w-[330px] p-3 space-y-1 border-2 rounded-xl hover:border-[#FDB813] transition-all duration-300 h-20">
                      <div className="text-xs flex items-center gap-1">
                        {" "}
                        <From />
                        <div className="-ml-2">Pickup Location</div>
                      </div>
                      <Select
                        showSearch
                        placeholder="Enter a pickup city"
                        value={pickupCity || undefined}
                        className="w-full custom-select text-[1.3rem] font-bold"
                        size="large"
                        optionLabelProp="label"
                        bordered={false}
                        suffixIcon={null}        
                        removeIcon={null}        
                        menuItemSelectedIcon={null} 
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(value, option: any) => {
                          setPickupCity(option.label);
                          setPickupCityId(value);
                        }}
                        onInputKeyDown={(e) => {
                          if (e.key === "Backspace" && !e.target.value) {
                            setPickupCity("");
                            setPickupCityId(null);
                          }
                        }}
                        options={cities.map((city) => ({
                          value: city._id,
                          label: city.name,
                        }))}
                      />
                    </div>
                  )}
                  {activeTab !== "Hourly Rental" && (
                    <div className="lg:flex-row gap-2 relative flex flex-col">
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
                                              <div className="absolute flex justify-end right-0 w-full h-full lg:hidden mr-4">
                                                <div className="h-full flex flex-col justify-around items-end">
                                                  <button
                                                    className="bg-white z-30 border rounded-xl border-yellow-500"
                                                    onClick={switchValues}
                                                    >
                                                    <div className="border rounded-xl p-1 text-xl hover:bg-gray-200 shadow-lg">
                                                      <Swap />
                                                    </div>
                                                  </button>
                                                  </div>
                                              </div>
                                            </>
                                          }
                      <div className="group w-full lg:w-[228px]  p-3 space-y-1 border-2 rounded-xl z-20 hover:border-[#FDB813] transition-all duration-300 h-20">
                        <div className="text-xs flex items-center gap-1">
                          <From />
                          <div className="-ml-2">From</div>
                        </div>
                        <Select
                          showSearch
                          placeholder="Enter a pickup city"
                          value={from || undefined}
                          className="w-full custom-select text-[1.3rem] font-bold"
                          size="large"
                          optionLabelProp="label"
                          bordered={false}
                          suffixIcon={null}        
                          removeIcon={null}        
                          menuItemSelectedIcon={null} 
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toString()
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(value, option: any) => {
                            setFrom(option.label);
                            setFromId(value);
                          }}
                          onInputKeyDown={(e) => {
                            if (e.key === "Backspace" && !e.target.value) {
                              setFrom("");
                              setFromId(null);
                            }
                          }}
                          options={cities
                            .filter((city) => city._id !== toId)
                            .map((city) => ({
                              value: city._id,
                              label: city.name,
                              // Display icon + city name in dropdown
                              title: (
                                <div className="flex items-center gap-2">
                                  <From />
                                  <span>{city.name}</span>
                                </div>
                              ),
                            }))}
                          optionRender={(option) => option.data.title}
                        />
                      </div>

                      <div className="group w-full lg:w-[228px] p-3 space-y-1 border-2 rounded-xl z-20 hover:border-[#FDB813] transition-all duration-300 h-20">
                        <div className="text-xs flex items-center gap-1">
                          <EnvironmentFilled />
                          To
                        </div>
                        <Select
                          showSearch
                          placeholder={
                            activeTab === "One-Way Trip"
                              ? "Enter a drop off city"
                              : "Destination"
                          }
                          value={to || undefined}
                          className="w-full custom-select text-[1.3rem] font-bold"
                          size="large"
                          optionLabelProp="label"
                          bordered={false}
                          suffixIcon={null}        
                          removeIcon={null}        
                          menuItemSelectedIcon={null} 
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toString()
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          onChange={(value, option: any) => {
                            setTo(option.label);
                            setToId(value);
                          }}
                          onInputKeyDown={(e) => {
                            if (e.key === "Backspace" && !e.target.value) {
                              setTo("");
                              setToId(null);
                            }
                          }}
                          options={cities
                            .filter((city) => city._id !== fromId)
                            .map((city) => ({
                              value: city._id,
                              label: city.name,
                              // Show icon inside dropdown option
                              title: (
                                <div className="flex items-center gap-2">
                                  <EnvironmentFilled className="text-gray-600" />
                                  <span>{city.name}</span>
                                </div>
                              ),
                            }))}
                          optionRender={(option) => option.data.title}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-row gap-2">
                    <div className="group relative w-full lg:w-[164px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[#FDB813] transition-all duration-300 h-20">
                      <div className="text-xs flex items-center gap-1">
                        <FaCalendarAlt />
                        Pickup Date
                      </div>
                      <div
                        className={`text-[1.3rem] group-hover:text-[#FDB813] transition-all duration-300 ${
                          pickupDate ? "font-bold" : ""
                        }`}
                        onClick={togglePickupDatePicker}
                      >
                        {pickupDate?.format("D MMM") ?? (
                          <button className="text-xs text-left md:absolute">
                            select a pickup date for the trip
                          </button>
                        )}{" "}
                        <span className="text-base">
                          {pickupDate?.format("YYYY")}
                        </span>
                      </div>
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
                    <div className="group w-full lg:w-[164px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[rgb(253,184,19)] transition-all duration-300 h-20">
                      <div className="text-xs flex items-center gap-1">
                        {" "}
                        <FaClock />
                        Pickup Time
                      </div>
                      <Dropdown menu={menuPropsTime} placement="bottomLeft">
                        <button
                          className={`text-[1.3rem] group-hover:text-[#FDB813] transition-all duration-300 ${
                            pickupTime ? "font-bold" : ""
                          }`}
                          style={{ border: "none" }}
                        >
                          {pickupTime ? (
                            (() => {
                              const [time, meridian] = pickupTime.split(" ");
                              return (
                                <span>
                                  {time}{" "}
                                  <span className="text-sm font-medium align-center">
                                    {meridian}
                                  </span>
                                </span>
                              );
                            })()
                          ) : (
                            <div className="text-xs text-left">
                              Select a pickup time for the trip
                            </div>
                          )}
                        </button>
                      </Dropdown>
                    </div>
                  </div>
                  {activeTab !== "Hourly Rental" && (
                    <div className="group relative w-full lg:w-[166px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[rgb(253,184,19)] transition-all duration-300 h-20">
                      <div className="text-xs flex items-center gap-1">
                        {" "}
                        <FaClock />
                        Return Date
                      </div>
                      <div>
                        {activeTab === "Round Trip" ? (
                          <>
                            <div
                              className={`text-[1.3rem] group-hover:text-[#FDB813] transition-all duration-300 ${
                                returnDate ? "font-bold" : ""
                              }`}
                              onClick={toggleReturnDatePicker}
                            >
                              {returnDate?.format("D MMM") ?? (
                                <button className="text-xs text-left md:absolute">
                                  Select a pickup date for the trip
                                </button>
                              )}{" "}
                              <span className="text-base">
                                {returnDate?.format("YYYY")}
                              </span>
                            </div>
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
                      <div className="group w-full lg:w-[300px] p-3 pb-4 space-y-1 border-2 rounded-xl hover:border-[rgb(253,184,19)] transition-all duration-300 h-20">
                        <div className="text-xs flex items-center gap-1">
                          {" "}
                          <CompassOutlined />
                          Select Package
                        </div>
                        <Dropdown menu={menuPropsDistance} placement="bottomLeft">
                          <button
                            className={`text-[1.3rem] group-hover:text-[#FDB813] transition-all duration-300 ${
                              hourlyPackage ? "font-bold" : ""
                            }`}
                            style={{ border: "none" }}
                          >
                            {hourlyPackage || (
                              <div className="text-xs ">Select a package</div>
                            )}
                          </button>
                        </Dropdown>
                      </div>
                    </div>
                  )}
                </div>
                {showEmergency && (
                  <div className="text-red-600 w-[328px] lg:w-11/12 text-center pt-2">
                    You have selected a time that is within 2 hours of the current
                    time, in case there is an emergency call us on
                    <br />
                    <a
                      href="tel:+916262744744"
                      className="text-blue-600 underline"
                    >
                      +91-6262-744-744
                    </a>
                  </div>
                )}
            </div>

            <div className="w-full flex justify-center px-2 lg:px-0">
                <button
                  disabled={showEmergency}
                  className="w-full text-sm lg:text-base bg-[#FDB813] hover:bg-yellow-400 text-black font-semibold lg:w-40 h-12 rounded-lg border-yellow-500 z-10"
                  onClick={onSearch}
                >
                  SEE TAXI FARE
                </button>
            </div>
        </div>
      </div>

      <div className="lg:hidden bg-white p-0.5 shadow sticky top-0 z-40  h-full w-full">
          <div className="m-1 p-1 border flex items-center justify-between bg-white rounded-md">
            {/* Left Arrow */}
            <button onClick={()=>{navigate(-1);}} className="w-10 flex justify-center items-center text-gray-700 flex-shrink-0">
              <LeftOutlined />
            </button>

            {/* Route & Time Info */}
            <div className="w-full min-w-0 overflow-hidden">
              <div className="font-semibold text-[15px] leading-tight text-gray-900 flex items-center gap-1 overflow-hidden whitespace-nowrap text-ellipsis">
                <div className="truncate">{from}</div>
                <div className="flex-shrink-0">to</div>
                <div className="truncate">{to}</div>
              </div>
              <div className="text-gray-700 text-[14px] truncate">{pickupDate?.format("D MMM YYYY")}, {pickupTime}</div>
            </div>

            {/* Edit Button */}
            <button onClick={()=>{setSearchOpen(true)}} className="w-10 flex justify-center items-center text-yellow-600 cursor-pointer flex-shrink-0">
              <EditFilled />
            </button>
          </div>
      </div>
      

      <div className="bg-[#ececf4] lg:space-y-2">
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
                    <div
                      className={`text-white ${tripType ? "font-bold" : ""}`}
                    >
                      {tripType}
                    </div>
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
                  <div className="relative bg-[#404040] mx-1 mr-2 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer z-20 w-36 xl:w-44">
                    <div className="px-2 w-full">
                      <div className="text-[#FDB813]">From</div>
                    </div>
                    <div className="ml-2 -mt-1">
                      <Select
                        showSearch
                        open={fromOpen}
                        className="absolute w-full dark-custom-select"
                        placeholder="Select a city"
                        value={from || undefined}
                        optionFilterProp="children"
                        onChange={handleFromChange}
                        suffixIcon={null}
                        removeIcon={null}
                        menuItemSelectedIcon={null}
                        onDropdownVisibleChange={(open) => setFromOpen(open)}
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onInputKeyDown={(e) => {
                        if (e.key === "Backspace" && !e.target.value) {
                          setFrom("");
                          setFromId(null);
                        }
                      }}
                      >
                        {cities
                          .filter((c: ICity) => c._id !== toId)
                          .map((city) => (
                            <Select.Option key={city._id} value={city.name}>
                              {city.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>

                  <div className="absolute w-full h-full flex justify-center items-center">
                    <button
                      className="hover:shadow-xl border-yellow-500 border rounded-xl xl:w-7 xl:h-7 z-30 hover:bg-yellow-500 bg-zinc-500 w-full flex justify-center items-center p-1"
                      onClick={switchValues}
                    >
                      <Swap />
                    </button>
                  </div>

                  <div className="relative bg-[#404040] mx-1 ml-2 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer z-20 w-36 xl:w-44 h-14">
                    <div className="px-2 w-full">
                      <div className="text-[#FDB813]">To</div>
                    </div>
                    <div className="ml-2 -mt-1">
                      <Select
                        showSearch
                        open={toOpen}
                        className="absolute w-full dark-custom-select"
                        placeholder="Select a city"
                        value={to || undefined}
                        optionFilterProp="children"
                        onChange={handleToChange}
                        suffixIcon={null}
                        removeIcon={null}
                        menuItemSelectedIcon={null}
                        onDropdownVisibleChange={(open) => setToOpen(open)}
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onInputKeyDown={(e) => {
                          if (e.key === "Backspace" && !e.target.value) {
                            setTo("");
                            setToId(null);
                          }
                        }}
                      >
                        {cities
                          .filter((c: ICity) => c._id !== fromId)
                          .map((city) => (
                            <Select.Option key={city._id} value={city.name}>
                              {city.name}
                            </Select.Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              {tripType === "Hourly Rental" && (
                <>
                  <div
                    className={`relative bg-[rgb(64,64,64)] mx-1 py-2 rounded-lg text-sm hover:bg-gray-700 hover:cursor-pointer h-14
    ${tripType === "Hourly Rental" ? "w-48" : "w-36 xl:w-40"}`}
                  >
                    <div className="px-2 w-full">
                      <div className="text-[#FDB813]">Pickup Location</div>
                    </div>
                    <div className="ml-2 -mt-1">
                      <Select
                        showSearch
                        open={pickupCityOpen}
                        className="absolute w-full dark-custom-select"
                        placeholder="Select a city"
                        value={pickupCity || undefined}
                        optionFilterProp="children"
                        onChange={handlePickupCityChange}
                        suffixIcon={null}
                        removeIcon={null}
                        menuItemSelectedIcon={null}
                        onDropdownVisibleChange={(open) =>
                          setPickupCityOpen(open)
                        }
                        filterOption={(input, option) =>
                          (option?.children ?? "")
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onInputKeyDown={(e) => {
                          if (e.key === "Backspace" && !e.target.value) {
                            setPickupCity("");
                            setPickupCityId(null);
                          }
                        }}
                      >
                        {cities.map((city) => (
                          <Select.Option key={city._id} value={city.name}>
                            {city.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
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
                  <div
                    className={`text-white ${pickupDate ? "font-bold" : ""}`}
                  >
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
                  <div
                    className={`text-white ${pickupTime ? "font-bold" : ""}`}
                  >
                    {pickupTime}
                  </div>
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
                        <div
                          className={`text-white ${
                            returnDate ? "font-bold" : ""
                          }`}
                        >
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
                      <div className="text-white font-bold">
                        {hourlyPackage}
                      </div>
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
            lg:flex-row lg:items-start lg:gap-2
          "
          >
            <div className="hidden lg:block w-full lg:w-min px-4 lg:p-0">
              <BillCard
                routeDistance={distance || 0}
                tripRates={tripRates}
                tripType={tripType}
                hourlyPackage={hourlyPackage}
              />
            </div>
            <div className="w-full lg:w-[800px]">
              {loading ? (
                // Display loading indicator here
                <div className="flex justify-center items-center">
                  <Spin size="large" />
                </div>
              ) : tripRates.length > 0 ? (
                // Map and display car cards here
                <div className="lg:space-y-3 pb-3">
                  {tripRates.map((rate: any, index: number) => (
                    <div className="m-2 my-2.5 lg:m-0 lg:my-1">
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
            {/* <div className="lg:hidden w-full">
              <div
                className="border-2 w-full flex rounded-lg  bg-white flex-row"
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
            </div> */}
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
      <div className={`${searchOpen? 'hidden' : ''} lg:hidden sticky bottom-0 h-full w-full z-50`}>
        <div className={`${fairDetailsOpen ? "" : "hidden"}`}>
          <div className="bg-white p-3">
            <BillCardSticky
              routeDistance={distance || 0}
              tripRates={tripRates}
              tripType={tripType}
              hourlyPackage={hourlyPackage}
            />
          </div>
        </div>
        <div
          className="w-full flex justify-between items-center bg-[#333333] p-3"
          onClick={() => {
            setFairDetailsOpen(!fairDetailsOpen);
          }}
        >
          <div className="space-y-1">
            <button className="text-white flex items-center space-x-2">
              Fair Details &nbsp;{" "}
              <div>{fairDetailsOpen ? <DownOutlined /> : <UpOutlined />}</div>
            </button>
            <div className="text-xs text-zinc-400">
              Other charges and Extra km charges
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Search;
