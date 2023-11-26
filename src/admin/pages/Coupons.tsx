import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import moment from 'moment';
import Search from 'antd/es/input/Search';
import AddEditCoupon from '../components/AddEditCoupon';
import { Coupon } from '../../types/coupons.types';
import { confirmation } from '../components/Confirmation';

const Coupons: React.FC = () => {

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedCouponDetails, setEditedCouponDetails] = useState<Coupon | null>(null);
  const [totalCoupons, setTotalCoupons] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleAddNew = () => {
    setEditedCouponDetails(null)
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };


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
      render: (_, record) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          <a onClick={() => handleEditCoupon(record._id)}>EDIT</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(record._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  
  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  const handleModifiedCouponList = (editedCoupon: Coupon) => {
    setCoupons((prevCoupons) => {
      // Check if the edited coupon already exists in the list
      const couponExists = prevCoupons.some((coupon) => coupon._id === editedCoupon?._id);

      if (couponExists) {
        // Update the existing coupon
        const updatedCoupons = prevCoupons.map((coupon) =>
          coupon._id === editedCoupon._id ? editedCoupon : coupon
        );
        return updatedCoupons;
      } else {
        // Add the new coupon to the list
        return [...prevCoupons, editedCoupon];
      }
    });
  };

  const handleEditCoupon = (couponId: string) => {
    // Find the coupon with the given ID
    const editedCoupon = coupons.find((coupon) => coupon._id === couponId);

    // Check if the coupon is found
    if (editedCoupon) {
      // Open the AddEditCoupon modal and pass the coupon ID and details
      setIsModalVisible(true);
      setEditedCouponDetails(editedCoupon);
    }
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

  const mapDataToTableFormat = (data: Coupon[]): Array<{
    _id: string;
    coupon: string;
    discount: string;
    timeline: string;
    status: string;
  }> => {

    console.log(data)

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
              <Button icon={<PlusOutlined />} size={'large'} className='bg-yellow-500 font-bold text-md' onClick={handleAddNew}>
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
            total: totalCoupons, // Set the total number of coupons for accurate pagination
            onChange: handlePageChange, // Handle page change event
          }}
          scroll={{
            y: 600
          }}
        />
        <Modal
          title='Manage Coupon'
          open={isModalVisible}
          onCancel={handleModalCancel}
          footer={null}
          width={600}
        >
          <AddEditCoupon onCouponEdited={handleModifiedCouponList} editedCoupon={editedCouponDetails}/>
        </Modal>
      </div>
    </div>
  )
};

export default Coupons;