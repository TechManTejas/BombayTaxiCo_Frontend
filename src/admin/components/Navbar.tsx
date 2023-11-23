import React from 'react';
import Logo from "../../assets/images/logo.webp"

const AdminNavbar: React.FC = () => {
    return (
        <div className='w-full bg-zinc-200'>
            <div className="container mx-auto">
                <nav className="rounded-xl drop-shadow flex justify-between items-center content-center">
                    <h1 className="p-4 w-52 md:w-72">
                        <img
                            alt="Bombay Taxi Logo"
                            src={Logo}
                            decoding="async"
                        />
                    </h1>
                    <div className="text-xl font-bold hidden md:block">
                        ADMIN
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default AdminNavbar;
