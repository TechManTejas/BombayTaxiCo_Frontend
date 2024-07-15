import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, message } from 'antd';
import { CarOutlined, CarryOutOutlined, CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { confirmation } from '../components/Confirmation';
import { ITaxi } from '../../types/taxi.types';
import { useNavigate } from 'react-router-dom';

const Taxis: React.FC = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);
  const [taxis, setTaxis] = useState<ITaxi[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalTaxis, setTotalTaxis] = useState<number>(0);
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
    taxi_type_name?: string;
    taxi_no?: string;
    driving_license?: string;
    taxi_status?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'TAXI NO',
      dataIndex: 'taxi_no',
      key: 'taxi_no',
      width: 100
    },
    {
      title: 'TYPE',
      dataIndex: 'taxi_type_name',
      key: 'taxi_type_name',
      width: 100
    },
    {
      title: 'DRIVING LICENSE',
      dataIndex: 'driving_license',
      key: 'driving_license',
      width: 100
    },
    {
      title: 'TAXI STATUS',
      dataIndex: 'taxi_status',
      key: 'taxi_status',
      width: 100,
      render: (_, taxi) => (
        <>
          {getStatusTag(taxi.taxi_status)}
        </>
      )
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, taxi) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          <a onClick={() => {
            const taxiToEdit = taxis.find((t) => t._id === taxi._id)
            console.log(taxiToEdit)
            navigate('/admin/taxis/details', { state: { taxi: taxiToEdit } })
          }}>VIEW</a>
          <div>|</div>
          <a onClick={() => {
            const taxiToEdit = taxis.find((t) => t._id === taxi._id)
            console.log(taxiToEdit)
            navigate('/admin/taxis/add-edit', { state: { taxi: taxiToEdit } })
          }}>EDIT</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(taxi._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await axios.get('/taxis', {
        params: {
          page: page,
          pageSize: 10,
          filter: undefined,
          search: searchQuery,
        },
      });
      console.log(response.data)

      setTaxis(response.data.taxis);
      setTotalTaxis(response.data.total);
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

  const handleDeleteCity = async (taxiId: string) => {
    try {
      // Make axios call to delete the coupon
      await axios.delete(`/taxis/${taxiId}`);
      // Update the list after successful deletion
      setTaxis((prevTaxi) => prevTaxi.filter((taxi) => taxi._id !== taxiId));
      // Fetch data for the current page to reflect the deletion
      // fetchData(currentPage); 
      console.log(currentPage)

      // Show a success message to the user
      message.success('Taxi deleted successfully!');
    } catch (error) {
      console.error('Error deleting taxi:', error);
      // Handle error (e.g., show an error message to the user)
      message.error('Error deleting taxi. Please try again.');
    }
  };

  const handleDeleteConfirmation = async (taxiId: string) => {
    const shouldDelete = await confirmation("Are you sure you want to delete this Taxi?");
    if (shouldDelete) {
      // User confirmed the deletion, call the delete function
      handleDeleteCity(taxiId);
    }
  };

  const mapDataToTableFormat = (data: ITaxi[]): Array<{
    _id: string;
    taxi_type_name: string;
    taxi_no: string;
    driving_license: string;
    taxi_status: string;
  }> => {
    return data.map(taxi => ({
      _id: taxi?._id,
      taxi_type_name: taxi?.taxi_type_id?.name,
      taxi_no: taxi?.taxi_no,
      driving_license: taxi?.driving_license,
      taxi_status: taxi?.taxi_status,
    }));
  };

  const formattedData = mapDataToTableFormat(taxis);

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            TAXIS
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
                navigate('/admin/taxis/add-edit')
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
            total: totalTaxis,
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

export default Taxis;