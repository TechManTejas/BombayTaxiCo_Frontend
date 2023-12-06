import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Select, Space, Switch, message } from 'antd';
import axios from "../../api/axios"
import { useLocation } from 'react-router-dom';
import { IRoute, RouteFormValues } from '../../types/routes.types';
import { City } from '../../types/citys.types';

const RoutesAddEdit: React.FC = () => {
    const { state } = useLocation()

    // State to store the list of cities
    const [cities, setCities] = useState([]);

    const goBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const routeToEdit: IRoute = state?.route;

    // Extract id from editedCoupon or set it to undefined
    const id = routeToEdit?._id || undefined;
    // Set initial values for the form
    const initialValues: RouteFormValues = {
        from_id: '',
        to_id: '',
        one_way_trip_km: 0,
        round_trip_km: 0,
        route_status: 'Active'
    };

    useEffect(() => {
        // Fetch cities from the API
        const fetchCities = async () => {
            try {
                const response = await axios.get('/citys');
                setCities(response.data.citys);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        // If editedCoupon prop exists, set form fields with its details
        if (routeToEdit) {
            console.log(routeToEdit)
            // Set form fields
            form.setFieldsValue({
                ...routeToEdit,
                from_id: routeToEdit.from_id._id,
                to_id: routeToEdit.to_id._id
            });

        } else {
            // Set initial values for new coupons
            form.setFieldsValue(initialValues);
        }
    }, [routeToEdit, form]);

    
    const onFinish = async (values: RouteFormValues) => {
        console.log(values)
        try {
            // Map the status value to true (Active) or false (Inactive)
            values.route_status = values.route_status ? 'Active' : 'Inactive';

            if (id) {
                // Edit existing coupon
                await axios.put(`/routes/${id}`, values);
                message.success('Route Updated successfully!');
            } else {
                // Add new coupon
                await axios.post('/routes', values);
                message.success('Route Added successfully!');
                form.resetFields()
            }

            goBack()

        } catch (error) {
            console.error('Error:', error);
            message.error('Error adding/updating route');
        }
    };


    return (
        <div className='px-10 py-6'>
            <div className='text-2xl font-light'>
                {id ? 'EDIT ROUTE' : 'ADD NEW ROUTE'}
            </div>
            <Form form={form} onFinish={onFinish} layout="vertical" className="max-w-md mx-auto mt-8">

                <Form.Item name="from_id" label="From" rules={[{ required: true, message: 'Please select the from city' }]}>
                    {/* Use Select component to choose from cities */}
                    <Select>
                        {/* Map through the cities to populate the options */}
                        {cities.map((city: City) => (
                            <Select.Option key={city._id} value={city._id}>
                                {city.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="to_id" label="To" rules={[{ required: true, message: 'Please select the to city' }]}>
                    {/* Use Select component to choose to cities */}
                    <Select>
                        {/* Map through the cities to populate the options */}
                        {cities.map((city: City) => (
                            <Select.Option key={city._id} value={city._id}>
                                {city.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Space>
                    <Form.Item name="one_way_trip_km" label="One Way Trip Distance (in km)" rules={[{ required: true, message: 'Please enter the one-way trip distance' }]}>
                        {/* Use InputNumber for numeric input */}
                        <InputNumber className="w-full" />
                    </Form.Item>

                    <Form.Item name="round_trip_km" label="Round Trip Distance (in km)" rules={[{ required: true, message: 'Please enter the round trip distance' }]}>
                        {/* Use InputNumber for numeric input */}
                        <InputNumber className="w-full" />
                    </Form.Item>
                </Space>

                <Form.Item name="route_status" label="Status" rules={[{ required: true, message: 'Please select the status' }]}>
                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" className='bg-yellow-800' defaultChecked={routeToEdit.route_status === "Active"} />
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

export default RoutesAddEdit;