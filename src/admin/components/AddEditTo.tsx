import React from 'react';
import { Form, Input, Button, Card } from 'antd';

interface AddEditToProps {
  initialValues?: {
    name: string;
    address: string;
    phone: string;
  };
  onSubmit?: (values: any) => void;
}

const AddEditTo: React.FC<AddEditToProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Card title="Add/Edit Location (To)" className="w-full max-w-md">
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Destination Name"
          name="name"
          rules={[{ required: true, message: 'Please enter destination name!' }]}
        >
          <Input placeholder="Enter destination name" />
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
            Save Destination
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddEditTo;
