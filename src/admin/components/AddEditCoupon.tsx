import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Switch, Button, message } from 'antd';
import axios from '../../api/axios';
import moment from 'moment';
import { Coupon } from '../../types/coupons.types';

interface CouponFormProps {
  id?: string;
  editedCoupon?: Coupon | null; // Include the editedCoupon prop
  onCouponEdited: (editedCoupon: Coupon) => void;
}

interface CouponFormValues {
  name: string;
  discount_perc: number;
  from_date: moment.Moment;
  to_date: moment.Moment;
  forever: boolean;
  status: 'Active' | 'Inactive';
}

const AddEditCoupon: React.FC<CouponFormProps> = ({ editedCoupon, onCouponEdited }) => {
  const [form] = Form.useForm();

  // Extract id from editedCoupon or set it to undefined
  const id = editedCoupon?._id || undefined;

  // Set initial values for the form
  const initialValues: CouponFormValues = {
    name: '',
    discount_perc: 0,
    from_date: moment(),
    to_date: moment(),
    forever: false,
    status: 'Active',
  };

  useEffect(() => {
    // If editedCoupon prop exists, set form fields with its details
    if (editedCoupon) {
      // Convert date strings to moment objects
      const fromDate = moment(editedCoupon.from_date);
      const toDate = moment(editedCoupon.to_date);

      // Set form fields
      form.setFieldsValue({
        ...editedCoupon,
        from_date: fromDate,
        to_date: toDate,
      });
    } else {
      // Set initial values for new coupons
      form.setFieldsValue(initialValues);
    }
  }, [editedCoupon, form]);

  const onFinish = async (values: CouponFormValues) => {
    try {
      // Map the status value to true (Active) or false (Inactive)
      values.status = values.status ? 'Active' : 'Inactive';

      if (id) {
        // Edit existing coupon
        const response = await axios.put(`/coupons/${id}`, values);
        const editedCoupon = response.data.coupon;
        message.success('Coupon Updated successfully!');
        onCouponEdited(editedCoupon);
      } else {
        // Add new coupon
        const response = await axios.post('/coupons', values);
        const newCoupon = response.data;
        message.success('Coupon Added successfully!');
        onCouponEdited(newCoupon);
        form.resetFields()
      }

    } catch (error) {
      console.error('Error:', error);
      message.error('Error adding/updating coupon');
    }
  };

  return (
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
        <Switch checkedChildren="Active" unCheckedChildren="Inactive" className='bg-yellow-800' defaultChecked />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
          {id ? 'Save' : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEditCoupon;
