/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Input } from 'antd';

import Driver from "../assets/images/driver.jpg"
import { useNavigate } from 'react-router-dom';
import axios from "../api/axios"

const BreadCrumb: React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className='text-gray-700 container py-6 flex space-x-1'>
                <button className='hover:text-yellow-500 hover:underline' onClick={() => {
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

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        numberOfVehicles: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        try {
            const response = await axios.post('/send-email', {
                subject: "Attach Taxi",
                message: `Name: ${formData.name}\n Number: ${formData.phoneNumber}\n Email: ${formData.email}\n Address: ${formData.address}\n City: ${formData.city}\n State: ${formData.state}\n Number Of Vehicle: ${formData.numberOfVehicles}`
            });
            if (response.data.message) {
                alert('Message sent successfully');
            } else {
                alert('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message');
        }
    };

    return (
        <div className='pb-20'>
            <div className='flex flex-col justify-center items-center py-4 rounded-xl bg-white px-3
        lg:flex-row lg:space-x-6
        space-y-6 lg:space-y-0
      '>
                <div className='p-2 bg-yellow-500 rounded-r-full rounded-b-full rounded-tl-[800px] flex justify-center items-center'>
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
                    <form className='w-full my-8' onSubmit={handleSubmit}>
                        {/* Mapping through each field dynamically */}
                        {Object.entries(formData).map(([key, value]) => (
                            <div className='my-4' key={key}>
                                <Input
                                    className='rounded-lg text-lg h-12'
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()} // Converts camelCase to Regular Case
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
                        <div className='my-8'>
                            <button type="submit" className='font-semibold rounded-3xl h-12 w-40 bg-yellow-500 border-yellow-500 hover:bg-yellow-400'>
                                SEND MESSAGE
                            </button>
                        </div>
                    </form>
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
            bg-[#F5F5F5]
            '>
                <BreadCrumb />
                <Content />
            </div>
            <Footer />
        </div>
    );
};

export default AttachTaxi;
