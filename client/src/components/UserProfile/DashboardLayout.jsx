import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileNav from "./ProfileNav";
import {
  Settings,
  CircleUserRound,
  ReceiptIndianRupee,
  ClipboardClock,
  House,
  FileText,
  UserCheck,
  Stethoscope,
  Building2,
} from "lucide-react";

const DashboardLayout = () => {
  const patientSidebarOptions = [
    { name: "Home", icon: <House size={30} />, path: "/" },
    {
      name: "Appointments",
      icon: <ClipboardClock size={30} />,
      path: "appointments",
    },
    {
      name: "Medical History",
      icon: <FileText size={30} />,
      path: "medical-history",
    },
    {
      name: "Billing",
      icon: <ReceiptIndianRupee size={30} />,
      path: "billing",
    },
    {
      name: "Profile",
      icon: <CircleUserRound size={30} />,
      path: "personal-info",
    },
    { name: "Settings", icon: <Settings size={30} />, path: "settings" },
  ];

  const doctorSidebarOptions = [
    { name: "Home", icon: <House size={30} />, path: "/" },
    {
      name: "Appointments",
      icon: <ClipboardClock size={30} />,
      path: "appointments",
    },
    {
      name: "Medical History",
      icon: <FileText size={30} />,
      path: "medical-history",
    },
    {
      name: "Treated Patients",
      icon: <UserCheck size={30} />,
      path: "treated-patients",
    },
    {
      name: "Profile",
      icon: <CircleUserRound size={30} />,
      path: "personal-info",
    },
    { name: "Settings", icon: <Settings size={30} />, path: "settings" },
  ];

  const adminSidebarOptions = [
    { name: "Home", icon: <House size={30} />, path: "/" },
    {
      name: "User Management",
      icon: <UserCheck size={30} />,
      path: "user-management",
    },
    {
      name: "Doctor Management",
      icon: <Stethoscope size={30} />,
      path: "doctor-management",
    },
    {
      name: "Medical Records",
      icon: <FileText size={30} />,
      path: "medical-records",
    },
    {
      name: "Bills and Payments",
      icon: <ReceiptIndianRupee size={30} />,
      path: "bills-and-payments",
    },
    {
      name: "Departments",
      icon: <Building2 size={30} />,
      path: "department-management",
    },
    {
      name: "Profile",
      icon: <CircleUserRound size={30} />,
      path: "personal-info",
    },
  ];

  const location = useLocation();
  const sidebarOptions = location.pathname.includes("/profile/patient")
    ? patientSidebarOptions
    : location.pathname.includes("/profile/doctor")
      ? doctorSidebarOptions
      : location.pathname.includes("/profile/admin")
        ? adminSidebarOptions
        : []; // Add other roles' sidebar options as needed

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside>
        <ProfileSidebar sidebarOptions={sidebarOptions} />
        <ProfileNav sidebarOptions={sidebarOptions} />
      </aside>
      <div className="w-full bg-(--color-bg) min-h-screen p-4 md:p-8 lg:p-16 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
