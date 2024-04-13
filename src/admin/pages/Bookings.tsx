/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Tabs, Tag, message } from "antd";
import {
  CarOutlined,
  CarryOutOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InboxOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import axios from "../../api/axios";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import TabPane from "antd/es/tabs/TabPane";
import { BookingStatus, IBooking, TripType } from "../../types/bookings.types";

const Bookings: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalBookings, setTotalBookings] = useState<number>(0);

  const getStatusTag = (status: string | undefined) => {
    switch (status) {
      case BookingStatus.New:
        return (
          <Tag icon={<CheckCircleOutlined />} color="processing">
            New
          </Tag>
        );
      case BookingStatus.Confirmed:
        return (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Confirmed
          </Tag>
        );
      case BookingStatus.OnRide:
        return (
          <Tag icon={<CarOutlined />} color="warning">
            On Ride
          </Tag>
        );
      case BookingStatus.Completed:
        return (
          <Tag icon={<CarryOutOutlined />} color="success">
            Completed
          </Tag>
        );
      case BookingStatus.Cancelled:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Cancelled
          </Tag>
        );
      case BookingStatus.CancelledByUser:
        return (
          <Tag icon={<CloseCircleOutlined />} color="error">
            Cancelled By User
          </Tag>
        );
      case TripType.OneWay:
        return (
          <Tag icon={<SwapOutlined />} color="blue">
            One Way
          </Tag>
        );
      case TripType.Round:
        return (
          <Tag icon={<CarOutlined />} color="green">
            Round
          </Tag>
        );
      case TripType.Hourly:
        return (
          <Tag icon={<ClockCircleOutlined />} color="orange">
            Hourly
          </Tag>
        );
      default:
        return null;
    }
  };
  interface DataType {
    _id: string;
    status: BookingStatus;
    fromTo: string;
    tripDates: string;
    customer: string;
    payment: string;
    tripType: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "BOOKING DATE & TIME",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 90,
    },
    // {
    //   title: "BOOKING ID",
    //   dataIndex: "_id",
    //   key: "_id",
    //   width: 100,
    // },
    {
      title: "TRIP TYPE",
      dataIndex: "tripType",
      key: "tripType",
      width: 60,
      render: (_, booking) => {
        return getStatusTag(booking.tripType);
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (_, booking) => {
        return getStatusTag(booking.status);
      },
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
      title: "CUSTOMER",
      dataIndex: "customer",
      key: "customer",
      width: 100,
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
      width: 90,
    },
    {
      title: "DUE AMOUNT",
      dataIndex: "dueAmount",
      key: "dueAmount",
      width: 90,
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 100,
      render: (_, booking) => (
        <div className="text-amber-500 font-bold flex flex-wrap space-x-1">
          {/* <a>
                        CONFIRM
                    </a>
                    <div>
                        |
                    </div>
                    <a>
                        CANCEL
                    </a>
                    <div>
                        |
                    </div> */}
          <a
            onClick={() => {
              const bookingToEdit = bookings.find((b) => b._id === booking._id);
              navigate("/admin/bookings/details", {
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
      const response = await axios.get("/bookings/booking-status-counts"); // Replace with your actual API endpoint
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

      const response = await axios.get("/bookings", {
        params: {
          page: page,
          pageSize: 10,
          filter:
            activeTab !== "All"
              ? JSON.stringify({ booking_status: activeTab })
              : undefined,
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

      let tripDates = moment(booking?.pick_up_date).format("YYYY-MM-DD");
      // If trip type is not 'OneWay', add the return date to the tripDates string
      if (booking.trip_type !== TripType.OneWay && booking?.return_date) {
        tripDates += ` to ${moment(booking.return_date).format("YYYY-MM-DD")}`;
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

  const renderTabTitle = (
    icon: React.ReactNode,
    label: string,
    countKey: string
  ) => (
    <span>
      {icon}
      {label} ({statusCounts[countKey] || 0})
    </span>
  );

  return (
    <div className="px-10 py-6">
      <div className="">
        <div className="flex justify-between items-center w-full gap-x-4">
          <Tabs
            className="font-light"
            defaultActiveKey="1"
            tabPosition="top"
            onChange={handleTabChange}
          >
            <TabPane
              tab={renderTabTitle(<InboxOutlined />, "All", "All")}
              key="All"
            />
            <TabPane
              tab={renderTabTitle(<InboxOutlined />, "New", "New")}
              key="New"
            />
            <TabPane
              tab={renderTabTitle(
                <ClockCircleOutlined />,
                "Confirmed",
                "Confirmed"
              )}
              key="Confirmed"
            />
            <TabPane
              tab={renderTabTitle(<CarOutlined />, "On Ride", "On Ride")}
              key="On Ride"
            />
            <TabPane
              tab={renderTabTitle(
                <CheckCircleOutlined />,
                "Completed",
                "Completed"
              )}
              key="Completed"
            />
            <TabPane
              tab={renderTabTitle(
                <CloseCircleOutlined />,
                "Cancelled",
                "Cancelled"
              )}
              key="Cancelled"
            />
            <TabPane
              tab={renderTabTitle(
                <CloseCircleOutlined />,
                "Cancelled By User",
                "CancelledByUser"
              )}
              key="CancelledByUser"
            />
          </Tabs>
          <div className="flex space-x-3">
            <Search
              size={"large"}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              // onSearch={fetchData} // Trigger fetchData on search
            />
          </div>
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
    </div>
  );
};

export default Bookings;
