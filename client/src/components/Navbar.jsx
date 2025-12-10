import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidePanel from "./SidePanel";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const listClasses = "inline-block cursor-pointer";
  const listHoverClasses =
    " hover:text-(--color-primary-light) transition-all duration-200 py-2";

  return (
    <>
      <nav className="bg-(--color-primary-dark) flex justify-between items-center p-4 text-white md:px-20 md:py-5 ">
        <NavLink to="/">
          <div className="flex font-bold text-xl">
            <div className="mr-2">
              <FontAwesomeIcon icon="fa-solid fa-hospital" />
            </div>
            <p>
              <span className="text-primary-light">Hospital </span>Management
            </p>
          </div>
        </NavLink>

        <div className="hidden md:block">
          <ul className="flex gap-10">
            <li className={listClasses}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-(--color-primary-light) font-semibold"
                    : "text-white " + listHoverClasses
                }
              >
                Home
              </NavLink>
            </li>

            <li className={listClasses}>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive
                    ? "text-(--color-primary-light) font-semibold"
                    : "text-white" + listHoverClasses
                }
              >
                Services
              </NavLink>
            </li>
            <li className={listClasses}>
              <NavLink
                to="/departments"
                className={({ isActive }) =>
                  isActive
                    ? "text-(--color-primary-light) font-semibold"
                    : "text-white" + listHoverClasses
                }
              >
                Departments
              </NavLink>
            </li>
            <li className={listClasses}>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-(--color-primary-light) font-semibold"
                    : "text-white" + listHoverClasses
                }
              >
                About
              </NavLink>
            </li>
            <li className={listClasses}>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive
                    ? "text-(--color-primary-light) font-semibold"
                    : "text-white" + listHoverClasses
                }
              >
                Doctors
              </NavLink>
            </li>
            <li className={listClasses}>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-(--color-primary-light) font-semibold"
                    : "text-white" + listHoverClasses
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <div className="flex gap-3 items-center">
            <button className="hidden xl:flex justify-center items-center gap-2 border border-(--color-border) px-4 py-2 rounded-full text-white font-semibold hover:bg-(--color-primary-light) transition-all duration-200 hover:text-(--color-text) hover:border-transparent">
              <FontAwesomeIcon icon="fa-solid fa-phone" />
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
            <FontAwesomeIcon icon="fa-solid fa-bars" />
          </button>
        </div>
      </nav>
      <SidePanel props={{ open, setOpen }} />
    </>
  );
};

export default Navbar;
