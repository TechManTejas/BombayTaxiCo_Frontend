import React from 'react';
import { Menu } from 'antd';
import "./Sidebar.css"
import { confirmation } from './Confirmation';
import { Context } from '../context/context.provider';
import LogoutIcon from "../icons/Logout.svg"

interface SidebarProps {
    handleTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleTabChange }) => {

    const { setUserAuthenticated } = Context();

    const handleLogout = async () => {
        const shouldLogout = await confirmation('Are you sure you want to log out?');

        if (shouldLogout) {
            localStorage.removeItem("token");
            setUserAuthenticated(false)
            window.location.href = '/'
            console.log('Logout performed!');
        }
    };

    return (
        <div className="
            md:h-[calc(100vh-136px)]
            bg-stone-100
            lg:bg-white
        ">
            <Menu
                mode={(window.innerWidth > 1024)? "vertical":"horizontal"}
                defaultSelectedKeys={["bookings"]}
                className='h-full bg-inherit lg:text-xl gap-2 lg:w-36'
            >
                <Menu.Item key="bookings" onClick={() => {
                    handleTabChange("bookings")
                }}>Bookings</Menu.Item>
                <Menu.Item key="invoices" onClick={() => {
                    handleTabChange("invoices")
                }}>Invoices</Menu.Item>
                <Menu.Item key="profile" onClick={() => {
                    handleTabChange("profile")
                }}>Profile</Menu.Item>
                <Menu.Item key="logout" onClick={handleLogout}>
                 <div className='flex gap-1 items-center'>
                    <img src={LogoutIcon}/>
                    Log out
                    </div>
                </Menu.Item>
            </Menu>
        </div>
    );
};

export default Sidebar;
