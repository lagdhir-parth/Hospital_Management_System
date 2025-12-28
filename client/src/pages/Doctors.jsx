import React from "react";
import Heading from "../components/Doctors/Heading";
import ExpertDoctorSection from "../components/Doctors/ExpertDoctorSection";
import ScheduleAppointment from "../components/Doctors/ScheduleAppointment";

const Doctors = () => {
  return (
    <div>
      <Heading />
      <ExpertDoctorSection />
      <ScheduleAppointment />
    </div>
  );
};

export default Doctors;
