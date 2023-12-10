// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Details from './pages/Details';
import UserNavbar from './components/UserNavbar';
// import { ThemeProvider } from './theme/ThemeContext';
import Sidebar from './admin/components/Sidebar';
import Bookings from './admin/pages/Bookings';
import Taxis from './admin/pages/Taxis';
import Drivers from './admin/pages/Drivers';
import Coupons from './admin/pages/Coupons';
import Invoices from './admin/pages/Invoices';
import Settings from './admin/pages/Settings';
import RoutesPage from './admin/pages/RoutesPage';
import AdminNavbar from './admin/components/Navbar';
import { Button, ConfigProvider, message } from 'antd';
import TaxiDetails from './admin/pages/TaxiDetails';
import DriverDetails from './admin/pages/DriverDetails';

import Citys from './admin/pages/Citys';
import TaxtTypes from './admin/pages/TaxtTypes';
import CitysAddEdit from './admin/pages/CitysAddExit';
import CouponsAddEdit from './admin/pages/CouponsAddEdit';
import DriversAddEdit from './admin/pages/DriversAddEdit';
import TaxiTypesAddEdit from './admin/pages/TaxiTypesAddEdit';
import TaxiAddEdit from './admin/pages/TaxiAddEdit';
import RoutesAddEdit from './admin/pages/RoutesAddEdit';
import BookingDetails from './admin/pages/BookingDetails';
import axios from './api/axios';
import Home from './pages/Home';

// Assume you have an authentication check function, you can replace it with your actual authentication logic.
const isAuthenticated = () => {
  // Replace this with your authentication logic
  return true; // For demonstration purposes, always consider the user as authenticated
};

const UserRoutes: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 3
        },
        components: {
          Tabs: {
            inkBarColor: "#FDB813",
            itemColor: "#2A2A2A",
            itemActiveColor: "#FDB813",
            titleFontSize: 18,
            itemSelectedColor: '#FDB813'
          },
        },
      }}
    >
      <UserNavbar />
      <Routes>
        {isAuthenticated() && (
          <>
            <Route path="/search" element={<Search />} />
            <Route path="/details" element={<Details />} />
            <Route path="/signin" element={<Navigate to="/home" />} />
            <Route path="/signup" element={<Navigate to="/home" />} />
          </>
        )}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </ConfigProvider>
  )
}

const AdminRoutes: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 3
        },
        components: {
          Tabs: {
            inkBarColor: "#9c9c9c",
            itemActiveColor: "black",
            titleFontSize: 18,
            itemSelectedColor: 'black'
          },
        },
      }}>
      <AdminNavbar />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to={"bookings"} />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/bookings/details" element={<BookingDetails />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/routes/add-edit" element={<RoutesAddEdit />} />
          <Route path="/taxis" element={<Taxis />} />
          <Route path="/taxis/details" element={<TaxiDetails />} />
          <Route path="/taxis/add-edit/" element={<TaxiAddEdit />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/details" element={<DriverDetails />} />
          <Route path="/drivers/add-edit" element={<DriversAddEdit />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/coupons/add-edit" element={<CouponsAddEdit />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/cities" element={<Citys />} />
          <Route path="/cities/add-edit" element={<CitysAddEdit />} />
          <Route path="/taxitypes" element={<TaxtTypes />} />
          <Route path="/taxitypes/add-edit" element={<TaxiTypesAddEdit />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Button className='fixed bottom-10 right-10 bg-red-600 text-white font-bold' onClick={() => {
          axios.post('/bookings', {
            "route_id": "6572c1a8ca33ef1ccd88d835",
            "user_id": "655b53ea836ff392cb7a5c45",
            "coupon_id": "65635b2754b6537722c51471",
            "taxi_id": "65708c60a279b0069aabdf54",
            "driver_id": "656314eaec5a0fb95343ab5d",
            "pick_up_date": "2023-12-15T00:00:00.000Z",
            "pick_up_time": "2023-12-15T10:00:00.000Z",
            "return_date": "2023-12-16T00:00:00.000Z",
            "return_time": "2023-12-16T18:00:00.000Z",
            "pickup_address": "123 Main Street, Cityville",
            "drop_address": "456 Destination Avenue, Townsville",
            "trip_type": "One Way",
            "requested_taxi_type": "65707e9f44d12174a2a3e298"
          })
            .then(response => {
              // Handle success
              console.log('Booking created successfully:', response.data);
              // You can use the response data or show a success message to the user
              message.success('Booking created successfully');
            })
            .catch(error => {
              // Handle error
              console.error('Error creating booking:', error);
              // You can show an error message to the user
              message.error('Error creating booking. Please try again.');
            });
        }}>
          CREATE DUMMY ONE WAY TRIP
        </Button>
      </div>
    </ConfigProvider>
  )
}


const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* User Route  */}
          <Route path="/*" element={<UserRoutes />} />
          {/* Admin Route  */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
