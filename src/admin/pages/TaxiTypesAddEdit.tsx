/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, Upload, UploadFile, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from "../../api/axios"
import { useLocation } from 'react-router-dom';
import { ITaxiType, ITaxiTypeFormValues } from '../../types/taxiTypes.types';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';

import AirConditioning from '../../icons/Air Conditioning.svg'
import AutomaticTransmission from "../../icons/Automatic Transmission.svg"
import Bags from "../../icons/Bags.svg"
import CabBootSpace from "../../icons/Cab Boot space.svg"
import CNG from "../../icons/CNG.svg"
import ComfortSeat from "../../icons/Comfort Seat.svg"
import Disel from "../../icons/Disel.svg"
import Passanger from "../../icons/Passanger.svg"
import RoofTopCarrier from "../../icons/Roof Top Carrier.svg"
import StandardSeat from "../../icons/Standard Seat.svg"

const featureIconMap = {
    'Air Conditioning': AirConditioning,
    'Automatic Transmission': AutomaticTransmission,
    'Bags': Bags,
    'Cab Boot Space': CabBootSpace,
    'CNG': CNG,
    'Comfort Seat': ComfortSeat,
    'Diesel': Disel,
    'Passenger': Passanger,
    'Roof Top Carrier': RoofTopCarrier,
    'Standard Seat': StandardSeat,
};

const TaxiTypesAddEdit: React.FC = () => {
    const { state } = useLocation()

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const goBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const taxiTypeToEdit: ITaxiType = state?.taxiType;

    // Extract id from editedCoupon or set it to undefined
    const id = taxiTypeToEdit?._id || undefined;

    // Set initial values for the form
    const initialValues: ITaxiTypeFormValues = {
        name: '',
        description: '',
        price_hour: 0,
        car_features: [],
        discount_percentage: 0
    };

    useEffect(() => {
        // If editedCoupon prop exists, set form fields with its details
        if (taxiTypeToEdit) {
            console.log(taxiTypeToEdit)
            // Set form fields
            form.setFieldsValue({
                ...taxiTypeToEdit
            });
            setFileList([{ uid: '-1', name: 'image.png', status: 'done', url: import.meta.env.VITE_BASE_URL + '/' + taxiTypeToEdit.image }]);
        } else {
            // Set initial values for new coupons
            form.setFieldsValue(initialValues);
        }
    }, [taxiTypeToEdit, form]);

    const onFinish = async (values: ITaxiTypeFormValues) => {

        const formData = new FormData();
        Object.keys(values).forEach(key => {
            if (key === 'car_features') {
                formData.append(key, JSON.stringify(values[key]));
            }
            else {
                formData.append(key, values[key]);
            }
        });
        if (fileList.length > 0) {
            fileList.forEach(file => {
                if ('originFileObj' in file && file.originFileObj) {
                    formData.append('image', file.originFileObj);
                }
            });
        }

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };
            if (id) {
                // Edit existing coupon
                await axios.put(`/taxitypes/${id}`, formData, config);
                message.success('Taxi Type Updated successfully!');
            } else {
                // Add new coupon
                await axios.post('/taxitypes', formData, config);
                message.success('Taxi Type Added successfully!');
                form.resetFields()
            }

            goBack()

        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating taxi type');
        }
    };

    const onFileChange = ({ fileList: newFileList }: UploadChangeParam<UploadFile<any>>) => {
        setFileList(newFileList);
    };

    return (
        <div className='px-10 py-6'>
            <div className='text-2xl font-light'>
                {id ? 'EDIT TAXI TYPE' : 'ADD NEW TAXI TYPE'}
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-4xl mx-auto mt-8">

                <Form.Item name="image" label="Taxi Image">
                    <Upload
                        listType="picture"
                        beforeUpload={() => false}
                        onChange={onFileChange}
                        fileList={fileList}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Form.Item name="name" label="Taxi Type Name" rules={[{ required: true, message: 'Please enter the taxi type name' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the taxi type description' }]}>
                    <Input.TextArea rows={4} className="w-full" />
                </Form.Item>

                <Space className='w-full'>
                    <Form.Item name="price_hour" label="Price Per Hr" rules={[{ required: true, message: 'Please enter the price per hour' }]}>
                        <Input className="w-full" />
                    </Form.Item>

                    <Form.Item name="discount_percentage" label="Discount Percentage" rules={[{ required: true, message: 'Please enter the discount percentage' }]}>
                        <Input type="number" min={0} max={100} className="w-full" suffix="%" />
                    </Form.Item>
                </Space>

                <Form.List name="car_features">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'feature']}
                                    >
                                        <Input placeholder="Car Feature" className="w-full" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'icon']}
                                        rules={[{ required: true, message: 'Please select an icon' }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Select Icon"
                                            optionFilterProp="children"
                                            className="w-full"
                                            popupMatchSelectWidth={false}
                                        >
                                            {Object.entries(featureIconMap).map(([feature, icon]) => (
                                                <Select.Option key={feature} value={feature}>
                                                    <Space>
                                                        <img src={icon} className='w-4 h-4'/> {feature}
                                                    </Space>
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Button type="dashed" onClick={() => remove(field.name)} icon={<MinusOutlined />} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                    Add Car Feature
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>


                <Form.Item>
                    <Space className='space-x-4'>
                        <Button htmlType="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10">
                            {id ? 'SAVE' : 'ADD'}
                        </Button>
                        <Button className="font-semibold w-28 h-10" onClick={goBack}>
                            CANCEL
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
};

export default TaxiTypesAddEdit;