/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DetailsCarCard from "../components/DetailsCarCard";
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Segmented,
  Select,
  Space,
  message,
} from "antd";
import axios from "../api/axios";
import Logo from "../assets/images/logo.png";
import { Option } from "antd/es/mentions";
import { useLocation, useNavigate } from "react-router-dom";

import { ISettings } from "../types/settings.types";
import { IRoute } from "../types/routes.types";
import {
  ArrowRightOutlined,
  UpOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { Context } from "../context/context.provider";
import { BookingConfirmed } from "../components/BookingConfirmed";

const { Panel } = Collapse;

interface RazorpayResponse {
  amount: number;
  id: string;
  currency: string;
}

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: string;
  currency: string;
  name: string;
  description: string;
  image: { logo: string };
  order_id: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

const ReadBeforeYouBook = () => {
  return (
    <>
      <div className="bg-white border my-3 rounded-lg">
        <Collapse accordion className="bg-white rounded-2xl border-none">
          <Panel header="Read before you book!" key="1">
            {/* <div className="font-medium text-2xl mb-4">Read before you book!</div> */}
            <div
              className="lg:flex gap-8
                    lg:w-[730px]
                    "
            >
              <div className="lg:w-1/2 space-y-4">
                <div className="space-y-2">
                  <div className="font-bold">Cab Category</div>
                  <div className="w-full text-zinc-500 text-sm">
                    The booking will be for cab type HATCHBACK and we do not
                    commit on providing the preferred cab model (Indica, Swift
                    or similar)
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Hilly Regions</div>
                  <div className="w-full text-zinc-500 text-sm">
                    AC will be switched off in hilly areas
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Luggage Policy</div>
                  <div className="w-full text-zinc-500 text-sm">
                    HATCHBACK has space for 1 Luggage Bag. In case the car
                    happens to be CNG, the luggage space will be lesser. However
                    depending on the number of passengers, luggage can be
                    adjusted in seating area with driver consent.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Driver Details</div>
                  <div className="w-full text-zinc-500 text-sm">
                    Driver details will be shared up to 30 mins prior to
                    departure. Incase the driver/cab that reaches you for pick
                    up is different from what we have communicated, please don't
                    board the cab and call us for assistance.
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <div className="space-y-2">
                  <div className="font-bold">Stops</div>
                  <div className="w-full text-zinc-500 text-sm">
                    This is a point to point booking and only one stop for meals
                    is included.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Waiting Charges</div>
                  <div className="w-full text-zinc-500 text-sm">
                    Driver would wait maximum 45 minutes from your scheduled
                    pickup time at your pickup location. Post this, your trip
                    may get cancelled without any refund. If there is a mutual
                    agreement between customer and driver, waiting charges would
                    be Rs 2.0/min.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Delays</div>
                  <div className="w-full text-zinc-500 text-sm">
                    Due to traffic or any other unavoidable reason, pickup may
                    be delayed by 30 mins.
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-bold">Receipts</div>
                  <div className="w-full text-zinc-500 text-sm">
                    You need to collect receipts from the driver for any extra
                    charges paid directly to the driver during the trip. MMT is
                    not liable to provide invoices for such amounts.
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

const OnTripDosAndDonts = () => {
  return (
    <>
      <div className="bg-white border my-3  rounded-lg">
        <Collapse accordion className="bg-white rounded-2xl border-none">
          <Panel header="On Trip Do's & Don'ts" key="2">
            {/* <div className="font-medium text-2xl mb-4">On Trip Do's & Don'ts</div> */}
            <div
              className="lg:flex gap-8
            lg:w-[730px]
          "
            >
              <div className="space-y-1 text-sm">
                <div className="w-full">
                  ● You have booked our eco-friendly / cng service tier. Your
                  trip will be served with a *vehicle fueled by cng*
                </div>
                <div className="w-full">
                  ● When you book our value or cng service tiers, we only
                  promise to provide a vehicle of a certain category (compact,
                  sedan, suv etc). We do not guarantee a specific model of car.
                  To choose a specific vehicle model you must book in premium
                  service tier.
                </div>
                <div className="w-full">
                  ● On-journey stops or waypoints are not allowed unless part of
                  itinerary and written in this confirmation email.
                </div>
                <div className="w-full">
                  ● A single 15-minute complimentary on journey break is
                  included for point-to-point trips longer than 4 hours.
                </div>
                <div className="w-full">
                  ● 30 min rest for driver and/or change of vehicle for more
                  than 4 hours continuous drive is customary. This is to ensure
                  safe driving.
                </div>
                <div className="w-full">
                  ● Drivable kms in your quote are estimates. You will be billed
                  for the actual distance travelled. If you have not provided
                  the exact address before your pickup the booking amount is
                  estimate for travel from city center to city center. Actual
                  distance travelled may differ based on exact addresses and/or
                  itinerary.
                </div>
                <div className="w-full">
                  ● Driver may not agree to any changes to route or itinerary.
                  Any changes, additions of waypoints, pick-up points, drop
                  points, halts, destination cities or sightseeing spots are
                  absolutely not authorized unless they are added to your
                  itinerary and confirmed in writing through a booking
                  confirmation email. Changes to itinerary may lead to price
                  changes.
                </div>
                <div className="w-full">
                  ● Ac may be switched off only in hilly regions (high altitude)
                  to prevent engine overload.
                </div>
                <div className="w-full">
                  ● "You agree to make payments for your trip as per the
                  following payment schedule. (1) advance payment to Bombay taxi
                  company at time of booking. (2) 50% of remaining payable
                  amount to driver upon boarding (3) daily part payments of
                  remaining amount to driver in equal parts "
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

const OtherTerms = () => {
  return (
    <>
      <div className="bg-white border my-3  rounded-lg">
        <Collapse accordion className="bg-white rounded-2xl border-none">
          <Panel header="Other Terms" key="3">
            {/* <div className="font-medium text-2xl mb-4">Other Terms</div> */}
            <div
              className="lg:flex gap-8
            lg:w-[730px]
          "
            >
              <div className="space-y-1 text-sm">
                <div className="w-full">
                  ● Should you have any questions we recommend you read our
                  frequently asked questions at https://Bombay taxi
                  company.com/FAQ or you may request a callback from our team.
                  Be sure to be logged in and give your booking id when
                  requesting a call back. This helps us find your reservation
                  and prioritizes your call in the call queue.
                </div>
                <div className="w-full">
                  ● One day means one calendar day (12 am midnight to 11.59 pm
                  next day).
                </div>
                <div className="w-full">
                  ● Vehicle fuel type shall be subject to availability. We do
                  not commit to serve you with vehicle of a specific fuel type
                  (petrol / diesel / ev etc)
                </div>
                <div className="w-full">
                  ● Pickup may be delayed by 30 minutes at most due to traffic
                  conditions or other unavoidable circumstances.
                </div>
                <div className="w-full">
                  ● You are solely responsible for managing your own travel
                  schedule. Please budget for traffic delays and unforeseen
                  delays as those are beyond our control. Bombay taxi company
                  shall not be liable for any compensation if you happen to miss
                  your flight, train or bus due to delayed pickup, traffic jam,
                  road blockage / diversion or any other reason during the trip.
                </div>
                <div className="w-full">
                  ● Please do not share your personal banking or payment card
                  details like passwords, cvv etc. With any third party claiming
                  to be Bombay taxi company representatives. For any query,
                  please reach out to our official customer care number and/or
                  raise a call back request.
                </div>
                <div className="w-full">
                  ● Your reservation is subject to Bombay taxi company terms and
                  conditions. (http://www.Bombay taxi company.com/terms). We
                  will contact you via email for feedback after this trip.
                  Please promptly write a review so we can address any concerns
                  you raise in conformance with the terms & conditions of this
                  reservation. Our ability to address grievances is severely
                  limited if your feedback is received after 7 calendar days of
                  completion of your trip.
                </div>
                <div className="w-full">
                  ● It is required that the entire itinerary be documented in
                  your reservation. The quoted price will change based on
                  multiple factors including but not limited to the itinerary,
                  waypoints, driving terrain, local union fees, local
                  restrictions and estimated distances to be driven.
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

const PreBoardingGuidelines = () => {
  return (
    <>
      <div className="bg-white border my-3  rounded-lg">
        <Collapse accordion className="bg-white rounded-2xl border-none">
          <Panel header="Pre-boarding guidelines" key="4">
            {/* <div className="font-medium text-2xl mb-4">
            Pre-boarding guidelines
          </div> */}
            <div
              className="lg:flex gap-8
            lg:w-[730px]
          "
            >
              <div className="space-y-1 text-sm">
                <div className="w-full">
                  ● Check identification of the driver
                </div>
                <div className="w-full">
                  ● Are there changes in your trip start address ? -- first
                  update the pickup address with Bombay taxi company. For safety
                  and security reasons, driver is unable start the trip from a
                  location other than the one provided in the booking.
                </div>
                <div className="w-full">
                  ● Do not ride if the vehicle is not commercially licensed.
                  (yellow license plate)
                </div>
                <div className="w-full">
                  ● Do not ride if the vehicle and/or driver information do not
                  match the information provided by Bombay taxi company.
                </div>
                <div className="w-full">
                  ● Bombay taxi company shall not be responsible or liable in
                  any manner if you choose to ride in a vehicle that is not
                  commercially licensed or ride with a driver or vehicle other
                  than the one that we have assigned to you.
                </div>
                <div className="w-full">
                  ● You may ask the driver for identification to ensure that you
                  are riding with the correct driver. Drivers may ask for your
                  identification too. Failure to provide identification will
                  make your booking subject to cancellation at your cost.
                </div>
                <div className="w-full">
                  ● Provide the one-time password (otp) to the driver to start
                  the trip.
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </>
  );
};

const Details: React.FC = () => {
  const { userAuthenticated, setOpenAuthModal } = Context();

  const [form] = Form.useForm();

  const { state } = useLocation();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<ISettings | null>(null);
  const [couponId, setCouponId] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscountedAmount, setCouponDiscountedAmount] =
    useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("advance");
  const [paymentSelectionOpen, setPaymentSelectionOpen] =
    useState<boolean>(false);
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const tripType = state.tripType || null;
  const taxiRate = state.taxi_rate || null;
  const route: IRoute = state.route || null;
  const pickupDate: Dayjs = dayjs(state.pickupDate) || null;
  const returnDate: Dayjs = dayjs(state.returnDate) || null;
  const pickupTime = state.pickupTime || null;
  const pickupCityId = state.pickupCityId || null;
  const hourlyPackage = state.hourlyPackage || null;
  const cancellationDeadline = dayjs(
    `${pickupDate.format("YYYY-MM-DD")} ${pickupTime}`
  ).subtract(2, "hour");

  const onOtherCheckboxChange = (e: any) => {
    setIsOtherChecked(e.target.checked);
  };

  const calcAdvancePay = () => {
    return Math.round(
      taxiRate.discountedPrice *
        (parseInt(settings?.advancePaymentPercentage || "0") / 100)
    )?.toLocaleString();
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/settings/get");

        console.log(response.data);
        setSettings(response.data.settings);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchSettings();
  }, []);

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post("/coupons/apply-coupon", {
        couponCode,
        amount: taxiRate.discountedPrice,
      });

      setCouponDiscountedAmount(response.data.discountedAmount);
      setCouponId(response.data.couponId);
      message.success("Coupons applied successfully!");
    } catch (error: any) {
      // Check if the error is due to an invalid coupon code (404 status)
      if (error.response && error.response.status === 404) {
        setCouponDiscountedAmount(0);
        message.error("Invalid coupon code. Please check and try again.");
      } else {
        console.error("Error applying coupon:", error);
        // Handle other errors as needed
      }
    }
  };

  const handleClearCoupon = async () => {
    setCouponId(null);
    setCouponCode("");
    setCouponDiscountedAmount(0);
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setPaymentType(e.target.value);
  };

  function loadScript(src: string): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const handlePaymentSuccess = async () => {
    // Simulate payment success
    setShowConfirmationModal(true);

    setTimeout(() => {
      setShowConfirmationModal(false);
      navigate("/profile"); // Redirect to profile after 5 seconds
    }, 5000);
  };

  async function displayRazorpay(booking: any) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const result = await axios.post<RazorpayResponse>(
        `${import.meta.env.VITE_BASE_URL}/payments/orders`,
        booking
      );

      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options: RazorpayOptions = {
        key: import.meta.env.VITE_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "Bombay Taxi Co.",
        description: "Test Transaction For Payment",
        image: { logo: Logo }, // Replace with your logo URL
        order_id: order_id,
        handler: async function (response: RazorpayHandlerResponse) {
          const data = {
            amount,
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            booking,
          };

          const result = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/payments/success`,
            data
          );

          if (result.data.msg === "success") {
            message.success("Booking created successfully");
            handlePaymentSuccess();
          }
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#eab308",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handlePayNow = () => {
    if (!userAuthenticated) {
      setOpenAuthModal(true);
      return;
    }

    form
      .validateFields()
      .then(() => {
        const formValues = form.getFieldsValue();

        console.log(formValues);

        const booking = {
          route_id: route?._id ?? null,
          trip_type: tripType,
          pick_up_date: pickupDate?.format("YYYY-MM-DD"),
          return_date: returnDate?.format("YYYY-MM-DD"),
          pick_up_time: pickupTime,
          pickup_address: formValues.pickupAddress,
          drop_address: formValues.dropoffAddress,
          requested_taxi_type: taxiRate.taxiType._id,
          payment: paymentType,
          pickup_city: pickupCityId,
          hourly_package: hourlyPackage,
          coupon_id: couponId,
          base_fare: couponDiscountedAmount || taxiRate.discountedPrice,
          //
          name: formValues.name,
          gender: formValues.gender,
          emailId: formValues.emailId,
          contactNumber: formValues.contactNumber,
          pincode: formValues.pincode,
          address: formValues.address,
          //
          numberOfPassengers: formValues.numberOfPassengers,
          numberOfSmallBags: formValues.numberOfSmallBags,
          numberOfLargeBags: formValues.numberOfLargeBags,
          seniorCitizen: formValues.seniorCitizen,
          womenTraveling: formValues.womenTraveling,
          kidsOnBoard: formValues.kidsOnBoard,
          englishSpeakingDriver: formValues.englishSpeakingDriver,
          carryingPet: formValues.carryingPet,
          need7Plus1Seater: formValues.need7Plus1Seater,
          carrierOverTop: formValues.carrierOverTop,
          bookingForSomeoneElse: formValues.bookingForSomeoneElse,
          otherDetails: formValues.otherDetails,
        };

        console.log(booking);

        displayRazorpay(booking);
      })
      .catch((error) => {
        console.error("Form validation failed:", error);
      });
  };

  // const PaymentCard = () => {
  //   return (
  //     <>
  //       <div className='min-w-full lg:min-w-[320px] max-w-xs lg:w-full m-3 sticky top-6 '>
  //         <div className='bg-[#FEF0CF] p-4 text-xs rounded-t-lg'>
  //           Free Cancellation Before 12 Jun 2023, 09:00 Am Ist
  //         </div>
  //         <div className='bg-white border-2 rounded-b-lg p-4'>
  //           <div>
  //             <Radio.Group onChange={onChange} value={paymentType}>
  //               <Space direction="vertical">
  //                 <Radio value={"advance"}>
  //                   <div className=''>
  //                     <div className='font-semibold text-lg'>
  //                       PAY ADVANCE - ₹ {calcAdvancePay()}
  //                     </div>
  //                     <div className='text'>
  //                       Rest to the Driver
  //                     </div>
  //                   </div>
  //                 </Radio>
  //                 <Radio value={"full"}>
  //                   <div className=''>
  //                     <div className='font-semibold text-lg'>
  //                       PAY FULL - ₹ {couponDiscountedAmount || taxiRate.discountedPrice}
  //                     </div>
  //                   </div>
  //                 </Radio>
  //               </Space>
  //             </Radio.Group>
  //           </div>
  //           <hr className='my-4' />
  //           <div className='space-y-2'>
  //             <div>
  //               Enter Coupon Code
  //             </div>
  //             <div>
  //               <Space.Compact style={{ width: '100%' }}>
  //                 <Input
  //                   className='border-r-0 rounded-lg'
  //                   placeholder="Eg. FIRST203"
  //                   value={couponCode}
  //                   onChange={(e) => setCouponCode(e.target.value)}
  //                 />
  //                 <Button
  //                   className='font-semibold text-[#FDB813] border-l-0'
  //                   onClick={handleApplyCoupon}
  //                 >
  //                   APPLY
  //                 </Button>
  //               </Space.Compact>
  //             </div>
  //           </div>
  //           <hr className='my-4' />
  //           <div className='my-4'>
  //             <div className='w-full flex justify-between items-end'>
  //               <div className='font-semibold text-xl'>
  //                 Total Amount
  //               </div>
  //               <div className='space-x-3'>
  //                 <span
  //                   className='font-semibold'
  //                   style={{ textDecoration: 'line-through', textDecorationColor: '#EAB308' }}
  //                 >
  //                   ₹ {taxiRate.originalPrice}
  //                 </span>
  //                 <span className='text-2xl font-bold'>₹ {couponDiscountedAmount || taxiRate.discountedPrice}</span>
  //               </div>
  //             </div>
  //             <div className='w-full flex justify-between items-end'>
  //               <div className='font-semibold'>
  //                 Inclusive of GST
  //               </div>
  //               <div className='space-x-3'>
  //                 <span className='font-bold text-[#FDB813]'>{(taxiRate.taxiType.discount_percentage).toString() || ''}% OFF</span>
  //               </div>
  //             </div>
  //           </div>
  //           <button onClick={handlePayNow} className='hidden lg:flex bg-[#FDB813] hover:bg-yellow-400 rounded-lg  justify-center items-center text-xl font-medium w-full py-4'>
  //             PAY NOW
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   )
  // }

  return (
    <>
      <Modal
        footer={null}
        open={showConfirmationModal}
        closable={false}
        centered
      >
        <BookingConfirmed />
      </Modal>
      <div
        className={`${
          paymentSelectionOpen ? "" : "hidden"
        } fixed top-0 left-0 w-screen h-screen bg-black opacity-70 z-30`}
        onClick={() => setPaymentSelectionOpen(!paymentSelectionOpen)}
      />
      <div className="bg-[#ececf4]">
        <div className="flex justify-center">
          <div
            className="flex container justify-center
            flex-col items-center
            lg:flex-row lg:items-start
          "
          >
            <div className="px-1">
              <>
                <div className="bg-[#FDB813] border pt-2 px-4 rounded-b-lg -mx-4 -mb-6 pb-8">
                  <div
                    className="flex h-full
                      flex-col
                      lg:flex-row
                    "
                  >
                    <div>
                      <div className="">
                        <div className="font-bold text-xl flex items-center gap-2 pb-2">
                          Review Booking
                        </div>
                        {tripType === "Hourly Rental" ? (
                          <>
                             <div className="font-bold flex items-center gap-0.5">
                              <div>{state?.pickupCity}</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-bold flex items-center gap-0.5">
                              <div>{state?.from}</div>
                              {state?.to && (
                                <div>
                                  <ArrowRightOutlined className="rounded-full p-1" />
                                </div>
                              )}
                              {state?.to && <div>{state?.to}</div>}
                            </div>
                          </>
                        )}
                        <div className="flex gap-2 text-sm">
                          <div className="font-medium">
                            {tripType} | Pickup:{" "}
                            {pickupDate.format("ddd, D MMM YYYY")}, {pickupTime}
                          </div>
                        </div>
                        {tripType === "Round Trip" && returnDate && (
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Return Date:</div>
                            <div>{returnDate.format("D MMM YYYY")}</div>
                          </div>
                        )}
                        {tripType === "Hourly Rental" && (
                          <div className="flex gap-2 text-sm">
                            <div className="font-medium">Selected Package:</div>{" "}
                            {hourlyPackage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
              <DetailsCarCard
                carImage={taxiRate.taxiType?.image}
                category={taxiRate.taxiType?.name || ""}
                description={taxiRate.taxiType?.description || ""}
                features={taxiRate.taxiType?.car_features || []}
                originalPrice={taxiRate.originalPrice || ""}
                discountedPrice={taxiRate.discountedPrice || ""}
                discount={
                  taxiRate.taxiType.discount_percentage.toString() || ""
                }
                preview
              />
              <>
                <div
                  className="flex h-full
                  flex-col
                  lg:flex-row
                "
                >
                  <div className="lg:w-1/2 bg-white border my-3 mr-3 p-4 rounded-lg shadow-lg">
                    <div className="font-medium text-2xl mb-4">Inclusions</div>
                    <div className="mx-4 mb-4">
                      <ul className="list-disc space-y-2 text-sm">
                        <li>State Tax</li>
                        <li>Toll Charges</li>
                        <li>
                          {tripType === "Round Trip"
                            ? route?.round_trip_km || 0
                            : tripType === "Hourly Rental"
                            ? 0
                            : route?.one_way_trip_km || 0}{" "}
                          Kms
                        </li>
                        <li>Driver Allowance</li>
                        <li>
                          Only One Pickup and Drop
                          <span className="text-xs text-zinc-500">
                            {" "}
                            ( Only one included ){" "}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="lg:w-1/2 bg-white border my-3 ml-3  p-4 rounded-lg shadow-lg">
                    <div className="font-medium text-2xl mb-4">Exclusions</div>
                    <div className="mx-4 mb-4">
                      <ul className="list-disc space-y-2 text-sm">
                        <li>
                          <div className="flex">
                            <div className="flex-grow">Waiting Charges</div>
                            <div className="text-right w-24 font-semibold">
                              After 45 mins, ₹{" "}
                              {settings?.waitingChargesPerMinute?.toLocaleString()}
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex-grow">
                              Fare beyond{" "}
                              {tripType === "Round Trip"
                                ? route?.round_trip_km || 0
                                : tripType === "Hourly Rental"
                                ? 0
                                : route?.one_way_trip_km || 0}{" "}
                              Kms
                            </div>
                            <div className="text-right w-24 font-semibold">
                              ₹{" "}
                              {taxiRate.taxiType.extra_km_charges?.toLocaleString()}
                              /Km
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
              <>
                <div className="">
                  <Form
                    form={form}
                    layout="vertical"
                    name="tripDetailsForm"
                    onFinish={() => {}}
                    className="mt-4"
                  >
                    <div className="bg-white border my-4 p-4 rounded-lg shadow-lg">
                      <div className="font-medium text-2xl mb-4">
                        Contact Details
                        <div className="text-xs text-zinc-400">ADULT</div>
                      </div>

                      <div className="lg:flex w-full gap-10">
                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">Name</div>
                            </div>
                          }
                          name="name"
                          rules={[
                            {
                              required: true,
                              message: "Please enter you Name!",
                            },
                            {
                              pattern: /^[A-Za-z\s]+$/,
                              message: "Name can only contain letters and spaces!",
                            },
                          ]}
                        >
                          <Input placeholder="Enter your full name" />
                        </Form.Item>

                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">Gender</div>
                            </div>
                          }
                          name="gender"
                          rules={[
                            {
                              required: true,
                              message: "Please select your gender!",
                            },
                          ]}
                          initialValue="male"
                        >
                          <Segmented
                            defaultValue={"male"}
                            className="rounded-full"
                            options={[
                              { label: "Male", value: "male" },
                              { label: "Female", value: "female" },
                            ]}
                          />
                        </Form.Item>
                      </div>

                      <div className="lg:flex w-full gap-10">
                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">Email Id</div>
                              <div className="text-xs text-zinc-400">
                                {" "}
                                (Your booking confirmation will be sent here)
                              </div>
                            </div>
                          }
                          rules={[
                            {
                              required: true,
                              type: "email",
                              message: "Please enter your email address!",
                            },
                          ]}
                          name="emailId"
                        >
                          <Input placeholder="Enter your full name" />
                        </Form.Item>
                      </div>

                      <div className="lg:flex w-full gap-10">
                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">
                                Contact Number
                              </div>
                            </div>
                          }
                          name="contactNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your contact number!",
                            },
                            {
                              pattern: new RegExp(/^\d+$/),
                              message: "Please enter a valid contact number!",
                            },
                            {
                              len: 10,
                              message:
                                "Contact number must be exactly 10 digits long.",
                            },
                          ]}
                        >
                          <Input
                            type="tel"
                            placeholder="Enter your contact number"
                            maxLength={10}
                            addonBefore="+91"
                          />
                        </Form.Item>

                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">
                                WhatsApp Number
                              </div>
                            </div>
                          }
                          name="alternateContactNumber"
                          rules={[
                            {
                              pattern: new RegExp(/^\d+$/),
                              message: "Please enter a valid contact number!",
                            },
                            // {
                            //   len: 10,
                            //   message:
                            //     "Contact number must be exactly 10 digits long.",
                            // },
                          ]}
                        >
                          <Input
                            type="tel"
                            placeholder="Enter your alternate contact number (Optional)"
                            maxLength={10}
                          />
                        </Form.Item>
                      </div>

                      <div className="mb-4">
                        By proceeding to book, I Agree to Bombay Taxi's{" "}
                        <a
                          href="/privacy-policy"
                          className="text-[#FDB813] hover:underline"
                        >
                          Privacy Policy{" "}
                        </a>
                        {/* <a className='text-[#FDB813] hover:underline'>
                            User Agreement{' '}
                          </a> */}
                        and
                        <a
                          href="/terms-conditions"
                          className="text-[#FDB813] hover:underline"
                        >
                          Terms of Service{" "}
                        </a>
                      </div>

                      {/* <div className="lg:flex items-center my-4 space-x-1">
                        <div className="font-semibold text-lg">
                          Your pincode and state
                        </div>
                        <div className="text-xs text-zinc-400">
                          (Required for GST purpose on your tax invoice. You can
                          edit this anytime later in your profile section.)
                        </div>
                      </div> */}

                      <div className="lg:flex w-full gap-5">
                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">Pincode</div>
                            </div>
                          }
                          name="pincode"
                        >
                          <Input placeholder="Your Pincode" />
                        </Form.Item>

                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">State</div>
                            </div>
                          }
                          name="state"
                        >
                          <div
                            placeholder="Select State"
                            defaultValue={"Maharashtra"}
                          >
                            {/* Add Option for each state */}
                            <div>Maharashtra</div>
                            {/* Add more states as needed */}
                          </div>
                        </Form.Item>

                        <Form.Item
                          className="w-full"
                          label={
                            <div className="flex items-center space-x-1">
                              <div className="font-semibold">Address</div>
                            </div>
                          }
                          name="address"
                        >
                          <Input placeholder="Your Address (Optional)" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* <Form.Item
                          name="termsAndConditions"
                          valuePropName="checked"
                          >
                          <div className='flex items-center my-4 space-x-2'>
                          <input type="checkbox" />
                          <div>
                              Confirm and save billing details to your profile
                            </div>
                          </div>
                        </Form.Item> */}

                    {/* <Form.Item name="termsAndConditions" valuePropName="checked">
                          <Checkbox value="seniorCitizen">Confirm and save billing details to your profile</Checkbox>
                        </Form.Item> */}

                    <div className="bg-white border my-4 p-4 rounded-lg shadow-lg">
                      <div className="font-medium text-2xl mb-4">
                        Itenary Details
                      </div>
                      <Form.Item
                        label={
                          <div className="lg:flex items-center gap-1">
                            <div className="font-semibold">Pick-up Address</div>
                            <div className="text-xs text-zinc-400">
                              (This will help our driver reach you on time)
                            </div>
                          </div>
                        }
                        name="pickupAddress"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the pick-up address!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter exact pick-up address/nearby location/ building name" />
                      </Form.Item>
                      <Form.Item
                        label={
                          <div className="lg:flex items-center gap-1">
                            <div className="font-semibold">
                              Drop-off Address
                            </div>
                            <div className="text-xs text-zinc-400">
                              {" "}
                              (This will help you avoid any extra charges after
                              the trip)
                            </div>
                          </div>
                        }
                        name="dropoffAddress"
                        rules={[
                          {
                            required: true,
                            message: "Please enter the drop-off address!",
                          },
                        ]}
                      >
                        <Input placeholder="Enter drop address to know the exact fare & avoid extra changes after the trip" />
                      </Form.Item>
                    </div>

                    <div className="bg-white border my-4 p-4 rounded-lg shadow-lg">
                      <div className="font-medium text-2xl mb-4">
                        Additional details
                      </div>

                      <div className="lg:flex w-full gap-10">
                        <Form.Item
                          className="w-full lg:w-1/3"
                          label="No. of passengers"
                          name="numberOfPassengers"
                        >
                          <Select placeholder="Select number of passengers">
                            {[...Array(10)].map((_, index) => (
                              <Option
                                key={(index + 1).toString()}
                                value={(index + 1).toString()}
                              >
                                {index + 1}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          className="w-full lg:w-1/3"
                          label="No. of large bags"
                          name="numberOfLargeBags"
                        >
                          <Select placeholder="Select number of large bags">
                            {[...Array(5)].map((_, index) => (
                              <Option
                                key={index.toString()}
                                value={index.toString()}
                              >
                                {index}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>

                        <Form.Item
                          className="w-full lg:w-1/3"
                          label="No. of small bags"
                          name="numberOfSmallBags"
                        >
                          <Select placeholder="Select number of small bags">
                            {[...Array(5)].map((_, index) => (
                              <Option
                                key={index.toString()}
                                value={index.toString()}
                              >
                                {index}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>

                      <div className="pb-4">
                        Please provide additional information to help us to
                        serve you better.
                      </div>

                      <div className="lg:flex w-full">
                        <div className="lg:w-1/3">
                          <Form.Item
                            name="seniorCitizen"
                            valuePropName="checked"
                          >
                            <Checkbox value="seniorCitizen">
                              Senior citizen traveling
                            </Checkbox>
                          </Form.Item>

                          <Form.Item
                            name="womenTraveling"
                            valuePropName="checked"
                          >
                            <Checkbox value="womenTraveling">
                              Women traveling
                            </Checkbox>
                          </Form.Item>

                          <Form.Item name="kidsOnBoard" valuePropName="checked">
                            <Checkbox value="kidsOnBoard">
                              Kids on board
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <div className="lg:w-1/3">
                          <Form.Item
                            name="need7Plus1Seater"
                            valuePropName="checked"
                          >
                            <Checkbox value="need7Plus1Seater">
                              Need 7+1 seater
                            </Checkbox>
                          </Form.Item>
                          <Form.Item
                            name="carrierOverTop"
                            valuePropName="checked"
                          >
                            <Checkbox value="carrierOverTop">
                              Carrier over the top of vehicle
                            </Checkbox>
                          </Form.Item>
                          <Form.Item
                            name="bookingForSomeoneElse"
                            valuePropName="checked"
                          >
                            <Checkbox value="bookingForSomeoneElse">
                              Booking for someone else
                            </Checkbox>
                          </Form.Item>
                          {isOtherChecked && (
                            <Form.Item name="otherDetails">
                              <Input.TextArea
                                placeholder="Please specify"
                                autoSize={{ minRows: 3, maxRows: 3 }}
                                style={{ resize: "none" }}
                              />
                            </Form.Item>
                          )}
                        </div>
                        <div className="lg:w-1/3">
                        <Form.Item
                            name="englishSpeakingDriver"
                            valuePropName="checked"
                          >
                            <Checkbox value="englishSpeakingDriver">
                              English-speaking driver preferred
                            </Checkbox>
                          </Form.Item>
                          <Form.Item name="carryingPet" valuePropName="checked">
                            <Checkbox value="carryingPet">
                              Carrying Pet
                            </Checkbox>
                          </Form.Item>
                          <Form.Item name="other" valuePropName="checked">
                            <Checkbox
                              onChange={onOtherCheckboxChange}
                              value="other"
                            >
                              Other
                            </Checkbox>
                          </Form.Item>
                          {isOtherChecked && (
                            <Form.Item name="otherDetails">
                              <Input.TextArea
                                placeholder="Please specify"
                                autoSize={{ minRows: 3, maxRows: 3 }}
                                style={{ resize: "none" }}
                              />
                            </Form.Item>
                          )}
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </>
              <ReadBeforeYouBook />
              <OnTripDosAndDonts />
              <OtherTerms />
              <PreBoardingGuidelines />
            </div>
            <>
              <div className="min-w-full lg:min-w-[320px] max-w-xs lg:w-full m-3 sticky top-36">
                <div className="bg-[#FEF0CF] p-4 text-xs rounded-t-lg">
                  Free Cancellation Before{" "}
                  {cancellationDeadline.format("D MMM YYYY, hh:mm A")} Ist
                </div>
                <div className="bg-white border-2 rounded-b-lg p-4">
                  <div>
                    <Radio.Group onChange={onChange} value={paymentType}>
                      <Space direction="vertical">
                        <Radio value={"advance"}>
                          <div className="">
                            <div className="font-semibold text-lg">
                              PAY ADVANCE - ₹ {calcAdvancePay()}
                            </div>
                            <div className="text">Rest to the Driver</div>
                          </div>
                        </Radio>
                        <Radio value={"full"}>
                          <div className="">
                            <div className="font-semibold text-lg">
                              PAY TOTAL - ₹{" "}
                              {couponDiscountedAmount ||
                                taxiRate.discountedPrice?.toLocaleString()}
                            </div>
                          </div>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                  <hr className="my-4" />
                  <div className="space-y-2">
                    <div>Enter Coupon Code</div>
                    <div>
                      <Space.Compact style={{ width: "100%" }}>
                        <Input
                          className="border-r-0 rounded-lg"
                          placeholder="Eg. FIRST203"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        {couponDiscountedAmount ? (
                          <Button
                            className="font-semibold text-[#FDB813] border-l-0"
                            onClick={handleClearCoupon}
                          >
                            CLEAR
                          </Button>
                        ) : (
                          <Button
                            className="font-semibold text-[#FDB813] border-l-0"
                            onClick={handleApplyCoupon}
                          >
                            APPLY
                          </Button>
                        )}
                      </Space.Compact>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="my-4">
                    {paymentType === "full" ? (
                      <div className="w-full flex justify-between items-end">
                        <div className="font-semibold text-xl">
                          Total Amount
                        </div>
                        <div className="space-x-3">
                          <span
                            className="font-semibold"
                            style={{
                              textDecoration: "line-through",
                              textDecorationColor: "#EAB308",
                            }}
                          >
                            ₹ {taxiRate.originalPrice?.toLocaleString()}
                          </span>
                          <span className="text-2xl font-bold">
                            ₹{" "}
                            {couponDiscountedAmount ||
                              taxiRate.discountedPrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-end">
                        <div className="font-semibold text-xl">
                          Advance Amount
                        </div>
                        <div className="space-x-3">
                          <span className="text-2xl font-bold">
                            ₹ {calcAdvancePay()}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="w-full flex justify-between items-end">
                      <div className="font-semibold">Inclusive of GST</div>
                      <div className="space-x-3">
                        <span className="font-bold text-[#FDB813]">
                          {taxiRate.taxiType.discount_percentage.toString() ||
                            ""}
                          % OFF
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handlePayNow}
                    className="hidden lg:flex bg-[#FDB813] hover:bg-yellow-400 rounded-lg  justify-center items-center text-xl font-medium w-full py-4"
                  >
                    PAY NOW
                  </button>
                </div>
              </div>
            </>
            <div className="lg:hidden sticky bottom-0 h-full w-full z-40">
              <div
                className={`${
                  paymentSelectionOpen ? "hidden" : ""
                } bg-[#f0e4c8] p-2 text-xs rounded-t-lg`}
              >
                Free Cancellation Before{" "}
                {cancellationDeadline.format("D MMM YYYY, hh:mm A")} Ist
              </div>
              <div className={`${paymentSelectionOpen ? "" : "hidden"}`}>
                <div className="bg-white p-3">
                  <div className="font-semibold text-xl p-1">
                    Payment options
                  </div>
                  <Radio.Group onChange={onChange} value={paymentType}>
                    <Space direction="vertical">
                      <Radio value={"advance"}>
                        <div className="">
                          <div className="font-semibold text-lg">
                            PAY ADVANCE - ₹ {calcAdvancePay()}
                          </div>
                          <div className="text">Rest to the Driver</div>
                        </div>
                      </Radio>
                      <Radio value={"full"}>
                        <div className="">
                          <div className="font-semibold text-lg">
                            PAY FULL - ₹ {taxiRate.discountedPrice}
                          </div>
                        </div>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
              <div className="w-full flex justify-between items-center bg-[#333333] p-3">
                <div className="space-y-1">
                  <button
                    className="text-white flex items-center space-x-2"
                    onClick={() => {
                      setPaymentSelectionOpen(!paymentSelectionOpen);
                    }}
                  >
                    <div>
                      ₹{" "}
                      {paymentType === "advance"
                        ? calcAdvancePay()
                        : taxiRate.discountedPrice?.toLocaleString()}{" "}
                      due now
                    </div>
                    <div>
                      {paymentSelectionOpen ? <DownOutlined /> : <UpOutlined />}
                    </div>
                  </button>
                  <div className="text-xs text-zinc-400">
                    Pay the rest to the driver
                  </div>
                </div>
                <div>
                  <button
                    onClick={handlePayNow}
                    className="bg-[#FDB813] hover:bg-yellow-400 flex justify-center items-center rounded-full w-28 h-10 font-medium py-4"
                  >
                    PAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Details;
