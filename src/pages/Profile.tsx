/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { BookingStatus, IBooking, TripType } from "../types/bookings.types";
import Table, { ColumnsType } from "antd/es/table";
import { Tabs, message } from "antd";
import moment from "moment";
import axios from "../api/axios";
import TabPane from "antd/es/tabs/TabPane";
import Invoices from "./Invoices";

export const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("bookings");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const BookingsTAB: React.FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("All");
    const [statusCounts, setStatusCounts] = useState<Record<string, number>>(
      {}
    );
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [searchQuery] = useState<string>("");
    const [totalBookings, setTotalBookings] = useState<number>(0);

    interface DataType {
      _id: string;
      status: BookingStatus;
      fromTo: string;
      tripDates: string;
      customer: string;
      payment: string;
      tripType: string;
      totalAmount: string;
      dueAmount: string;
    }

    const columns: ColumnsType<DataType> = [
      {
        title: "BOOKING DATE & TIME",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 90,
        render: (text: string) => {
          // Use moment.js to format the date
          return moment(text).format('DD-MM-YYYY hh:mm A');
        },
      },
      // {
      //   title: "BOOKING ID",
      //   dataIndex: "_id",
      //   key: "_id",
      //   width: 120,
      // },
      {
        title: "TRIP TYPE",
        dataIndex: "tripType",
        key: "tripType",
        width: 60,
      },
      {
        title: "FROM TO",
        dataIndex: "fromTo",
        key: "fromTo",
        width: 100,
      },
      {
        title: "TRIP DATES",
        dataIndex: "tripDates",
        key: "tripDates",
        width: 120,
      },
      {
        title: "PAYMENT",
        dataIndex: "payment",
        key: "payment",
        width: 60,
      },
      {
        title: "TOTAL AMOUNT",
        dataIndex: "totalAmount",
        key: "totalAmount",
        width: 75,
      },
      {
        title: "DUE AMOUNT",
        dataIndex: "dueAmount",
        key: "dueAmount",
        width: 75,
      },
      {
        title: "ACTIONS",
        dataIndex: "actions",
        key: "actions",
        fixed: "right",
        width: 50,
        render: (_, booking) => (
          <div className="text-amber-500 font-bold flex flex-wrap space-x-1">
            <a
              onClick={() => {
                const bookingToEdit = bookings.find(
                  (b) => b._id === booking._id
                );
                navigate("/profile/booking", {
                  state: { booking: bookingToEdit },
                });
              }}
            >
              VIEW
            </a>
          </div>
        ),
      },
    ];

    const handleTabChange = (key: string) => {
      // Do something based on the selected tab key
      console.log(`Tab changed to: ${key}`);
      setActiveTab(key);
      console.log(activeTab);
    };

    const fetchData = async (page: number = 1) => {
      try {
        const response = await axios.get(
          "/bookings/user-booking-status-counts"
        ); // Replace with your actual API endpoint
        const data = response.data;

        console.log(data);

        // If the API returns an object with status counts, set it in the state
        if (data && typeof data === "object") {
          setStatusCounts(data);
        } else {
          message.error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to fetch data");
      }

      try {
        setLoading(true);

        const response = await axios.get("/bookings/user-bookings", {
          params: {
            page: page,
            pageSize: 10,
            filter:
              activeTab !== "All"
                ? JSON.stringify({ booking_status: activeTab })
                : JSON.stringify({ booking_status: "New" }),
            search: searchQuery,
          },
        });
        console.log(response.data.bookings);
        setBookings(response.data.bookings);
        setTotalBookings(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, [searchQuery, activeTab]);

    const handlePageChange = (page: number) => {
      fetchData(page);
    };

    const mapDataToTableFormat = (
      data: IBooking[]
    ): Array<{
      _id: string;
      status: BookingStatus;
      fromTo: string;
      tripDates: string;
      customer: string;
      payment: string;
    }> => {
      return data.map((booking) => {
        console.log(booking);

        const fromCity = booking.route_id?.from_id?.name || "Unknown";
        const toCity = booking.route_id?.to_id?.name || "Unknown";
        let fromTo = `${fromCity} to ${toCity}`;

        if (fromTo === "Unknown to Unknown") {
          fromTo = booking?.pickup_city?.name || "Unknown";
        }

        const payments =
          booking?.payments?.map((payment: any) => payment.payment) || [];
        const paymentsString = payments.join("+");

        const totalAmount = "₹" + booking.base_fare?.toFixed(2) || "₹0.00";
        const paymentsTotal =
          booking.payments?.reduce(
            (sum: any, payment: any) => sum + payment.amount / 100,
            0
          ) || 0;
        const dueAmount = booking.base_fare
          ? "₹" + (booking.base_fare - paymentsTotal).toFixed(2)
          : "---";

        let tripDates = moment(booking?.pick_up_date).format("DD-MM-YYYY");
        // If trip type is not 'OneWay', add the return date to the tripDates string
        if (booking.trip_type === TripType.Round && booking?.return_date) {
          tripDates += ` to ${moment(booking.return_date).format(
            "DD-MM-YYYY"
          )}`;
        }

        const createdAt = moment(booking?.createdAt).format("YYYY-MM-DD HH:mm");

        const tripType = booking.trip_type || "Unknown";

        return {
          _id: booking?._id || "",
          status: booking?.booking_status || BookingStatus.New,
          fromTo,
          tripDates,
          customer: booking?.user_id?.name || "",
          payment: paymentsString,
          createdAt,
          tripType,
          totalAmount,
          dueAmount,
        };
      });
    };

    const formattedData = mapDataToTableFormat(bookings);

    const renderTabTitle = (label: string, countKey: string) => (
      <span className="text-sm">
        {label} ({statusCounts[countKey] || 0})
      </span>
    );

    return (
      <>
        <div className="px-4">
          <div
            className="flex justify-between items-center w-full gap-x-4
            flex-col
            md:flex-row
          "
          >
            <Tabs
              className="font-light text-sm w-full"
              defaultActiveKey="1"
              tabPosition="top"
              onChange={handleTabChange}
            >
              <TabPane tab={renderTabTitle("Requested", "New")} key="New" />
              <TabPane
                tab={renderTabTitle("Upcoming", "Confirmed")}
                key="Confirmed"
              />
              <TabPane
                tab={renderTabTitle("Rescheduled", "Rescheduled")}
                key="Rescheduled"
              />
              <TabPane
                tab={renderTabTitle("Completed", "Completed")}
                key="Completed"
              />
              <TabPane
                tab={renderTabTitle("Cancelled", "Cancelled")}
                key="Cancelled"
              />
              <TabPane
                tab={renderTabTitle("Cancelled By You", "CancelledByUser")}
                key="CancelledByUser"
              />
            </Tabs>
            {/* <div className='flex space-x-3'>
              <Search
                size={'large'}
                placeholder="Search..."
                onChange={(e: any) => setSearchQuery(e.target.value)}
              />
            </div> */}
          </div>
          <Table
            columns={columns}
            dataSource={formattedData}
            pagination={{
              position: ["bottomRight"],
              pageSize: 10,
              total: totalBookings,
              onChange: handlePageChange,
            }}
            scroll={{
              y: 600,
            }}
            loading={loading}
          />
        </div>
      </>
    );
  };

  const ProfileTAB: React.FC = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

    return (
      <>
        <div className="px-4">
          <div className="text-2xl font-light">PROFILE</div>
          <div className="my-4 font-medium">
            <p>{userInfo.name || "N/A"}</p>
            <p>{userInfo.mobile_no || "N/A"}</p>
            <p>{userInfo.email || "N/A"}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-center">
      <div
        className="container flex 
      flex-col
      lg:flex-row
      "
      >
        <Sidebar handleTabChange={handleTabChange} />
        <div className="w-full">
          {selectedTab === "bookings" ? (
            <BookingsTAB />
          ) : selectedTab === "profile" ? (
            <ProfileTAB />
          ) : (
            <Invoices />
          )}
        </div>
      </div>
    </div>
  );
};
