import React from 'react';
import { Form, Input, Button, Card } from 'antd';

interface AddEditFromProps {
  initialValues?: {
    name: string;
    address: string;
    phone: string;
  };
  onSubmit?: (values: any) => void;
}

const AddEditFrom: React.FC<AddEditFromProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Card title="Add/Edit Location (From)" className="w-full max-w-md">
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Location Name"
          name="name"
          rules={[{ required: true, message: 'Please enter location name!' }]}
        >
          <Input placeholder="Enter location name" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter address!' }]}
        >
          <Input.TextArea placeholder="Enter address" rows={3} />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: 'Please enter phone number!' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-[#FDB813] text-white border-none">
            Save Location
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddEditFrom;
