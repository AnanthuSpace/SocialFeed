import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
// import UserProtector from "../components/protector/UserProtector";
import LoginProtector from "../components/protector/LoginProtector";
import NotFound from "../components/NotFound";
import SignUpPage from "../pages/SignUpPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" element={<UserProtector><HomePage /></UserProtector>}/> */}
        <Route path="/signup" element={<LoginProtector><SignUpPage /></LoginProtector>} />
        {/* <Route path="/otp" element={<LoginProtector><OtpVerification /></LoginProtector>} /> */}
        <Route path="/" element={<LoginProtector><LoginPage /></LoginProtector>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
