/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Logo from "../assets/images/logo.webp"
import { Button, Drawer, Form, Input, Menu, Modal, Tabs, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import axios from '../api/axios';
import TabPane from 'antd/es/tabs/TabPane';
import { Context } from '../context/context.provider';

interface LoginFormProps {
    hideLoginModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ hideLoginModal }) => {

    const { setUserAuthenticated } = Context();

    const onFinish = async (values: any) => {
        try {
            // Send a post request to the /signin endpoint with the mobile number
            const response = await axios.post('/users/signin', { mobile_no: values.number });

            // Save the JWT token in localStorage
            localStorage.setItem('token', response.data.token);
            setUserAuthenticated(true)

            // Close the login modal
            hideLoginModal();

            // Show a success message
            message.success('Login successful');
        } catch (error) {
            // Handle and display error messages
            console.error(error);
            message.error('Login failed. Please try again.');
        }
    };

    return (
        <Form name="login" onFinish={onFinish}>
            <Form.Item
                name="number"
                rules={[{ required: true, message: 'Please enter your mobile number' }]}
            >
                <Input placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item>
                <button onSubmit={onFinish} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold w-full h-10 rounded-lg border-yellow-500 z-10">
                    Login
                </button>
            </Form.Item>
        </Form>
    );
};

interface RegisterFormProps {
    hideLoginModal: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ hideLoginModal }) => {
    const onFinish = async (values: any) => {
        try {
            // Send a post request to the /register endpoint with user details
            await axios.post('/users/register', {
                mobile_no: values.number,
                email_id: values.email,
                name: values.name,
            });

            // Close the login modal
            hideLoginModal();

            // Show a success message
            message.success('Registration successful');
        } catch (error) {
            // Handle and display error messages
            console.error(error);
            message.error('Registration failed. Please try again.');
        }
    };

    return (
        <Form name="register" onFinish={onFinish}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
            >
                <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
                name="number"
                rules={[{ required: true, message: 'Please enter your mobile number' }]}
            >
                <Input placeholder="Mobile Number" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Invalid email address' },
                ]}
            >
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item>
                <button onSubmit={onFinish} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold w-full h-10 rounded-lg border-yellow-500 z-10">
                    Register
                </button>
            </Form.Item>
        </Form>
    );
};

