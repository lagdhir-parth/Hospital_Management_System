import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SidePanel from "./SidePanel";
import { Hospital, Phone, Menu, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const listHoverClasses =
    "text-white hover:text-(--color-primary-light) transition-colors duration-200 py-2 cursor-pointer  hover:underline-offset-5 hover:underline";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Departments", path: "/departments" },
    { name: "Doctors", path: "/doctors" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const { user, isAuthenticated, logout } = useAuth();
  const [navigateTo, setNavigateTo] = useState("/");

  useEffect(() => {
    if (!user?.role) {
      setNavigateTo("/");
      console.log("user role not accessed");
      return;
    }
    console.log(user.role);
    const path =
      user.role === "patient"
        ? "/profile/patient"
        : user.role === "doctor"
          ? "/profile/doctor"
          : user.role === "admin"
            ? "/profile/admin"
            : "/";
    setNavigateTo(path);
    console.log("Nav target:", path, "User:", user.role); // Debug
  }, [user?.role]); // ✅ Depend on role only

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // ✅ Use "click" instead of "mousedown" (less sensitive)
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
                      ? "text-(--color-primary-light) font-semibold border-b-2 border-(--color-primary-light) pb-0.5"
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
            <NavLink to="/bookAppointment">
              <button className="hidden xl:flex justify-center items-center gap-2 border border-(--color-border) px-4 py-2 rounded-full text-white font-semibold hover:bg-(--color-primary-light) transition-all duration-200 hover:text-(--color-text) hover:border-transparent">
                <Phone />
                <p>Book your Appointment</p>
              </button>
            </NavLink>

            {isAuthenticated ? (
              <div
                className="flex items-center justify-between gap-1"
                ref={dropdownRef}
                onClick={(e) => {
                  e.stopPropagation(); // ✅ Prevent bubble to document
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <div className="flex justify-center items-center border-2 border-(--color-border) rounded-full hover:border-(--color-primary-light) transition-colors duration-200 cursor-pointer">
                  <img
                    src={
                      user.profilePic ||
                      "https://res.cloudinary.com/dflzijhj0/image/upload/v1768822404/userProfilePicPlaceholder_h3etah.jpg"
                    }
                    alt="Profile"
                    className=" size-10 rounded-full object-cover"
                  />
                </div>
                <div className="relative group ">
                  <ChevronDown className="mx-auto mt-1 text-(--color-primary-light)" />
                  {isMenuOpen && (
                    <div className="absolute flex flex-col gap-2 mt-4 -right-1 bg-(--color-surface) border border-(--color-border) rounded-lg shadow-lg w-40 p-2">
                      <div>
                        <p className="text-sm text-(--color-text-muted) px-4 mb-1">
                          Signed in as
                        </p>
                        <p className="font-semibold text-(--color-text) px-4">
                          {user.username}
                        </p>
                      </div>
                      <hr className="border-(--color-text-muted)/50 w-9/10 mx-auto" />
                      <div>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false); // ✅ Close first
                            navigate(navigateTo); // ✅ Direct for reliability
                          }}
                          className="block w-full text-left px-4 py-2 text-(--color-text) hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setIsMenuOpen(false);
                            logout(); // From useAuth
                            navigate("/login");
                          }}
                          className="block w-full text-left px-4 py-2 text-(--color-text) hover:bg-gray-200 rounded-lg transition-colors duration-200 cursor-pointer"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <NavLink to="/login">
                <button className="cursor-pointer bg-(--color-primary) px-4 py-2 rounded-full text-white font-semibold hover:bg-(--color-primary-light) transition-all duration-200 hover:text-(--color-text)">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex lg:hidden text-xl">
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
