import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { ICoupon } from '../../types/coupons.types';
import { confirmation } from '../components/Confirmation';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Coupons: React.FC = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalCoupons, setTotalCoupons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  interface DataType {
    _id: string;
    coupon?: string;
    discount?: string;
    timeline?: string;
    status?: string;
  }

  const columns: ColumnsType<DataType> = [
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
      render: (_, coupon) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          <a onClick={() => {
            const couponToEdit = coupons.find((c) => c._id === coupon._id)
            console.log(couponToEdit)
            navigate('/admin/coupons/add-edit', { state: {coupon: couponToEdit}})
          }}>EDIT</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(coupon._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await axios.get('/coupons', {
        params: {
          page: page,
          pageSize: 10,
          filter: undefined,
          search: searchQuery,
        },
      });
      setCoupons(response.data.coupons);
      setTotalCoupons(response.data.total); // Set total coupons from the response
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

  const handleDeleteCoupon = async (couponId: string) => {
    try {
      // Make axios call to delete the coupon
      await axios.delete(`/coupons/${couponId}`);
      // Update the list after successful deletion
      setCoupons((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== couponId));
      // Fetch data for the current page to reflect the deletion
      // fetchData(currentPage); 
      console.log(currentPage)

      // Show a success message to the user
      message.success('Coupon deleted successfully!');
    } catch (error) {
      console.error('Error deleting coupon:', error);
      // Handle error (e.g., show an error message to the user)
      message.error('Error deleting coupon. Please try again.');
    }
  };

  const handleDeleteConfirmation = async (couponId: string) => {
    const shouldDelete = await confirmation("Are you sure you want to delete this Coupon?");
    if (shouldDelete) {
      // User confirmed the deletion, call the delete function
      handleDeleteCoupon(couponId);
    }
  };

  const mapDataToTableFormat = (data: ICoupon[]): Array<{
    _id: string;
    coupon: string;
    discount: string;
    timeline: string;
    status: string;
  }> => {
    return data.map(coupon => ({
      _id: coupon?._id,
      coupon: coupon?.name,
      discount: `${coupon?.discount_perc}%`,
      timeline: `${moment(coupon?.from_date).format('YYYY-MM-DD')} to ${moment(coupon?.to_date).format('YYYY-MM-DD')}`,
      status: coupon?.status
    }));
  };

  const formattedData = mapDataToTableFormat(coupons);

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            COUPONS
          </div>
          <div className='flex space-x-3'>
            <Search
              size={'large'}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
              // onSearch={fetchData} // Trigger fetchData on search
            />
            <div>
              <Button icon={<PlusOutlined />} size={'large'} className='bg-[#FDB813] font-bold text-md' onClick={()=>{
                navigate('/admin/coupons/add-edit')
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
            total: totalCoupons,
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

export default Coupons;