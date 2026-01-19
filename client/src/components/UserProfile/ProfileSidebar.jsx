import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const ProfileSidebar = ({ sidebarOptions }) => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  const navigate = useNavigate();

  const sideBarWidth = isSideBarCollapsed ? 6 : 20; // in vw

  const { logout } = useAuth();

  const menuIconContainerClasses = `flex justify-start gap-8 w-min ${
    !isSideBarCollapsed ? "px-4 py-2" : "p-2"
  } rounded-md hover:bg-(--color-primary-light) cursor-pointer transition-colors duration-200 hover:text-(--color-text)`;

  const menuIconLabelClasses = `${
    isSideBarCollapsed ? "hidden" : "block"
  } text-xl font-medium whitespace-nowrap`;

  return (
    <aside className="hidden md:block sticky top-0 left-0 h-screen z-40">
      <div
        style={{ minWidth: `${sideBarWidth}vw` }}
        className="bg-(--color-primary-dark) h-full p-6 flex flex-col items-start justify-between transition-all duration-300 text-(--color-light-primary-bg)"
      >
        {/* 6vw for collapse, 20vw for expanded */}

        <div className={`flex justify-start w-full`}>
          <div
            className={`flex justify-center gap-8 w-min  p-2 rounded-md hover:bg-(--color-primary-light) cursor-pointer transition-colors duration-200 hover:text-(--color-text) ${
              isSideBarCollapsed
                ? "bg-transparent"
                : "bg-(--color-primary-light)/40"
            } `}
            onClick={() => setIsSideBarCollapsed(!isSideBarCollapsed)}
          >
            <Menu size={30} />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-start w-full mt-10">
          {sidebarOptions.map((option, index) => (
            <SideBarOptions
              key={index}
              name={option.name}
              icon={option.icon}
              path={option.path}
              isSideBarCollapsed={isSideBarCollapsed}
            />
          ))}
        </div>
        <div className="w-min flex justify-center mb-4 gap-5 p-2 rounded-md cursor-pointer transition-colors duration-200">
          <div
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className={
              menuIconContainerClasses +
              " text-[#ff4e5d] items-center border border-(--color-border) hover:bg-(--color-light-primary-bg) hover:text-[#ff1126]"
            }
          >
            <LogOut size={30} stroke="#ff4e5d" strokeWidth={3} />
            <p className={menuIconLabelClasses}>Logout</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const SideBarOptions = (props) => {
  const containerClasses = `flex justify-start gap-8  ${
    !props.isSideBarCollapsed ? "w-full px-4 py-2" : "w-min p-2"
  } rounded-md hover:bg-(--color-primary-light) cursor-pointer transition-all duration-300 hover:text-(--color-text)`;

  const labelClasses = `${
    props.isSideBarCollapsed ? "hidden" : "block"
  } text-xl font-medium whitespace-nowrap`;

  return (
    <NavLink
      to={props.path}
      className={({ isActive }) =>
        isActive
          ? containerClasses + ` bg-(--color-primary-light)/40`
          : containerClasses
      }
    >
      {props.icon}
      <p className={labelClasses}>{props.name}</p>
    </NavLink>
  );
};

export default ProfileSidebar;
