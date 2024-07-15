import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { confirmation } from '../components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { ICity } from '../../types/citys.types';

const Citys: React.FC = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);
  const [citys, setCitys] = useState<ICity[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalCitys, setTotalCitys] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  interface DataType {
    _id: string;
    city?: string;
    status?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'CITY',
      dataIndex: 'city', 
      key: 'city',
      width: 100
    },
    {
      title: 'STATUS',
      dataIndex: 'status', 
      key: 'status',
      width: 120
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, city) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          <a onClick={() => {
            const cityToEdit = citys.find((c) => c._id === city._id)
            navigate('/admin/cities/add-edit', { state: {city: cityToEdit}})
          }}>EDIT</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(city._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await axios.get('/citys', {
        params: {
          page: page,
          pageSize: 10,
          filter: undefined,
          search: searchQuery,
        },
      });
      console.log(response.data)

      setCitys(response.data.citys);
      setTotalCitys(response.data.total); 
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

  const handleDeleteCity = async (cityId: string) => {
    try {
      // Make axios call to delete the coupon
      await axios.delete(`/citys/${cityId}`);
      // Update the list after successful deletion
      setCitys((prevCity) => prevCity.filter((city) => city._id !== cityId));
      // Fetch data for the current page to reflect the deletion
      // fetchData(currentPage); 
      console.log(currentPage)

      // Show a success message to the user
      message.success('City deleted successfully!');
    } catch (error) {
      console.error('Error deleting city:', error);
      // Handle error (e.g., show an error message to the user)
      message.error('Error deleting city. Please try again.');
    }
  };

  const handleDeleteConfirmation = async (cityId: string) => {
    const shouldDelete = await confirmation("Are you sure you want to delete this City?");
    if (shouldDelete) {
      // User confirmed the deletion, call the delete function
      handleDeleteCity(cityId);
    }
  };

  const mapDataToTableFormat = (data: ICity[]): Array<{
    _id: string;
    city: string;
    status: string;
  }> => {
    return data.map(city => ({
      _id: city?._id,
      city: city?.name,
      status: city?.status
    }));
  };

  const formattedData = mapDataToTableFormat(citys);

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            CITIES
          </div>
          <div className='flex space-x-3'>
            <Search
              size={'large'}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              // onSearch={fetchData} // Trigger fetchData on search
            />
            <div>
              <Button icon={<PlusOutlined />} size={'large'} className='bg-yellow-500 font-bold text-md' onClick={()=>{
                navigate('/admin/cities/add-edit')
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
            total: totalCitys,
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

export default Citys;