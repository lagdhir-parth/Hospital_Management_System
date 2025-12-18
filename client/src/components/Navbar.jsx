import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SidePanel from "./SidePanel";
import { Hospital, Phone, Menu } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const listHoverClasses =
    "text-white hover:text-(--color-primary-light) transition-colors duration-200 py-2 cursor-pointer";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <nav className="fixed h-[10vh] w-full bg-(--color-primary-dark) flex justify-between items-center p-4 py-5 text-white md:px-20 z-49 ">
        <NavLink to="/">
          <div className="flex font-bold text-xl md:text-2xl">
            <div className="mr-2">
              <Hospital size={30} />
            </div>
            <p>Hospital Management</p>
          </div>
        </NavLink>

        <div className="hidden md:block">
          <ul className="flex gap-10">
            {navItems.map((item) => (
              <li key={item.name} className="h-full">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-(--color-primary-light) font-semibold border-b-2 border-(--color-primary-light)"
                      : listHoverClasses
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">
          <div className="flex gap-3 items-center">
            <button className="hidden xl:flex justify-center items-center gap-2 border border-(--color-border) px-4 py-2 rounded-full text-white font-semibold hover:bg-(--color-primary-light) transition-all duration-200 hover:text-(--color-text) hover:border-transparent">
              <Phone />
              <p>Book your Appointment</p>
            </button>

            <NavLink to="/login">
              <button className="cursor-pointer bg-(--color-primary) px-4 py-2 rounded-full text-white font-semibold hover:bg-(--color-primary-light) transition-all duration-200 hover:text-(--color-text)">
                Login
              </button>
            </NavLink>
          </div>
        </div>

        <div className="flex md:hidden text-xl">
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="cursor-pointer"
          >
            <Menu />
          </button>
        </div>
      </nav>
      <SidePanel props={{ open, setOpen }} />
    </>
  );
};

export default Navbar;
