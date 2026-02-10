import React, { use, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const ProfileNav = ({ sidebarOptions }) => {
  const { user } = useAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const isOpen = !isSidebarCollapsed;
  const { logout } = useAuth();

  const menuIconContainerClasses = `flex justify-start gap-8 w-min ${
    !isSidebarCollapsed ? "px-4 py-2" : "p-2"
  } rounded-md hover:bg-(--color-primary-light) cursor-pointer transition-colors duration-200 hover:text-(--color-text)`;

  const menuIconLabelClasses = `${
    isSidebarCollapsed ? "hidden" : "block"
  } text-xl font-medium whitespace-nowrap`;

  return (
    <>
      <nav className="md:hidden sticky top-0 left-0 z-40 h-[9vh] w-full bg-(--color-primary-dark) text-(--color-light-primary-bg) flex items-center justify-between px-7">
        <div onClick={() => setIsSidebarCollapsed(false)}>
          <Menu size={27} />
        </div>
        <div>
          <h1 className="text-xl text-(--color-light-primary-bg) font-extrabold">
            Profile
          </h1>
        </div>
        <div>
          <img
            src={user.profilePic || import.meta.env.VITE_USERPLACEHOLDERIMG}
            alt={`${user.name}'s profile`}
            className="size-10 rounded-full border-2 border-(--color-border) hover:border-(--color-primary-light) transition-colors duration-200"
          />
        </div>
      </nav>
      <div
        className={`fixed top-0 left-0 z-50 h-screen w-screen bg-black/50 md:hidden
              transition-opacity duration-300
              ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
        onClick={() => setIsSidebarCollapsed(true)}
      >
        <aside
          className={`h-full w-min bg-red-500 transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="bg-(--color-primary-dark) h-full p-6 flex flex-col items-start justify-between transition-all duration-300 text-(--color-light-primary-bg)">
            {/* 6vw for collapse, 20vw for expanded */}

            <div className={`flex justify-start w-full`}>
              <div
                className={`flex justify-center gap-8 w-min  p-2 rounded-md hover:bg-(--color-primary-light) cursor-pointer transition-colors duration-200 hover:text-(--color-text) ${
                  isSidebarCollapsed
                    ? "bg-transparent"
                    : "bg-(--color-primary-light)/40"
                } `}
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                <X size={30} className="shrink-0" />
              </div>
            </div>
            <div className="flex flex-col gap-5 items-start w-full mt-10">
              {sidebarOptions.map((option, index) => (
                <SideBarOptions
                  key={index}
                  name={option.name}
                  icon={option.icon}
                  path={option.path}
                  isSidebarCollapsed={isSidebarCollapsed}
                />
              ))}
            </div>
            <div className="w-min flex justify-center mb-4 gap-5 p-2 rounded-md cursor-pointer transition-colors duration-200">
              <div
                onClick={() => {
                  logout();
                }}
                className={
                  menuIconContainerClasses +
                  " text-[#ff4e5d] items-center border border-(--color-border) hover:bg-(--color-light-primary-bg) hover:text-[#ff1126]"
                }
              >
                <div className="shrink-0">
                  <LogOut size={30} stroke="#ff4e5d" strokeWidth={3} />
                </div>
                <p className={menuIconLabelClasses}>Logout</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

const SideBarOptions = (props) => {
  const containerClasses = `flex justify-start items-center gap-4  ${
    !props.isSidebarCollapsed ? "w-full px-4 py-2" : "w-min p-2"
  } rounded-md hover:bg-(--color-primary-light) cursor-pointer transition-all duration-300 hover:text-(--color-text)`;

  const labelClasses = `${
    props.isSidebarCollapsed ? "hidden" : "block"
  } text-xl font-medium whitespace-nowrap flex-shrink-0`;

  return (
    <NavLink
      to={props.path}
      className={({ isActive }) =>
        isActive
          ? containerClasses + ` bg-(--color-primary-light)/40`
          : containerClasses
      }
    >
      <div className="shrink-0">{props.icon}</div>
      <p className={labelClasses}>{props.name}</p>
    </NavLink>
  );
};

export default ProfileNav;