const UserNavbar: React.FC = () => {

    const { userAuthenticated, openAuthModal, setOpenAuthModal } = Context();

    const [activeTab, setActiveTab] = useState('login');
    const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState<boolean>(false);
    const navigate = useNavigate()

    const handleTabChange = (key: string) => {
        setActiveTab(key);
    };

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const hideDrawer = (key?: string) => {
        if (key) {
            navigate(key)
        }
        setIsDrawerVisible(false);
    };

    const showLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const hideLoginModal = () => {
        setIsLoginModalVisible(false);
        setOpenAuthModal(false)
    };

    return (
        <>
            <Modal
                open={isLoginModalVisible || openAuthModal}
                onCancel={hideLoginModal}
                footer={null}
                centered
            >
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="Login" key="login">
                        <LoginForm hideLoginModal={hideLoginModal} />
                    </TabPane>
                    <TabPane tab="Register" key="register">
                        <RegisterForm hideLoginModal={hideLoginModal} />
                    </TabPane>
                </Tabs>
            </Modal>
            <div className="bg-[#2A2A2A]">
                <div className="container px-2 mx-auto flex justify-center md:justify-between py-4">
                    <div className="hidden md:block">
                        <p className="text-white">
                            We Provide{/* */}
                            <span className="text-yellow-500 mx-1">
                                The Best Service &amp; Discounts
                            </span>
                            for you{/* */}
                        </p>
                    </div>
                    <div>
                        <div className="inline-block mr-4">
                            <a
                                href="mailto:support@bombaytaxicompany.com"
                                className="inline-block text-sm align-middle text-white hover-desktop:hover:underline"
                            >
                                <span className="inline-block mr-1 align-middle">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        color="#FDB813"
                                        style={{ color: "#FDB813" }}
                                        height="1.2rem"
                                        width="1.2rem"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </span>
                                <span>
                                    {" "}
                                    {/* */}support@bombaytaxicompany.com{/* */} {/* */}
                                </span>
                            </a>
                        </div>
                        <div className="inline-block">
                            <a
                                href="tel:+91-6262-744-744"
                                className="inline-block text-sm align-middle text-white hover-desktop:hover:underline"
                            >
                                <span className="inline-block align-middle">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 24 24"
                                        color="#FDB813"
                                        style={{ color: "#FDB813" }}
                                        height="1.2rem"
                                        width="1.2rem"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path fill="none" d="M0 0h24v24H0z" />
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                    </svg>
                                </span>
                                <span>+91-6262-744-744</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto">
                <nav className="bg-secondary rounded-xl drop-shadow flex justify-between items-center content-center">
                    <h1 className="p-4 w-52 md:w-72">
                        <span
                            style={{
                                boxSizing: "border-box",
                                display: "block",
                                overflow: "hidden",
                                width: "initial",
                                height: "initial",
                                background: "none",
                                opacity: 1,
                                border: 0,
                                margin: 0,
                                padding: 0,
                                position: "relative"
                            }}
                        >
                            <span
                                style={{
                                    boxSizing: "border-box",
                                    display: "block",
                                    width: "initial",
                                    height: "initial",
                                    background: "none",
                                    opacity: 1,
                                    border: 0,
                                    margin: 0,
                                    padding: 0,
                                    paddingTop: "17.842323651452283%"
                                }}
                            />
                            <img
                                onClick={() => window.location.href = '/'}
                                alt="Bombay Taxi Logo"
                                src={Logo}
                                decoding="async"
                                data-nimg="responsive"
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    boxSizing: "border-box",
                                    padding: 0,
                                    border: "none",
                                    margin: "auto",
                                    display: "block",
                                    width: 0,
                                    height: 0,
                                    minWidth: "100%",
                                    maxWidth: "100%",
                                    minHeight: "100%",
                                    maxHeight: "100%"
                                }}
                                sizes="100vw"
                            />
                        </span>
                    </h1>

                    <div className="flex md:hidden">
                        <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: '1.5rem' }} />}
                            onClick={showDrawer}
                        />
                    </div>

                    <div className='flex space-x-6'>
                        {userAuthenticated ?
                            <button className="text-xl font-medium hidden md:block hover:text-yellow-500" onClick={()=>{
                                navigate('/profile')
                            }}>
                                <UserOutlined /> PROFILE
                            </button>
                            : <button className="text-xl font-medium hidden md:block hover:text-yellow-500" onClick={showLoginModal}>
                                <UserOutlined /> LOGIN
                            </button>
                        }
                    </div>
                </nav>
            </div>
            <Drawer
                title="Menu"
                placement="right"
                open={isDrawerVisible}
                onClose={() => {
                    hideDrawer()
                }}
            >
                <Menu
                    mode="vertical"
                    defaultSelectedKeys={[]}
                    style={{ width: '100%' }}
                >
                    <Menu.Item key="search" onClick={() => {
                        hideDrawer("search")
                    }}>
                        Book a Taxi
                    </Menu.Item>
                    <Menu.Item key="details" onClick={() => {
                        hideDrawer("details")
                    }}>
                        Details
                    </Menu.Item>
                    <Menu.Item key="about" onClick={() => {
                        hideDrawer("about")
                    }}>
                        About Us
                    </Menu.Item>
                    <Menu.Item key="contact" onClick={() => {
                        hideDrawer("contact")
                    }}>
                        Contact Us
                    </Menu.Item>
                    <Menu.Item key="profile" onClick={() => {
                        hideDrawer("profile")
                    }}>
                        Profile
                    </Menu.Item>
                </Menu>
            </Drawer>
            <Button className='bg-red-600 text-white font-bold fixed bottom-5 right-5 z-10 rounded' onClick={() => {
                navigate('/admin')
            }}>
                Admin
            </Button>
        </>
    );
};

export default UserNavbar;
