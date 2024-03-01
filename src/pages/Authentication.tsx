/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Context } from "../context/context.provider";
import axios from "../api/axios"
import { Button, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
    const { setAdminAuthenticated } = Context();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post('/admins/signin', { username, password });
            console.log(response.data);
            localStorage.setItem('admin-token', response.data.token);
            message.success('Sign in successful');
            navigate('/admin/')
            setAdminAuthenticated(true)

        } catch (error: any) {
            console.error(error.response.data);
            message.error('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-1 flex-col justify-center items-center w-full h-full">
            <div className='space-y-6 m-12 w-[300px]'>
                <div>
                    <Input
                        className='text-center rounded-none'
                        placeholder="Username"
                        prefix={<UserOutlined className="site-form-item-icon" style={{ color: '#FDB813' }} />}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        className='text-center rounded-none'
                        placeholder="Password"
                        prefix={<LockOutlined className="site-form-item-icon" style={{ color: '#FDB813' }} />}
                        style={{ textAlign: 'center' }}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <Button type="primary" className="bg-[#FDB813] text-black primary-6 px-6 rounded-sm w-full" onClick={handleLogin}>
                        Sign in
                    </Button>
                </div>
            </div>
        </div>
    );
}
