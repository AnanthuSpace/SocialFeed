import React from "react";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden">
      <nav className="bg-[#020817] border-b border-white">
        <div className="container mx-auto">
          <h1 className="block text-center py-4 text-4xl font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-blue-600 text-transparent bg-clip-text">
            SocialFeed
          </h1>
        </div>
      </nav>
      <Login />
    </div>
  );
};

export default LoginPage;
