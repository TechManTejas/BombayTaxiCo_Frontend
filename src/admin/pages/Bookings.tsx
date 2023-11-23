import React, { useState } from 'react';
import { Button, Table, Tabs } from 'antd';
import { CarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, EyeOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import Search from 'antd/es/input/Search';

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
        width: 200
    },
    {
        title: 'CUSTOMER',
        dataIndex: 'customer', // Replace 'customer' with the actual dataIndex for Customer
        key: 'customer',
        width: 200
    },
    {
        title: 'PAYMENT',
        dataIndex: 'payment', // Replace 'payment' with the actual dataIndex for Payment
        key: 'payment',
        width: 100
    },
    {
        title: 'ACTIONS',
        dataIndex: 'actions', // Replace 'actions' with the actual dataIndex for Actions
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: () =>
            <>
                <Button
                    icon={<CheckCircleOutlined />}
                    size={'small'}
                    className='w-28'
                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }}
                >
                    CONFIRM
                </Button>
                <Button
                    icon={<CloseCircleOutlined />}
                    size={'small'}
                    className='w-28'
                    style={{ backgroundColor: '#f5222d', borderColor: '#f5222d', color: '#fff' }}
                >
                    CANCEL
                </Button>
                <Button
                    icon={<EyeOutlined />}
                    size={'small'}
                    className='w-28'
                    style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', color: '#fff' }}
                >
                    VIEW
                </Button>
            </>,
    },
];

const sampleData: DataType[] = [
    {
        bookingId: 'B001',
        status: 'Confirmed',
        fromTo: 'City A to City B',
        tripDates: '2023-01-15 to 2023-01-20',
        customer: 'John Doe',
        payment: '$150.00',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B002',
        status: 'Pending',
        fromTo: 'City C to City D',
        tripDates: '2023-02-05 to 2023-02-10',
        customer: 'Jane Doe',
        payment: '$120.50',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B003',
        status: 'Cancelled',
        fromTo: 'City E to City F',
        tripDates: '2023-03-12 to 2023-03-18',
        customer: 'Bob Smith',
        payment: '$80.00',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B004',
        status: 'Confirmed',
        fromTo: 'City G to City H',
        tripDates: '2023-04-22 to 2023-04-28',
        customer: 'Alice Johnson',
        payment: '$200.00',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B005',
        status: 'Pending',
        fromTo: 'City I to City J',
        tripDates: '2023-05-03 to 2023-05-10',
        customer: 'Sam Wilson',
        payment: '$90.50',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B006',
        status: 'Confirmed',
        fromTo: 'City K to City L',
        tripDates: '2023-06-14 to 2023-06-20',
        customer: 'Eva Martinez',
        payment: '$180.00',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B007',
        status: 'Pending',
        fromTo: 'City M to City N',
        tripDates: '2023-07-01 to 2023-07-07',
        customer: 'Chris Brown',
        payment: '$110.25',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B008',
        status: 'Cancelled',
        fromTo: 'City O to City P',
        tripDates: '2023-08-09 to 2023-08-15',
        customer: 'Emily White',
        payment: '$75.00',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B009',
        status: 'Confirmed',
        fromTo: 'City Q to City R',
        tripDates: '2023-09-18 to 2023-09-25',
        customer: 'David Taylor',
        payment: '$160.00',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
    {
        bookingId: 'B010',
        status: 'Pending',
        fromTo: 'City S to City T',
        tripDates: '2023-10-05 to 2023-10-12',
        customer: 'Sophia Lee',
        payment: '$95.75',
        actions: 'View/Edit',
    },
];

const Bookings: React.FC = () => {

    const [activeTab, setActiveTab] = useState<string>('1');

    const handleTabChange = (key: string) => {
        // Do something based on the selected tab key
        console.log(`Tab changed to: ${key}`);
        setActiveTab(key);
    };

    return (
        <>
            <Tabs
                className='flex flex-1'
                defaultActiveKey="1"
                tabPosition="left"
                onChange={handleTabChange}
            >
                <TabPane tab={<span><InboxOutlined />All</span>} key="1" />
                <TabPane tab={<span><InboxOutlined />New</span>} key="2" />
                <TabPane tab={<span><ClockCircleOutlined />Confirmed</span>} key="3" />
                <TabPane tab={<span><CarOutlined />On Ride</span>} key="4" />
                <TabPane tab={<span><CheckCircleOutlined />Completed</span>} key="5" />
                <TabPane tab={<span><CloseCircleOutlined />Cancelled</span>} key="6" />
            </Tabs >
            <div className='my-6 mr-6'>
                <div className='flex justify-between items-center w-full gap-x-4'>
                    <div className='text-2xl font-thin'>
                        BOOKINGS
                    </div>
                    <div className='w-full'>
                        <Search placeholder="Enter" size={'large'} />
                    </div>
                    <div>
                        <Button icon={<PlusOutlined/>} size={'large'} className='bg-yellow-500 font-bold'>
                            ADD NEW
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={sampleData}
                    pagination={{
                        position: ['bottomRight'],
                        pageSize: 10
                    }}
                    scroll={{
                        y: 700
                    }}
                />
            </div>
        </>
    )
};

export default Bookings;
