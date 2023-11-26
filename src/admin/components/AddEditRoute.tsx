import React, { useState, useEffect } from 'react';
import { Select, Button, Form, Input, Space, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import axios from "../../api/axios"

const { Option } = Select;

interface Route {
    from: string;
    to: string;
    oneWayCost: number;
    twoWayCost: number;
    specialFare: number;
}

interface From {
    _id: string;
    name: string;
    status: 'Active' | 'Inactive';
}

interface To {
    _id: string;
    name: string;
    status: 'Active' | 'Inactive';
}


const AddEditRoute: React.FC = () => {
    //   const [form] = Form.useForm();
    const [routes, setRoutes] = useState<Route[]>([{ from: '', to: '', oneWayCost: 0, twoWayCost: 0, specialFare: 0 }]);
    const [toOptions, setToOptions] = useState<To[]>([]);
    const [fromOptions, setFromOptions] = useState<From[]>([]);
    const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

    useEffect(() => {
        // Fetch data using Axios from the provided endpoint
        axios.get('/froms/')
            .then((response) => {
                setFromOptions(response.data.froms);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

        axios.get('/tos/')
            .then((response) => {
                setToOptions(response.data.tos);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });

    }, []);

    const handleAddRoute = () => {
        setRoutes([...routes, { from: '', to: '', oneWayCost: 0, twoWayCost: 0, specialFare: 0 }]);
    };

    const handleRemoveRoute = (index: number) => {
        const updatedRoutes = [...routes];
        updatedRoutes.splice(index, 1);
        setRoutes(updatedRoutes);
    };

    const handleSettingsModalVisible = () => {
        setSettingsModalVisible(!isSettingsModalVisible);
    };

    return (
        <div>
            <Space direction="vertical">
                {routes.map((route, index) => (
                    <Space key={index} direction="vertical">
                        <Space>
                            <Form.Item
                                name={['routes', index, 'from']}
                                label="FROM"
                                rules={[{ required: true, message: 'Please select FROM' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select FROM"
                                    optionFilterProp="children"

                                >
                                    {/* Your options for 'FROM' dropdown */}
                                    {fromOptions.map((from) => (
                                        <Option key={from._id} value={from.name}>
                                            {from.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name={['routes', index, 'to']}
                                label="TO"
                                rules={[{ required: true, message: 'Please select TO' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select TO"
                                    optionFilterProp="children"
                                >
                                    {toOptions.map((to) => (
                                        <Option key={to._id} value={to.name}>
                                            {to.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Button
                                type="text"
                                icon={<SettingOutlined />}
                                onClick={handleSettingsModalVisible}
                                style={{ marginTop: '8px' }}
                            />
                        </Space>

                        <Space>
                            <Form.Item
                                name={['routes', index, 'oneWayCost']}
                                label="One-Way Cost"
                                rules={[{ required: true, message: 'Please enter One-Way Cost' }]}
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                            >
                                <Input style={{ width: '100%' }} type="number" placeholder="Enter One-Way Cost" />
                            </Form.Item>

                            {/* Add other form items for 'Two-Way Cost' and 'Special Fare' here */}

                            <Form.Item>
                                <Button
                                    className="bg-red-500 text-white"
                                    type="dashed"
                                    icon={<MinusCircleOutlined />}
                                    onClick={() => handleRemoveRoute(index)}
                                >
                                    Remove
                                </Button>
                            </Form.Item>
                        </Space>
                    </Space>
                ))}

                <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddRoute}>
                    Add Route
                </Button>
            </Space>

            {/* Settings Modal */}
            <Modal
                title="Manage From and To"
                open={isSettingsModalVisible}
                onCancel={handleSettingsModalVisible}
                footer={null}
            >
                {/* Form for managing 'From' and 'To' using the provided models */}
                {/* You can use the same form component or create a new one */}
            </Modal>
        </div>
    );
};

export default AddEditRoute;
