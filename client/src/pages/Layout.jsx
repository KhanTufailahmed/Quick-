import { assets } from "@/assets/assets";
import SideBar from "@/components/Layout/SideBar";
import { SignIn,useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const {user}=useUser()
  return user?(
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <img className="cursor-pointer w-32 sm:w-44" src={assets.logo} alt="logo" onClick={() => navigate("/")} />
        {sideBar ? (
          <X
            onClick={() => setSideBar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          ></X>
        ) : (
          <Menu
            onClick={() => setSideBar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          ></Menu>
        )}
      </nav>
      <div className="flex-1  w-full flex h-[calc(100vh-64px)]">
        {/* Sidebar goes first so it appears on the left */}
        <SideBar SideBar={sideBar} setSideBar={setSideBar} />

        <div className="flex-1 bg-[#F4F7FB]">
          <Outlet />
        </div>
      </div>
    </div>
  ):(
    <div className="flex items-center justify-center h-screen">
      <SignIn></SignIn>
    </div>
  );
};

export default Layout;
