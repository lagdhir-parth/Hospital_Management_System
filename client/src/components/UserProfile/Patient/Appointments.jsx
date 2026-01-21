import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import AppointmentCard from "./AppointmentCard";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(
          "/appointments/getPatientSpecificAppointments",
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.log("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);
  return (
    <div>
      <AppointmentCard appointments={appointments} />
    </div>
  );
};

export default Appointments;
