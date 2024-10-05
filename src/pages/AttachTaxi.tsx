/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Button, Form, Input, notification } from 'antd';

import Driver from "../assets/images/driver.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios"
import { ReadyToBook } from '../components/ReadyToBook';

const BreadCrumb: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='text-gray-700 container py-6 flex space-x-1'>
                <button className='hover:text-[#FDB813] hover:underline' onClick={() => {
                    navigate("/")
                }}>
                    Home
                </button>
                <div>
                    {'>'} Attach Taxi
                </div>
            </div>
        </>
    )
}

const Content: React.FC = () => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await axios.post('/emails/send-email-attach-taxi', { 
                subject:"Attach Taxi Form",
                message: `
                <div>
                    <p>Name: ${values.name}</p>
                    <p>Email: ${values.email}</p>
                    <p>Phone Number: ${values.phoneNumber}</p>
                    <p>Address: ${values.address}</p>
                    <p>City: ${values.city}</p>
                    <p>State: ${values.state}</p>
                    <p>Number Of Vehicles: ${values.numberOfVehicles}</p>
                </div>`
            });
            if (response.data.message) {
                notification.success({
                    message: 'Success',
                    description: 'Your information was successfully submitted!',
                });
                form.resetFields();
            } else {
                notification.error({
                    message: 'Submission Failed',
                    description: 'We could not send your information. Please try again later.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while sending your information.',
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='pb-20'>
            <div className='flex flex-col justify-center items-center py-4 rounded-xl bg-white px-3
        lg:flex-row lg:space-x-6
        space-y-6 lg:space-y-0
      '>
                <div className='p-2 bg-[#FDB813] rounded-r-full rounded-b-full rounded-tl-[800px] flex justify-center items-center'>
                    <div className='p-2 bg-white rounded-r-full rounded-b-full rounded-tl-[600px] flex justify-center items-center'>
                        <img src={Driver} className='object-cover  bg-gray-200 rounded-r-full rounded-b-full rounded-tl-[800px]
              w-[360px] h-[360px]
              md:w-[420px] 
              md:h-[420px]
              xl:w-[570px] 
              xl:h-[570px]
            '/>
                    </div>
                </div>
                <div className='
          lg:w-1/2
        '>
                    <div className='space-y-3'>
                        <div className='text-3xl font-bold'>Taxi Service Form</div>
                    </div>
                    <Form form={form} onFinish={onFinish} className='lg:w-1/2' layout="vertical">
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                            label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                            label="Phone Number">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}
                            label="Email">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            rules={[{ required: true, message: 'Please enter your Address!' }]}
                            label="Address">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="city"
                            rules={[{ required: true, message: 'Please enter your City!' }]}
                            label="City">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="state"
                            rules={[{ required: true, message: 'Please enter your State!' }]}
                            label="State">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="numberOfVehicles"
                            rules={[{ required: true, message: 'Please enter the number of vehicles you have!' }]}
                            label="Number Of Vehicles">
                            <Input />
                        </Form.Item>
                        <div className='my-8'>
                            <Form.Item>
                                <Button loading={loading} type='link' htmlType='submit' className='font-semibold rounded-3xl h-12 w-40 bg-[#FDB813] border-yellow-500 hover:bg-yellow-400 text-black'>
                                    SEND MESSAGE
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

const AttachTaxi: React.FC = () => {

    return (
        <div >
            <div className='
                px-4
                sm:px-8
                md:px-16
                lg:px-20
                xl:px-28
                2xl:px-32
            bg-[#ececf4]
            '>
                <BreadCrumb />
                <Content />
            </div>
            <ReadyToBook/>
            <Footer />
        </div>
    );
};

export default AttachTaxi;
