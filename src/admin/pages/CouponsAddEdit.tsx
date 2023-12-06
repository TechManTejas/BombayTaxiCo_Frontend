import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Space, Switch, message } from 'antd';
import axios from "../../api/axios"
import dayjs from "dayjs"
import { Coupon, CouponFormValues } from '../../types/coupons.types';
import { useLocation } from 'react-router-dom';

const CouponsAddEdit: React.FC = () => {
    const { state } = useLocation()

    const goBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const couponToEdit: Coupon = state?.coupon;

    // Extract id from editedCoupon or set it to undefined
    const id = couponToEdit?._id || undefined;
    // Set initial values for the form
    const initialValues: CouponFormValues = {
        name: '',
        discount_perc: 0,
        from_date: dayjs(),
        to_date: dayjs(),
        forever: false,
        status: 'Active',
    };

    useEffect(() => {
        // If editedCoupon prop exists, set form fields with its details
        if (couponToEdit) {
            // Convert date strings to moment objects
            const fromDate = dayjs(couponToEdit.from_date);
            const toDate = dayjs(couponToEdit.to_date);
            
            console.log(couponToEdit)
            // Set form fields
            form.setFieldsValue({
                ...couponToEdit,
                from_date: fromDate,
                to_date: toDate,
            });
        } else {
            // Set initial values for new coupons
            form.setFieldsValue(initialValues);
        }
    }, [couponToEdit, form]);

    const onFinish = async (values: CouponFormValues) => {
        try {
            // Map the status value to true (Active) or false (Inactive)
            values.status = values.status ? 'Active' : 'Inactive';

            if (id) {
                // Edit existing coupon
                await axios.put(`/coupons/${id}`, values);
                message.success('Coupon Updated successfully!');
            } else {
                // Add new coupon
                await axios.post('/coupons', values);
                message.success('Coupon Added successfully!');
                form.resetFields()
            }

            goBack()

        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating coupon');
        }
    };


    return (
        <div className='px-10 py-6'>
            <div className='text-2xl font-light'>
            {id ? 'EDIT COUPON' : 'AD NEW COUPON'}
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-md mx-auto mt-8">

                <div className="flex gap-4">
                    <Form.Item name="name" label="Coupon Name" rules={[{ required: true, message: 'Please enter the coupon name' }]}>
                        <Input className="w-full" />
                    </Form.Item>

                    <Form.Item
                        name="discount_perc"
                        label="Discount Percentage"
                        rules={[
                            { required: true, message: 'Please enter a valid discount percentage' },
                            {
                                validator: async (_, value) => {
                                    const discount = parseFloat(value);
                                    if (!isNaN(discount) && discount >= 0 && discount <= 100) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Discount percentage must be between 0 and 100');
                                },
                            },
                        ]}
                    >
                        <Input type="number" className="w-full" />
                    </Form.Item>
                </div>

                <div className="flex gap-4">
                    <Form.Item name="from_date" label="From Date" rules={[{ required: true, message: 'Please select the start date' }]}>
                        <DatePicker
                            className="w-full"
                        />
                    </Form.Item>

                    <Form.Item name="to_date" label="To Date" rules={[{ required: true, message: 'Please select the end date' }]}>
                        <DatePicker
                            className="w-full"
                        />
                    </Form.Item>

                    <Form.Item name="forever" label="Forever" valuePropName="checked">
                        <Switch checkedChildren="Yes" unCheckedChildren="No" className='bg-yellow-800' />
                    </Form.Item>
                </div>

                <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" className='bg-yellow-800' defaultChecked={couponToEdit.status === "Active"} />
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

export default CouponsAddEdit;