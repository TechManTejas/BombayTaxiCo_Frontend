/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CallUsNow } from "../components/CallUsNow";
import { Footer } from "../components/Footer";
import { Button, Form, Input, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import Driver from "../assets/images/driver.jpg";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const BreadCrumb: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-gray-700 container py-6 flex space-x-1">
        <button
          className="hover:text-yellow-[#FDB813] hover:underline"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <div>{">"} Contact Us</div>
      </div>
    </>
  );
};

const Cards: React.FC = () => {
  return (
    <div
      className="grid justify-items-center py-16
      md:grid-cols-2
      xl:grid-cols-4
    "
    >
      <div className="p-4 rounded-3xl bg-white m-8 w-[282px] h-[280px] shadow-xl">
        <div className="p-3">
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center">
              <EnvironmentOutlined className="text-3xl text-white" />
            </div>
            <div className="font-black text-2xl">Office Address</div>
            <div className="font-medium ">
              Shop no. 1 Sai Society, Mhada Colony, Laxmi Nagar, Ghatkopar East,
              Mumbai 400075
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-3xl bg-white m-8 w-[282px] h-[280px] shadow-xl">
        <div className="p-3">
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center">
              <PhoneOutlined className="text-3xl text-white" />
            </div>
            <div className="font-black text-2xl">For Reservations</div>
            <div>
              <div className="">For Reservations</div>
              <div className="font-medium ">+91-6262-744-744</div>
              {/* <div className=''>For Reservations</div>
              <div className='font-medium '>0 (800) 456 4040</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-3xl bg-white m-8 w-[282px] h-[280px] shadow-xl">
        <div className="p-3">
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center">
              <MailOutlined className="text-3xl text-white" />
            </div>
            <div className="font-black text-2xl">Email Us</div>
            <div>
              <div className="text-center">Reach us by email</div>
              <div className="font-medium ">bombaytaxicompany@gmail.com</div>
              {/* <div className=''>Customer Service</div>
              <div className='font-medium '>vans@domain.com</div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-3xl bg-white m-8 w-[282px] h-[280px] shadow-xl">
        <div className="p-3">
          <div className="flex flex-col justify-center items-center space-y-3">
            <div className="h-20 w-20 bg-yellow-500 rounded-full flex justify-center items-center">
              <ClockCircleOutlined className="text-3xl text-white" />
            </div>
            <div className="font-black text-2xl">Open Timing</div>
            <div>
              <div className="">Operating Hours</div>
              <div className="font-medium ">Mon - Fri 9.30 am - 8pm</div>
              <div className="">Operating Hours</div>
              <div className="font-medium ">Sat - Sun 10 am - 7pm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GetInTouch: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post("/emails/send-email-contact", {
        subject: values.subject,
        message: `
      <div>
          <p>Name: ${values.name}</p>
          <p>Email: ${values.email}</p>
          <p>Message: ${values.message}</p>
      </div>`,
      });
      const data = response.data;
      if (data.message) {
        notification.success({
          message: "Message Sent",
          description: "Your message has been sent successfully.",
        });
        form.resetFields();
      } else {
        notification.error({
          message: "Failed",
          description: "Failed to send message.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error",
        description: "Error sending message.",
      });
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="pb-20">
      <div
        className="flex flex-col justify-center items-center py-4 rounded-xl bg-white px-3
        lg:flex-row lg:space-x-6
        space-y-6 lg:space-y-0
      "
      >
        <div className="p-2 bg-yellow-500 rounded-r-full rounded-b-full rounded-tl-[800px] flex justify-center items-center">
          <div className="p-2 bg-white rounded-r-full rounded-b-full rounded-tl-[600px] flex justify-center items-center">
            <img
              src={Driver}
              className="object-cover  bg-gray-200 rounded-r-full rounded-b-full rounded-tl-[800px]
              w-[360px] h-[360px]
              md:w-[420px] 
              md:h-[420px]
              xl:w-[570px] 
              xl:h-[570px]
            "
            />
          </div>
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          className="
          lg:w-1/2
        "
        >
          <div className="space-y-3">
            <div className="text-3xl font-bold">Get In Touch</div>
            <div className="text-gray-500">
              We're here to help! Whether you have a question about our
              services, need assistance or just want to talk, don't hesitate to
              reach out. Our team is eager to assist you. Drop us a message
              using the form below or get in touch through any of our contact
              channels. We look forward to hearing from you!
            </div>
          </div>
          <div className="w-full my-8">
            <div
              className="flex w-full
              space-x-2
              md:space-x-8
            "
            >
              <div className="w-full">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input
                    className="rounded-lg text-lg h-12"
                    placeholder="Your Name"
                  />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    className="rounded-lg text-lg h-12"
                    placeholder="Your Email"
                  />
                </Form.Item>
              </div>
            </div>
            <div
              className="
              my-2
            "
            >
              <Form.Item
                name="subject"
                rules={[
                  { required: true, message: "Please input your subject!" },
                ]}
              >
                <Input
                  className="rounded-lg text-lg h-12"
                  placeholder="Your Subject"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name="message"
                rules={[
                  { required: true, message: "Please input your message!" },
                ]}
              >
                <TextArea
                  style={{ height: "160px" }}
                  className="text-lg"
                  placeholder="Write Your Message"
                />
              </Form.Item>
            </div>
          </div>
          <div className="my-8">
            <Form.Item>
              <Button
                loading={loading}
                type="link"
                htmlType="submit"
                className="font-semibold rounded-3xl h-12 w-40 bg-yellow-500 border-yellow-500 hover:bg-yellow-400 text-black"
              >
                SEND MESSAGE
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

const Map: React.FC = () => {
  return (
    <>
      <div style={{ width: "100%", height: "360px" }}>
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: "0" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224497.57524876792!2d-74.0061!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903f1db3a33%3A0xfbc8881b500713e9!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1619584178044!5m2!1sen!2sus"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

const Contact: React.FC = () => {
  return (
    <div>
      <div
        className="
        px-4
        sm:px-8
        md:px-16
        lg:px-20
        xl:px-28
        2xl:px-32
      bg-[#F5F5F5]"
      >
        <BreadCrumb />
        <div className="text-center text-3xl font-medium">
          Any questions? Get in touch with us!
        </div>
        <Cards />
        <GetInTouch />
      </div>
      <Map />
      <CallUsNow />
      <Footer />
    </div>
  );
};

export default Contact;
