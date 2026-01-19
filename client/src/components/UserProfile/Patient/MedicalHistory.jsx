import React, { useEffect, useState } from "react";
import api from "../../../api/axios";
import MedicalRecordCard from "../MedicalRecordCard";

const MedicalHistory = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const res = await api.get("/medicalRecords/userRecords");
        setMedicalRecords(res.data.data);
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };
    fetchMedicalHistory();
  }, []);

  return (
    <div>
      <MedicalRecordCard medicalRecords={medicalRecords} />
    </div>
  );
};

export default MedicalHistory;
