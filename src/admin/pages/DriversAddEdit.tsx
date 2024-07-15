import React, { useEffect } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import axios from "../../api/axios";
import { useLocation } from "react-router-dom";
import { ICity, ICityFormValues } from "../../types/citys.types";
import { IDriverFormValues } from "../../types/drivers.types";

const DriversAddEdit: React.FC = () => {
  const { state } = useLocation();

  const goBack = () => {
    window.history.back();
  };

  const [form] = Form.useForm();
  const driverToEdit: ICity = state?.driver;

  // Extract id from editedCoupon or set it to undefined
  const id = driverToEdit?._id || undefined;

  // Set initial values for the form
  const initialValues: IDriverFormValues = {
    name: "",
    mobile_no: "",
    email_id: "",
    address: "",
    driving_license: "",
    driver_status: "Available",
  };

  useEffect(() => {
    // If editedCoupon prop exists, set form fields with its details
    if (driverToEdit) {
      console.log(driverToEdit);
      // Set form fields
      form.setFieldsValue({
        ...driverToEdit,
      });
    } else {
      // Set initial values for new coupons
      form.setFieldsValue(initialValues);
    }
  }, [driverToEdit, form]);

  const onFinish = async (values: ICityFormValues) => {
    try {
      if (id) {
        // Edit existing coupon
        await axios.put(`/drivers/${id}`, values);
        message.success("Driver Updated successfully!");
      } else {
        // Add new coupon
        await axios.post("/drivers", values);
        message.success("Driver Added successfully!");
        form.resetFields();
      }

      goBack();
    } catch (error) {
      console.error("Error:", error);
      message.error("Error adding/updating driver");
    }
  };

  return (
    <div className="px-10 py-6">
      <div className="text-2xl font-light">
        {id ? "EDIT DRIVER" : "ADD NEW DRIVER"}
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="max-w-3xl mx-auto mt-8"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the driver name" }]}
        >
          <Input className="w-full" />
        </Form.Item>

        <Space>
          <Form.Item
            name="mobile_no"
            label="Mobile Number"
            rules={[
              { required: true, message: "Please enter the mobile number" },
              { len: 10, message: "Mobile number must be 10 digits" },
              {
                pattern: /^[0-9]+$/,
                message: "Mobile number must be digits only",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            name="email_id"
            label="Email ID"
            rules={[{ type: "email", message: "Please enter the email ID" }]}
          >
            <Input className="w-full" />
          </Form.Item>
        </Space>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter the address" }]}
        >
          <Input.TextArea className="w-full" autoSize={{ minRows: 3 }} />
        </Form.Item>

        <Space className="w-full">
          <Form.Item
            className="w-full"
            name="driving_license"
            label="Driving License"
            rules={[
              { required: true, message: "Please enter the driving license" },
            ]}
          >
            <Input className="w-full"/>
          </Form.Item>

          <Form.Item
          className="w-full"
            name="driver_status"
            label="Driver Status"
            rules={[
              { required: true, message: "Please select the driver status" },
            ]}
          >
            <Select className="w-full">
              <Select.Option value="Available">Available</Select.Option>
              <Select.Option value="Unavailable">Unavailable</Select.Option>
              <Select.Option value="Assigned">Assigned</Select.Option>
              <Select.Option value="On a Trip">On a Trip</Select.Option>
            </Select>
          </Form.Item>
        </Space>

        <Form.Item>
          <Space className="space-x-4">
            <Button
              htmlType="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold w-28 h-10"
            >
              {id ? "SAVE" : "ADD"}
            </Button>
            <Button className="font-semibold w-28 h-10" onClick={goBack}>
              CANCEL
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DriversAddEdit;
