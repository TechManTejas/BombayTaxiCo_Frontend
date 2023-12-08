import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Space, message } from 'antd';
import axios from "../../api/axios"
import { useLocation } from 'react-router-dom';
import { Taxi, TaxiFormValues } from '../../types/taxi.types';
import { TaxiType } from '../../types/taxiTypes.types';

const TaxiAddEdit: React.FC = () => {
    const { state } = useLocation()

    const [taxiTypes, setTaxiTypes] = useState<TaxiType[]>([]);

    const goBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const taxiToEdit: Taxi = state?.taxi;

    // Extract id from editedCoupon or set it to undefined
    const id = taxiToEdit?._id || undefined;

    // Set initial values for the form
    const initialValues: TaxiFormValues = {
        taxi_type_id: '',
        taxi_no: '',
        driving_license: '',
        taxi_status: 'Available',
    };

    useEffect(() => {
        // If editedCoupon prop exists, set form fields with its details
        if (taxiToEdit) {
            console.log(taxiToEdit)
            // Set form fields
            form.setFieldsValue({
                ...taxiToEdit,
                taxi_type_id: taxiToEdit.taxi_type_id._id
            });
        } else {
            // Set initial values for new coupons
            form.setFieldsValue(initialValues);
        }

        // Fetch taxiTypes and populate the options
        const fetchTaxiTypes = async () => {
            try {
                const response = await axios.get('/taxitypes');
                setTaxiTypes(response.data.taxitypes);
            } catch (error) {
                console.error('Error fetching taxi types:', error);
            }
        };

        fetchTaxiTypes();

    }, [taxiToEdit, form]);

    const onFinish = async (values: TaxiFormValues) => {
        try {
            if (id) {
                // Edit existing coupon
                await axios.put(`/taxis/${id}`, values);
                message.success('Taxi Updated successfully!');
            } else {
                // Add new coupon
                await axios.post('/taxis', values);
                message.success('Taxi Added successfully!');
                form.resetFields()
            }

            goBack()

        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating driver');
        }
    };


    return (
        <div className='px-10 py-6'>
            <div className='text-2xl font-light'>
                {id ? 'EDIT DRIVER' : 'ADD NEW DRIVER'}
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-xl mx-auto mt-8">

                <Form.Item name="taxi_type_id" label="Taxi Type" rules={[{ required: true, message: 'Please select the taxi type' }]}>
                    <Select className="w-full">
                        {taxiTypes.map((taxiType: TaxiType) => (
                            <Select.Option key={taxiType._id} value={taxiType._id}>
                                {taxiType.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="taxi_no" label="Taxi Number" rules={[{ required: true, message: 'Please enter the taxi number' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <Form.Item name="driving_license" label="Driving License" rules={[{ required: true, message: 'Please enter the driving license' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <Form.Item name="taxi_status" label="Driver Status" rules={[{ required: true, message: 'Please select the driver status' }]} style={{ width: '100%' }}>
                    <Select className="w-full">
                        <Select.Option value="Available">Available</Select.Option>
                        <Select.Option value="Unavailable">Unavailable</Select.Option>
                        <Select.Option value="Assigned">Assigned</Select.Option>
                        <Select.Option value="On a Trip">On a Trip</Select.Option>
                    </Select>
                </Form.Item>


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

export default TaxiAddEdit;