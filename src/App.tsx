// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Results from './pages/Results';
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
import { ConfigProvider } from 'antd';

// Assume you have an authentication check function, you can replace it with your actual authentication logic.
const isAuthenticated = () => {
  // Replace this with your authentication logic
  return true; // For demonstration purposes, always consider the user as authenticated
};

const UserRoutes: React.FC = () => {
  return (
    <>
      <UserNavbar />
      <Routes>
        {isAuthenticated() && (
          <>
            <Route path="/results" element={<Results />} />
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
    </>
  )
}

const AdminRoutes: React.FC = () => {
  return (
    <>
      <AdminNavbar />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to={"bookings"} />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/taxis" element={<Taxis />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </>
  )
}


const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {

        },
        components: {
          Tabs: {
            inkBarColor: "black",
            itemActiveColor: "black",
            titleFontSize: 18,
            itemSelectedColor: 'black'
          },
        },
      }}
    >
      <Router>
        <Routes>
          {/* User Route  */}
          <Route path="/*" element={<UserRoutes />} />
          {/* Admin Route  */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;
