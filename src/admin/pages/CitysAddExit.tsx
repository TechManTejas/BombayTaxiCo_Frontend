import React, { useEffect } from 'react';
import { Button, Form, Input, Space, Switch, message } from 'antd';
import axios from "../../api/axios"
import { useLocation } from 'react-router-dom';
import { ICity, ICityFormValues } from '../../types/citys.types';

const CitysAddEdit: React.FC = () => {
    const { state } = useLocation()

    const goBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const cityToEdit: ICity = state?.city;

    // Extract id from editedCoupon or set it to undefined
    const id = cityToEdit?._id || undefined;

    // Set initial values for the form
    const initialValues: ICityFormValues = {
        name: '',
        status: 'Active',
    };

    useEffect(() => {
        // If editedCoupon prop exists, set form fields with its details
        if (cityToEdit) {
            console.log(cityToEdit)
            // Set form fields
            form.setFieldsValue({
                ...cityToEdit,
                status: cityToEdit.status === "Active" ? "Active" : "Inactive",
            });
        } else {
            // Set initial values for new coupons
            form.setFieldsValue(initialValues);
        }
    }, [cityToEdit, form]);

    const onFinish = async (values: ICityFormValues) => {
        try {
            // Map the status value to true (Active) or false (Inactive)
            values.status = values.status ? 'Active' : 'Inactive';

            if (id) {
                // Edit existing coupon
                await axios.put(`/citys/${id}`, values);
                message.success('City Updated successfully!');
            } else {
                // Add new coupon
                await axios.post('/citys', values);
                message.success('City Added successfully!');
                form.resetFields()
            }

            goBack()

        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating city');
        }
    };


    return (
        <div className='px-10 py-6'>
            <div className='text-2xl font-light'>
                {id ? 'EDIT CITY' : 'ADD NEW CITY'}
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-md mx-auto mt-8">

                <Form.Item name="name" label="City Name" rules={[{ required: true, message: 'Please enter the city name' }]}>
                    <Input className="w-full" />
                </Form.Item>

                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" className='bg-yellow-800' defaultChecked={cityToEdit?.status === "Active" || true}/>
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

export default CitysAddEdit;