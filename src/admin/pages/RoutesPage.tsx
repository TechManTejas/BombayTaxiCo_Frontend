import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { confirmation } from '../components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { IRoute } from '../../types/routes.types';

const RoutesPage: React.FC = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totatRoutes, setTotalCoupons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  interface DataType {
    _id: string;
    from_name: string;
    to_name: string;
    one_way_trip_km: number;
    round_trip_km: number;
    route_status: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'FROM',
      dataIndex: 'from_name', // Replace 'coupon' with the actual dataIndex for Coupon
      key: 'from_name',
      width: 100
    },
    {
      title: 'TO',
      dataIndex: 'to_name', // Replace 'discount' with the actual dataIndex for Discount
      key: 'to_name',
      width: 120
    },
    {
      title: 'ONE WAY TRIP KM',
      dataIndex: 'one_way_trip_km', // Replace 'timeline' with the actual dataIndex for Timeline
      key: 'one_way_trip_km',
      width: 140
    },
    {
      title: 'ROUND TRIP KM',
      dataIndex: 'round_trip_km', // Replace 'timeline' with the actual dataIndex for Timeline
      key: 'round_trip_km',
      width: 140
    },
    {
      title: 'STATUS',
      dataIndex: 'route_status', // Replace 'status' with the actual dataIndex for Status
      key: 'route_status',
      width: 120
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions', // Replace 'actions' with the actual dataIndex for Actions
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, route) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          <a onClick={() => {
            const routeToEdit = routes.find((r) => r._id === route._id)
            console.log(routeToEdit)
            navigate('/admin/routes/add-edit', { state: { route: routeToEdit } })
          }}>EDIT</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(route._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await axios.get('/routes', {
        params: {
          page: page,
          pageSize: 10,
          filter: undefined,
          search: searchQuery,
        },
      });
      setRoutes(response.data.routes);
      setTotalCoupons(response.data.total);
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

  const handleDeleteCoupon = async (routeId: string) => {
    try {
      // Make axios call to delete the coupon
      await axios.delete(`/routes/${routeId}`);
      // Update the list after successful deletion
      setRoutes((prevRoutes) => prevRoutes.filter((route) => route._id !== routeId));
      // Fetch data for the current page to reflect the deletion
      // fetchData(currentPage); 
      console.log(currentPage)

      // Show a success message to the user
      message.success('Route deleted successfully!');
    } catch (error) {
      console.error('Error deleting route:', error);
      // Handle error (e.g., show an error message to the user)
      message.error('Error deleting route. Please try again.');
    }
  };

  const handleDeleteConfirmation = async (routeId: string) => {
    const shouldDelete = await confirmation("Are you sure you want to delete this Route?");
    if (shouldDelete) {
      // User confirmed the deletion, call the delete function
      handleDeleteCoupon(routeId);
    }
  };

  const mapDataToTableFormat = (data: IRoute[]): Array<{
    _id: string;
    from_name: string;
    to_name: string;
    one_way_trip_km: number;
    round_trip_km: number;
    route_status: string;
  }> => {
    return data.map(route => ({
      _id: route?._id,
      from_name: route?.from_id?.name,
      to_name: route?.to_id?.name,
      one_way_trip_km: route?.one_way_trip_km,
      round_trip_km: route?.round_trip_km,
      route_status: route?.route_status
    }));
  };

  const formattedData = mapDataToTableFormat(routes);

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            ROUTES
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
                navigate('/admin/routes/add-edit')
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
            total: totatRoutes,
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

export default RoutesPage;