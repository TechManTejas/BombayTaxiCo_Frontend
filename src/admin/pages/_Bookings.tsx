import React, { useEffect, useState } from 'react';
import { Button, Table, Tabs, message } from 'antd';
import { CarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, InboxOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"

const { TabPane } = Tabs;

interface DataType {
    bookingId: string;
    status: string;
    fromTo: string;
    tripDates: string;
    customer: string;
    payment: string;
    actions: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'BOOKING ID',
        dataIndex: 'bookingId', // Replace 'bookingId' with the actual dataIndex for Booking ID
        key: 'bookingId',
        width: 100
    },
    {
        title: 'STATUS',
        dataIndex: 'status', // Replace 'status' with the actual dataIndex for Status
        key: 'status',
        width: 100
    },
    {
        title: 'FROM TO',
        dataIndex: 'fromTo', // Replace 'fromTo' with the actual dataIndex for From-To
        key: 'fromTo',
        width: 100
    },
    {
        title: 'TRIP DATES',
        dataIndex: 'tripDates', // Replace 'tripDates' with the actual dataIndex for Trip Dates
        key: 'tripDates',
        width: 120
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer', // Replace 'customer' with the actual dataIndex for Customer
        key: 'customer',
        width: 100
    },
    {
        title: 'PAYMENT',
        dataIndex: 'payment', // Replace 'payment' with the actual dataIndex for Payment
        key: 'payment',
        width: 60
    },
    {
        title: 'ACTIONS',
        dataIndex: 'actions', // Replace 'actions' with the actual dataIndex for Actions
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: () =>
            <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
                <a>
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
                </div>
                <a>
                    VIEW DETAILS
                </a>
            </div>
    },
];

const Bookings: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('1');
    const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});

    const handleTabChange = (key: string) => {
        // Do something based on the selected tab key
        console.log(`Tab changed to: ${key}`);
        setActiveTab(key);
        console.log(activeTab);
    };

    const operations = <Button icon={<SearchOutlined />} size={'large'} />

    const fetchData = async () => {
        try {
            const response = await axios.get('/bookings/booking-status-counts'); // Replace with your actual API endpoint
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
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderTabTitle = (icon: React.ReactNode, label: string, countKey: string) => (
        <span>
            {icon}
            {label} ({statusCounts[countKey] || 0})
        </span>
    );

    return (
        <div className='px-10 py-6'>
            <Tabs
                tabBarExtraContent={operations}
                className='font-light'
                defaultActiveKey="1"
                tabPosition="top"
                onChange={handleTabChange}
            >
                <TabPane tab={renderTabTitle(<InboxOutlined />, 'All', 'All')} key="1" />
                <TabPane tab={renderTabTitle(<InboxOutlined />, 'New', 'Requested')} key="2" />
                <TabPane tab={renderTabTitle(<ClockCircleOutlined />, 'Confirmed', 'Confirmed')} key="3" />
                <TabPane tab={renderTabTitle(<CarOutlined />, 'On Ride', 'OnRide')} key="4" />
                <TabPane tab={renderTabTitle(<CheckCircleOutlined />, 'Completed', 'Completed')} key="5" />
                <TabPane tab={renderTabTitle(<CloseCircleOutlined />, 'Cancelled', 'Cancelled')} key="6" />
            </Tabs >
            <div className=''>
                <Table
                    columns={columns}
                    dataSource={[]}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 10
                    }}
                    scroll={{
                        y: 600
                    }}
                />
            </div>
        </div>
    )
};

export default Bookings;
