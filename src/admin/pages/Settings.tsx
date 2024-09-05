/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import axios from "../../api/axios"
import { ISettings } from '../../types/settings.types';
import { LogoutOutlined } from '@ant-design/icons';

const Settings: React.FC = () => {

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    message.success("Staff logged out successfully")
    window.location.href = "/admin/auth/"
  };

  const goBack = () => {
    window.location.href = '/admin'
  };

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await axios.get('/settings/get');
      form.setFieldsValue({
        ...response.data.settings
      });

    } catch (error) {
      console.error('Error fetching settings:', error);
      message.error('Error fetching settings');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: ISettings) => {
    console.log(values);

    try {
      const response = await axios.put('/settings/update', values);
      console.log(response);
      message.success('Settings updated successfully');
      fetchData(); // Fetch the updated settings after successful update
    } catch (error) {
      console.error('Error updating settings:', error);
      message.error('Error updating settings');
    }
  };

  return (
    <div className='px-10 py-6'>
      <div className='flex justify-between'>
        <div className='text-2xl font-light'>
          SETTINGS
        </div>
        <Button icon={<LogoutOutlined />} className='bg-red-600 text-white font-bold rounded' onClick={handleLogout}>
          LOGOUT
        </Button>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-3xl mt-8">

        <Space>
          <Form.Item name="baseFare" label="Base Fare" rules={[{ required: true, message: 'Please enter the base fare' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="gst" label="GST" rules={[{ required: true, message: 'Please enter the GST' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="stateTollTax" label="State, Toll Tax" rules={[{ required: true, message: 'Please enter the state toll tax' }]}>
            <Input className="w-full" />
          </Form.Item>
        </Space>

        <Space>
          <Form.Item name="vehiclesAndFuelCharges" label="Vehicles & Fuel Charges" rules={[{ required: true, message: 'Please enter the vehicles and fuel charges' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="onePickupAndDrop" label="One Pickup & Drop" rules={[{ required: true, message: 'Please enter the one pickup and drop charges' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="parkingAndAirportEntry" label="Parking & Airport Entry" rules={[{ required: true, message: 'Please enter the parking and airport entry charges' }]}>
            <Input className="w-full" />
          </Form.Item>
        </Space>

        <Space>
          <Form.Item name="waitingChargesPerMinute" label="Waiting Charges" rules={[{ required: true, message: 'Please enter the waiting charges per minute' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="nightChargePerDay" label="Night Charges" rules={[{ required: true, message: 'Please enter the night charges per day' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="extraPickupDropCharges" label="Extra Pickup/Drop" rules={[{ required: true, message: 'Please enter the extra pickup/drop charges' }]}>
            <Input className="w-full" />
          </Form.Item>
        </Space>

        <Space>
          <Form.Item name="advancePaymentPercentage" label="Advance Payment Perc" rules={[{ required: true, message: 'Please enter the advance payment percentage' }]}>
            <Input className="w-full" />
          </Form.Item>

          <Form.Item name="minimumBillableKm" label="Minimum Billable Km" rules={[{ required: true, message: 'Please enter minimum billable distance' }]}>
            <Input className="w-full" />
          </Form.Item>
        </Space>

        <Form.Item>
          <Space className='space-x-4'>
            <Button htmlType="submit" className="bg-[#FDB813] hover:bg-[#FDB813] text-black font-semibold w-28 h-10">
              SAVE
            </Button>
            <Button className="font-semibold w-28 h-10" onClick={goBack}>
              BACK
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )
};

export default Settings;