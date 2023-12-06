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
import { useLocation, useNavigate } from 'react-router-dom';
import "./Sidebar.css"

const { Sider } = Layout;

const Sidebar: React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // Extract the last part of the pathname after the last slash ("/")
    const currentPath = location.pathname.split('/').pop() || '';
    console.log(currentPath)

    // Map the path to the corresponding menu key
    const defaultSelectedKey = {
        bookings: 'Bookings',
        routes: 'Routes',
        taxis: 'Taxis',
        drivers: 'Drivers',
        coupons: 'Coupons',
        invoices: 'Invoices',
        settings: 'Settings',
    }[currentPath] || 'Bookings'; // Default to 'Bookings' if the path is not recognized

    const handleMenuClick = (key: string) => {
        navigate(`/admin/${key}`);
    };


    return (
        <Sider
            width={200}
            className="bg-[#242124] h-[calc(100vh-78px)]"
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={[defaultSelectedKey]}
                className='h-full bg-inherit text-xl text-white space-y-2'
                onClick={({ key }) => handleMenuClick(key as string)}
            >
                <Menu.Item key="bookings" icon={<FileOutlined />}>Bookings</Menu.Item>
                <Menu.Item key="routes" icon={<EnvironmentOutlined />}>Routes</Menu.Item>
                <Menu.Item key="taxis" icon={<CarOutlined />}>Taxis</Menu.Item>
                <Menu.Item key="drivers" icon={<TeamOutlined />}>Drivers</Menu.Item>
                <Menu.Item key="coupons" icon={<DollarOutlined />}>Coupons</Menu.Item>
                <Menu.Item key="invoices" icon={<FileOutlined />}>Invoices</Menu.Item>
                <Menu.Item key="cities" icon={<EnvironmentOutlined />}>Cities</Menu.Item>
                <Menu.Item key="taxi-types" icon={<CarOutlined />}>Taxi Types</Menu.Item>
                <Menu.Item key="settings" icon={<SettingOutlined />}>Settings</Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
