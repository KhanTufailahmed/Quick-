import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  ArrowRight,
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];
const SideBar = ({ SideBar, setSideBar }) => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  if (!isLoaded) return <div>Loading</div>;

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center 
  sm:translate-x-0 sm:relative
  max-sm:absolute top-14 bottom-0 left-0 
  ${SideBar ? "translate-x-0" : "-translate-x-full"} 
  transition-all duration-300 ease-in-out`}
    >
      <div className="w-full">
        <div>
          <img
            src={user.imageUrl}
            alt="user"
            className="w-13 rounded-full mx-auto"
          />
          <h1 className="mt-1 text-center">{user.fullName}</h1>
        </div>

        <div className="m-2 mt-5 text-sm text-gray-500 font-medium">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              end={item.to === "/ai"}
              onClick={() => setSideBar(false)} // ✅ fixed
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.Icon
                    className={`w-4 h-4 ${isActive ? "text-white" : ""}`} // ✅ added space before text-white
                  />
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full border-t border-gray-200 p-4 flex items-center justify-between">
        <img src={user.imageUrl} alt="user" className="w-8 rounded-full"></img>
        <div>
          <h1 className="text-sm font-medium"> {user.fullName}</h1>
          <p className="text-xs text-gray-500">
            <Protect plan={"premium"} fallback={"Free"}>Premium</Protect> Plan
          </p>
        </div>
        <LogOut
          onClick={signOut}
          className="w-4.5 text-gray-400 hover:text-gray-700 trasition cursor-pointer"
        ></LogOut>
      </div>
    </div>
  );
};

export default SideBar;
