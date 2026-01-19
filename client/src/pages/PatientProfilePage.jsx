import React from "react";
import { Outlet } from "react-router-dom";

const PatientProfilePage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PatientProfilePage;
