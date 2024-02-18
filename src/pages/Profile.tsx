/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom';
import { BookingStatus, IBooking } from '../types/bookings.types';
import Table, { ColumnsType } from 'antd/es/table';
import { Tabs, message } from 'antd';
import moment from 'moment';
import axios from "../api/axios";
import TabPane from 'antd/es/tabs/TabPane';
import Search from 'antd/es/input/Search';

export const Profile = () => {

  const [selectedTab, setSelectedTab] = useState("bookings")

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab)
  }

  const BookingsTAB: React.FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('All');
    const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [totalBookings, setTotalBookings] = useState<number>(0);

    interface DataType {
      _id: string;
      status: BookingStatus;
      fromTo: string;
      tripDates: string;
      customer: string;
      payment: string;
    }

    const columns: ColumnsType<DataType> = [
      {
        title: 'BOOKING ID',
        dataIndex: '_id',
        key: '_id',
        width: 120
      },
      {
        title: 'FROM TO',
        dataIndex: 'fromTo',
        key: 'fromTo',
        width: 100
      },
      {
        title: 'TRIP DATES',
        dataIndex: 'tripDates',
        key: 'tripDates',
        width: 120
      },
      {
        title: 'PAYMENT',
        dataIndex: 'payment',
        key: 'payment',
        width: 100
      },
      {
        title: 'ACTIONS',
        dataIndex: 'actions',
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: (_, booking) => (
          <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
            <a onClick={() => {
              const bookingToEdit = bookings.find((b) => b._id === booking._id)
              navigate('/profile/booking', { state: { booking: bookingToEdit } })
            }}>VIEW</a>
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
        const response = await axios.get('/bookings/user-booking-status-counts'); // Replace with your actual API endpoint
        const data = response.data;

        console.log(data);

        // If the API returns an object with status counts, set it in the state
        if (data && typeof data === 'object') {
          setStatusCounts(data);
        } else {
          message.error('Invalid API response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data');
      }

      try {
        setLoading(true);

        const response = await axios.get('/bookings/user-bookings', {
          params: {
            page: page,
            pageSize: 10,
            filter: activeTab !== "All" ? JSON.stringify({ booking_status: activeTab }) : JSON.stringify({ booking_status: 'New' }),
            search: searchQuery,
          },
        });
        console.log(response.data.bookings);
        setBookings(response.data.bookings);
        setTotalBookings(response.data.total);

      } catch (error) {
        console.error('Error fetching data:', error);
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

    const mapDataToTableFormat = (data: IBooking[]): Array<{
      _id: string;
      status: BookingStatus;
      fromTo: string;
      tripDates: string;
      customer: string;
      payment: string;
    }> => {
      return data.map(booking => {
        const fromCity = booking.route_id?.from_id?.name || 'Unknown';
        const toCity = booking.route_id?.to_id?.name || 'Unknown';
        let fromTo = `${fromCity} to ${toCity}`;
        if (fromTo === "Unknown to Unknown") {
            fromTo = booking?.pickup_city?.name || 'Unknown'
        }

        const payments = booking?.payments?.map((payment: any) => payment.payment) || [];
        const paymentsString = payments.join('+');

        return {
            _id: booking?._id || '',
            status: booking?.booking_status || BookingStatus.New,
            fromTo,
            tripDates: `${moment(booking?.pick_up_date).format('YYYY-MM-DD')} to ${moment(booking?.return_date).format('YYYY-MM-DD')}`,
            customer: booking?.user_id?.name || '',
            payment: paymentsString
        };
    });
    };

    const formattedData = mapDataToTableFormat(bookings);

    const renderTabTitle = (label: string, countKey: string) => (
      <span className='text-sm'>
        {label} ({statusCounts[countKey] || 0})
      </span>
    );

    return (
      <>
        <div className='px-4'>
          <div className='flex justify-between items-center w-full gap-x-4
            flex-col
            md:flex-row
          '>
            <Tabs
              className='font-light'
              defaultActiveKey="1"
              tabPosition="top"
              onChange={handleTabChange}
            >
              <TabPane tab={renderTabTitle('Requested', 'New')} key="New" />
              <TabPane tab={renderTabTitle('Upcoming', 'Confirmed')} key="Confirmed" />
              <TabPane tab={renderTabTitle('Completed', 'Completed')} key="Completed" />
              <TabPane tab={renderTabTitle('Cancelled', 'Cancelled')} key="Cancelled" />
            </Tabs >
            <div className='flex space-x-3'>
              <Search
                size={'large'}
                placeholder="Search..."
                onChange={(e: any) => setSearchQuery(e.target.value)}
              // onSearch={fetchData} // Trigger fetchData on search
              />
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={formattedData}
            pagination={{
              position: ['bottomRight'],
              pageSize: 10,
              total: totalBookings,
              onChange: handlePageChange,
            }}
            scroll={{
              y: 600
            }}
            loading={loading}
          />
        </div>
      </>
    )
  }

  const ProfileTAB: React.FC = () => {
    return (
      <>
        <div className='px-4'>
          <div className='text-2xl font-light'>
            PROFILE
          </div>
          <div className='my-4 font-medium'>
            +7666674367
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='flex justify-center'>
      <div className='container flex 
      flex-col
      lg:flex-row
      '>
        <Sidebar handleTabChange={handleTabChange} />
        <div className='w-full'>
          {selectedTab === 'bookings' ? (
            <BookingsTAB />
          ) : selectedTab === 'profile' ? (
            <ProfileTAB />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
