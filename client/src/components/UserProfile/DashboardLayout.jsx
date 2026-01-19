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

  const location = useLocation();
  const sidebarOptions = location.pathname.includes("/profile/patient")
    ? patientSidebarOptions
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
