import React from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

interface DataType {
  coupon?: string;
  discount?: string;
  timeline?: string;
  status?: string;
}

const newColumns: ColumnsType<DataType> = [
  {
    title: 'COUPON',
    dataIndex: 'coupon', // Replace 'coupon' with the actual dataIndex for Coupon
    key: 'coupon',
    width: 100
  },
  {
    title: 'DISCOUNT',
    dataIndex: 'discount', // Replace 'discount' with the actual dataIndex for Discount
    key: 'discount',
    width: 120
  },
  {
    title: 'TIMELINE',
    dataIndex: 'timeline', // Replace 'timeline' with the actual dataIndex for Timeline
    key: 'timeline',
    width: 140
  },
  {
    title: 'STATUS',
    dataIndex: 'status', // Replace 'status' with the actual dataIndex for Status
    key: 'status',
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
    coupon: 'SAVE10',
    discount: '10%',
    timeline: '2023-03-15 to 2023-03-20',
    status: 'Active'
  },
  {
    coupon: 'FREERIDE',
    discount: '50%',
    timeline: '2023-04-01 to 2023-04-15',
    status: 'Inactive'
  },
  {
    coupon: 'FIRSTRIDE',
    discount: '20%',
    timeline: '2023-05-05 to 2023-05-10',
    status: 'Active'
  },
  // Add more entries as needed
];



const Coupons: React.FC = () => {

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            TAXIS
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

export default Coupons;