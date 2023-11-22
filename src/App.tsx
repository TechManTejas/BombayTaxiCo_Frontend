// App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Results from "./pages/Results";
import Details from "./pages/Details";
import Navbar from "./components/Navbar";

// Assume you have an authentication check function, you can replace it with your actual authentication logic.
const isAuthenticated = () => {
  // Replace this with your authentication logic
  return true; // For demonstration purposes, always consider the user as authenticated
};

const App: React.FC<{}> = () => {
  return (
    <>
      <Navbar />
      <Router>
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
      </Router>
    </>
  );
};

export default App;
