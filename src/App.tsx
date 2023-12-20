// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import About from './pages/About';
import Contact from './pages/Contact';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Details from './pages/Details';
import UserNavbar from './components/UserNavbar';
import Sidebar from './admin/components/Sidebar';
import Bookings from './admin/pages/Bookings';
import Taxis from './admin/pages/Taxis';
import Drivers from './admin/pages/Drivers';
import Coupons from './admin/pages/Coupons';
import Invoices from './admin/pages/Invoices';
import Settings from './admin/pages/Settings';
import RoutesPage from './admin/pages/RoutesPage';
import AdminNavbar from './admin/components/Navbar';
import { ConfigProvider } from 'antd';
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
import Home from './pages/Home';
import { Profile } from './pages/Profile';
import { Context } from './context/context.provider';
import UserBookingDetails from './pages/UserBookingDetails';
import InvoiceDetails from './admin/pages/InvoiceDetails';
import InvoicesAddEdit from './admin/pages/InvoiceAddEdit';

const isAuthenticated = () => {
  return(!!localStorage.getItem('token')); 
};

const UserRoutes: React.FC = () => {

  const { setUserAuthenticated } = Context();

  useEffect(() => {
    setUserAuthenticated(!!localStorage.getItem('token'))
  }, [])

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/booking" element={<UserBookingDetails />} />
          </>
        )}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
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
          <Route path="/invoices/add-edit" element={<InvoicesAddEdit />} />
          <Route path="/invoices/details" element={<InvoiceDetails />} />
          <Route path="/cities" element={<Citys />} />
          <Route path="/cities/add-edit" element={<CitysAddEdit />} />
          <Route path="/taxitypes" element={<TaxtTypes />} />
          <Route path="/taxitypes/add-edit" element={<TaxiTypesAddEdit />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
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
