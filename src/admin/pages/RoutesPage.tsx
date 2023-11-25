import React, { useState } from 'react';
import { Button, Table, Modal } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import AddEditRoute from '../components/AddEditRoute';

interface DataType {
  route?: string;
  oneWay?: string;
  routeTrip?: string;
  specialFare?: string;
}

const newColumns: ColumnsType<DataType> = [
  {
    title: 'ROUTE',
    dataIndex: 'route', // Replace 'route' with the actual dataIndex for Route
    key: 'route',
    width: 100
  },
  {
    title: 'ONE-WAY (KM)',
    dataIndex: 'oneWay', // Replace 'oneWay' with the actual dataIndex for One-Way
    key: 'oneWay',
    width: 120
  },
  {
    title: 'ROUTE-TRIP (KM)',
    dataIndex: 'routeTrip', // Replace 'routeTrip' with the actual dataIndex for Route-Trip
    key: 'routeTrip',
    width: 140
  },
  {
    title: 'SPECIAL FARE',
    dataIndex: 'specialFare', // Replace 'specialFare' with the actual dataIndex for Special Fare
    key: 'specialFare',
    width: 120
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
          EDIT
        </a>
        <div>
          |
        </div>
        <a>
          DELETE
        </a>
      </div>
  },
];

const newData: DataType[] = [
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  },
  {
    route: 'City A to City B',
    oneWay: '100',
    routeTrip: '200',
    specialFare: '$50.00'
  }
];


const Routes: React.FC = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddNew = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            ROUTES
          </div>
          <div className='flex space-x-3'>

            <Button icon={<SearchOutlined />} size={'large'}/>
            <div>
              <Button icon={<PlusOutlined />} size={'large'} className='bg-yellow-500 font-bold text-md' onClick={handleAddNew}>
                ADD NEW
              </Button>
            </div>
          </div>
        </div>
        <Table
          columns={newColumns}
          dataSource={newData}
          pagination={{
            position: ['bottomRight'],
            pageSize: 10
          }}
          scroll={{
            y: 600
          }}
        />
        <Modal
          title='Add New Route'
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={1200}
        >
          <AddEditRoute/>
        </Modal>
      </div>
    </div>
  )
};

export default Routes;
