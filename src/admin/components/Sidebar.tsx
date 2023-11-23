import React from 'react';
import { Layout, Menu } from 'antd';
import {
    FileOutlined,
    EnvironmentOutlined,
    CarOutlined,
    TeamOutlined,
    DollarOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css"

const { Sider } = Layout;

const Sidebar: React.FC = () => {

    const navigate = useNavigate();

    const handleMenuClick = (key: string) => {
        // Convert the key to lowercase and navigate to the respective route
        navigate(`${key.toLowerCase()}`);
    };

    return (
        <Sider
            width={200}
            className="bg-[#242124] h-[calc(100vh-78px)]"
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={['Bookings']}
                className='h-full bg-inherit text-xl text-white'
                onClick={({ key }) => handleMenuClick(key as string)}
            >
                <Menu.Item key="Bookings" icon={<FileOutlined />}>Bookings</Menu.Item>
                <Menu.Item key="Routes" icon={<EnvironmentOutlined />}>Routes</Menu.Item>
                <Menu.Item key="Taxis" icon={<CarOutlined />}>Taxis</Menu.Item>
                <Menu.Item key="Drivers" icon={<TeamOutlined />}>Drivers</Menu.Item>
                <Menu.Item key="Coupons" icon={<DollarOutlined />}>Coupons</Menu.Item>
                <Menu.Item key="Invoices" icon={<FileOutlined />}>Invoices</Menu.Item>
                <Menu.Item key="Settings" icon={<SettingOutlined />}>Settings</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
