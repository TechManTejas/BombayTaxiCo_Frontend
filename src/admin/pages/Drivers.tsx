import React from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';

const Drivers: React.FC = () => {

  const navigate = useNavigate()

  interface DataType {
    driverId?: string;
    name?: string;
    contactDetails?: string;
    assignTo?: string;
  }

  const newColumns: ColumnsType<DataType> = [
    {
      title: 'DRIVER ID',
      dataIndex: 'driverId', // Replace 'driverId' with the actual dataIndex for Driver ID
      key: 'driverId',
      width: 100
    },
    {
      title: 'NAME',
      dataIndex: 'name', // Replace 'name' with the actual dataIndex for Name
      key: 'name',
      width: 120
    },
    {
      title: 'CONTACT DETAILS',
      dataIndex: 'contactDetails', // Replace 'contactDetails' with the actual dataIndex for Contact Details
      key: 'contactDetails',
      width: 140
    },
    {
      title: 'ASSIGN TO',
      dataIndex: 'assignTo', // Replace 'assignTo' with the actual dataIndex for Assign To
      key: 'assignTo',
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
          <a onClick={()=>{
            navigate('/admin/drivers/details')
          }}>
            VIEW
          </a>
          <div>
            |
          </div>
          <a>
            ASSIGN
          </a>
          <div>
            |
          </div>
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
      driverId: 'D001',
      name: 'John Doe',
      contactDetails: '123-456-7890',
      assignTo: 'Route A'
    },
    {
      driverId: 'D002',
      name: 'Jane Smith',
      contactDetails: '987-654-3210',
      assignTo: 'Route B'
    },
    {
      driverId: 'D003',
      name: 'Bob Johnson',
      contactDetails: '555-123-4567',
      assignTo: 'Route C'
    },
    // Add more entries as needed
  ];


  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            DRIVERS
          </div>
          <div className='flex space-x-3'>

            <Button icon={<SearchOutlined />} size={'large'} />
            <div>
              <Button icon={<PlusOutlined />} size={'large'} className='bg-yellow-500 font-bold text-md'>
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
      </div>
    </div>
  )
};

export default Drivers;
