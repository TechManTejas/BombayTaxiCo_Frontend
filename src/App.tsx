// App.tsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import Details from "./pages/Details";
import UserNavbar from "./components/UserNavbar";
import Sidebar from "./admin/components/Sidebar";
import Bookings from "./admin/pages/Bookings";
import Taxis from "./admin/pages/Taxis";
import Drivers from "./admin/pages/Drivers";
import Coupons from "./admin/pages/Coupons";
import Invoices from "./admin/pages/Invoices";
import Settings from "./admin/pages/Settings";
import RoutesPage from "./admin/pages/RoutesPage";
import AdminNavbar from "./admin/components/Navbar";
import { ConfigProvider } from "antd";
import TaxiDetails from "./admin/pages/TaxiDetails";
import DriverDetails from "./admin/pages/DriverDetails";

import Citys from "./admin/pages/Citys";
import TaxtTypes from "./admin/pages/TaxtTypes";
import CitysAddEdit from "./admin/pages/CitysAddExit";
import CouponsAddEdit from "./admin/pages/CouponsAddEdit";
import DriversAddEdit from "./admin/pages/DriversAddEdit";
import TaxiTypesAddEdit from "./admin/pages/TaxiTypesAddEdit";
import TaxiAddEdit from "./admin/pages/TaxiAddEdit";
import RoutesAddEdit from "./admin/pages/RoutesAddEdit";
import BookingDetails from "./admin/pages/BookingDetails";
import Home from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Context } from "./context/context.provider";
import UserBookingDetails from "./pages/UserBookingDetails";
import InvoiceDetails from "./admin/pages/InvoiceDetails";
import InvoicesAddEdit from "./admin/pages/InvoiceAddEdit";
import Authentication from "./pages/Authentication";
import AttachTaxi from "./pages/AttachTaxi";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { CancellationPolicy } from "./pages/CancellationPolicy";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { FAQs } from "./pages/FAQs";
import { HourlyRental } from "./pages/HourlyRental";
import { OneWayTrip } from "./pages/OneWayTrip";
import UserInvoiceDetails from "./pages/InvoiceDetails";
// import StickyCallUs from "./components/CallUsSticky";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const UserRoutes: React.FC = () => {
  const { setUserAuthenticated } = Context();

  useEffect(() => {
    setUserAuthenticated(!!localStorage.getItem("token"));
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 3,
          colorPrimary: "#FDB813",
        },
        components: {
          Tabs: {
            inkBarColor: "#FDB813",
            itemColor: "#2A2A2A",
            itemActiveColor: "#FDB813",
            titleFontSize: 18,
            itemSelectedColor: "#FDB813",
          },
          Segmented: {
            itemSelectedBg: "#FDB813",
            borderRadiusSM: 14
          }
        },
      }}
    >
      <>
        {/* <StickyCallUs /> */}
        <div className="sticky top-0 z-40 shadow-md">
          <UserNavbar />
        </div>
        <Routes>
          {isAuthenticated() && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/booking" element={<UserBookingDetails />} />
            </>
          )}
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} /> */}
          <Route path="/search" element={<Search />} />
          <Route path="/details" element={<Details />} />
          <Route path="/attach-taxi" element={<AttachTaxi />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/hourly-rental" element={<HourlyRental />} />
          <Route path="/one-way-trip" element={<OneWayTrip />} />
          <Route path="/invoices/details" element={<UserInvoiceDetails />} />
        </Routes>
      </>
    </ConfigProvider>
  );
};

const AdminRoutes: React.FC = () => {
  const { adminAuthenticated } = Context();

  return (
    <>
      <AdminNavbar />
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 3,
            colorPrimary: "#FDB813",
          },
          components: {
            Tabs: {
              inkBarColor: "#9c9c9c",
              itemActiveColor: "black",
              titleFontSize: 18,
              itemSelectedColor: "black",
            },
          },
        }}
      >
        <>
          <div className="flex">
            {adminAuthenticated && <Sidebar />}
            <Routes>
              {adminAuthenticated && (
                <>
                  <Route path="/" element={<Navigate to={"bookings"} />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route
                    path="/bookings/details"
                    element={<BookingDetails />}
                  />
                  <Route path="/routes" element={<RoutesPage />} />
                  <Route path="/routes/add-edit" element={<RoutesAddEdit />} />
                  <Route path="/taxis" element={<Taxis />} />
                  <Route path="/taxis/details" element={<TaxiDetails />} />
                  <Route path="/taxis/add-edit/" element={<TaxiAddEdit />} />
                  <Route path="/drivers" element={<Drivers />} />
                  <Route path="/drivers/details" element={<DriverDetails />} />
                  <Route
                    path="/drivers/add-edit"
                    element={<DriversAddEdit />}
                  />
                  <Route path="/coupons" element={<Coupons />} />
                  <Route
                    path="/coupons/add-edit"
                    element={<CouponsAddEdit />}
                  />
                  <Route path="/invoices" element={<Invoices />} />
                  <Route
                    path="/invoices/add-edit"
                    element={<InvoicesAddEdit />}
                  />
                  <Route
                    path="/invoices/details"
                    element={<InvoiceDetails />}
                  />
                  <Route path="/cities" element={<Citys />} />
                  <Route path="/cities/add-edit" element={<CitysAddEdit />} />
                  <Route path="/taxitypes" element={<TaxtTypes />} />
                  <Route
                    path="/taxitypes/add-edit"
                    element={<TaxiTypesAddEdit />}
                  />
                  <Route path="/settings" element={<Settings />} />
                </>
              )}
              {!adminAuthenticated && (
                <>
                  <Route path="/" element={<Navigate to={"auth"} />} />
                  <Route path="/auth" element={<Authentication />} />
                </>
              )}
            </Routes>
          </div>
        </>
      </ConfigProvider>
    </>
  );
};

const App: React.FC = () => {
  return (
    <div className="font-lora">
      <Router>
        <Routes>
          {/* User Route  */}
          <Route path="/*" element={<UserRoutes />} />
          {/* <Route path="/*" element={<Navigate to={'admin'} />} /> */}
          {/* Admin Route  */}
          {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
