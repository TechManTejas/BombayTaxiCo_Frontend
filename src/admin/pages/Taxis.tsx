import React from 'react';
import { Button, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';

interface DataType {
  taxiNo?: string;
  taxiType?: string;
  ratePerKm?: string;
}

const newColumns: ColumnsType<DataType> = [
  {
    title: 'TAXI NO',
    dataIndex: 'taxiNo', // Replace 'taxiNo' with the actual dataIndex for Taxi No
    key: 'taxiNo',
    width: 100
  },
  {
    title: 'TAXI TYPE',
    dataIndex: 'taxiType', // Replace 'taxiType' with the actual dataIndex for Taxi Type
    key: 'taxiType',
    width: 120
  },
  {
    title: 'RATE PER KM',
    dataIndex: 'ratePerKm', // Replace 'ratePerKm' with the actual dataIndex for Rate Per Km
    key: 'ratePerKm',
    width: 140
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
    taxiNo: 'TX001',
    taxiType: 'Sedan',
    ratePerKm: '$2.50'
  },
  {
    taxiNo: 'TX002',
    taxiType: 'SUV',
    ratePerKm: '$3.00'
  },
  {
    taxiNo: 'TX003',
    taxiType: 'Hatchback',
    ratePerKm: '$2.00'
  },
  // Add more entries as needed
];



const Taxis: React.FC = () => {

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            TAXIS
          </div>
          <div className='flex space-x-3'>

            <Button icon={<SearchOutlined />} size={'large'}/>
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

export default Taxis;
