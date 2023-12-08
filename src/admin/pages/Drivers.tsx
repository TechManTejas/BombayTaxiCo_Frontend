import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { CarOutlined, CarryOutOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { Driver } from '../../types/drivers.types';
import { useNavigate } from 'react-router-dom';
import { confirmation } from '../components/Confirmation';

const Drivers: React.FC = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalDrivers, setTotalDrivers] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getStatusTag = (status: string | undefined) => {
    switch (status) {
      case 'Available':
        return <Tag icon={<CheckCircleOutlined />} color="success">Available</Tag>;
      case 'Unavailable':
        return <Tag icon={<CloseCircleOutlined />} color="error">Unavailable</Tag>;
      case 'Assigned':
        return <Tag icon={<CarryOutOutlined />} color="warning">Assigned</Tag>;
      case 'On a Trip':
        return <Tag icon={<CarOutlined />} color="processing">On a Trip</Tag>;
      default:
        return null;
    }
  };

  interface DataType {
    _id: string;
    name?: string;
    mobile_no?: string;
    driver_status?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'DRIVER ID',
      dataIndex: '_id',
      key: '_id',
      width: 100
    },
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      width: 100
    },
    {
      title: 'CONTACT DETAILS',
      dataIndex: 'mobile_no',
      key: 'mobile_no',
      width: 100
    },
    {
      title: 'DRIVER STATUS',
      dataIndex: 'driver_status',
      key: 'driver_status',
      width: 100,
      render: (_, driver) => (
        <>
          {getStatusTag(driver.driver_status)}
        </>
      )
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, driver) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          <a onClick={() => { }}>ASSIGN</a>
          <div>|</div>
          <a onClick={() => {
            const driverToView = drivers.find((d) => d._id === driver._id)
            console.log(driverToView)
            navigate('/admin/drivers/details', { state: { driver: driverToView } })
          }}>VIEW</a>
          <div>|</div>
          <a onClick={() => {
            const driverToEdit = drivers.find((d) => d._id === driver._id)
            console.log(driverToEdit)
            navigate('/admin/drivers/add-edit', { state: { driver: driverToEdit } })
          }}>EDIT</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(driver._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await axios.get('/drivers', {
        params: {
          page: page,
          pageSize: 10,
          filter: undefined,
          search: searchQuery,
        },
      });
      console.log(response.data)

      setDrivers(response.data.drivers);
      setTotalDrivers(response.data.total);
      setCurrentPage(page)

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  const handleDeleteDriver = async (driverId: string) => {
    try {
      // Make axios call to delete the coupon
      await axios.delete(`/drivers/${driverId}`);
      // Update the list after successful deletion
      setDrivers((prevDriver) => prevDriver.filter((driver) => driver._id !== driverId));
      // Fetch data for the current page to reflect the deletion
      // fetchData(currentPage); 
      console.log(currentPage)

      // Show a success message to the user
      message.success('Driver deleted successfully!');
    } catch (error) {
      console.error('Error deleting driver:', error);
      // Handle error (e.g., show an error message to the user)
      message.error('Error deleting driver. Please try again.');
    }
  };

  const handleDeleteConfirmation = async (driverId: string) => {
    const shouldDelete = await confirmation("Are you sure you want to delete this Driver?");
    if (shouldDelete) {
      // User confirmed the deletion, call the delete function
      handleDeleteDriver(driverId);
    }
  };

  const mapDataToTableFormat = (data: Driver[]): Array<{
    _id: string;
    name: string;
    mobile_no: string;
    driver_status: string;
  }> => {
    return data.map(driver => ({
      _id: driver?._id,
      name: driver?.name,
      mobile_no: driver?.mobile_no,
      driver_status: driver?.driver_status
    }));
  };

  const formattedData = mapDataToTableFormat(drivers);

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            DRIVERS
          </div>
          <div className='flex space-x-3'>
            <Search
              size={'large'}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            // onSearch={fetchData} // Trigger fetchData on search
            />
            <div>
              <Button icon={<PlusOutlined />} size={'large'} className='bg-yellow-500 font-bold text-md' onClick={() => {
                navigate('/admin/drivers/add-edit')
              }}>
                ADD NEW
              </Button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={formattedData}
          pagination={{
            position: ['bottomRight'],
            pageSize: 10,
            total: totalDrivers,
            onChange: handlePageChange,
          }}
          scroll={{
            y: 600
          }}
          loading={loading}
        />
      </div>
    </div>
  )
};

export default Drivers;