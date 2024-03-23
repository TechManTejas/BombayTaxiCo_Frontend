import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import axios from "../../api/axios"
import Search from 'antd/es/input/Search';
import { confirmation } from '../components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { IInvoice } from '../../types/invoices.types';
import dayjs from 'dayjs';

const Invoices: React.FC = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false);
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalInvoices, setTotalInvoices] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  interface DataType {
    _id: string;
    date?: string;
    booking_id?: string;
    amount?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'INVOICE ID',
      dataIndex: '_id',
      key: 'Id',
      width: 120
    },
    {
      title: 'DATE',
      dataIndex: 'date', 
      key: 'date',
      width: 60
    },
    {
      title: 'BOOKING ID',
      dataIndex: 'booking_id',
      key: 'booking_id',
      width: 120
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount', 
      key: 'amount',
      width: 100
    },
    {
      title: 'ACTIONS',
      dataIndex: 'actions', 
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, invoice) => (
        <div className='text-amber-500 font-bold flex flex-wrap space-x-1'>
          {/* <a onClick={() =>{}}>DOWNLOAD</a>
          <div>|</div> */}
          <a onClick={() => {
            const invoiceToView = invoices.find((c) => c._id === invoice._id)
            console.log(invoiceToView)
            navigate('/admin/invoices/details', { state: {invoice: invoiceToView}})
          }}>VIEW</a>
          <div>|</div>
          <a onClick={() => handleDeleteConfirmation(invoice._id)}>DELETE</a>
        </div>
      ),
    },
  ];

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);

      const response = await axios.get('/invoices', {
        params: {
          page: page,
          pageSize: 10,
          filter: undefined,
          search: searchQuery,
        },
      });

      setInvoices(response.data.invoices);
      setTotalInvoices(response.data.total);
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

  const handleDeleteInvoice = async (couponId: string) => {
    try {
      // Make axios call to delete the coupon
      await axios.delete(`/invoices/${couponId}`);
      // Update the list after successful deletion
      setInvoices((prevCoupons) => prevCoupons.filter((coupon) => coupon._id !== couponId));
      // Fetch data for the current page to reflect the deletion
      // fetchData(currentPage); 
      console.log(currentPage)

      // Show a success message to the user
      message.success('Invoice deleted successfully!');
    } catch (error) {
      console.error('Error deleting invoice:', error);
      // Handle error (e.g., show an error message to the user)
      message.error('Error deleting invoice. Please try again.');
    }
  };

  const handleDeleteConfirmation = async (couponId: string) => {
    const shouldDelete = await confirmation("Are you sure you want to delete this Invoice?");
    if (shouldDelete) {
      // User confirmed the deletion, call the delete function
      handleDeleteInvoice(couponId);
    }
  };

  const mapDataToTableFormat = (data: IInvoice[]): Array<{
    _id: string;
    date: string;
    booking_id: string;
    amount: string;
  }> => {
    
    console.log(data)
  
    return data.map(invoice => ({
      _id: invoice?._id,
      date: dayjs(invoice?.date).format("DD MMM YYYY"),
      booking_id: invoice?.booking?._id,
      amount: "₹ "+invoice?.amount?.toLocaleString(),
    }));
  };

  const formattedData = mapDataToTableFormat(invoices);

  return (
    <div className='px-10 py-6'>
      <div className=''>
        <div className='flex justify-between items-center w-full gap-x-4'>
          <div className='text-2xl font-light'>
            INVOICES
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
                navigate('/admin/invoices/add-edit')
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
            total: totalInvoices,
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

export default Invoices;