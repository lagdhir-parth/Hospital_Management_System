import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import api from "../../api/axios";

const ExpertDoctorSection = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors/allDoctors");
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  console.log(doctors);

  return (
    <section className="flex justify-center items-center bg-(--color-bg)">
      <div className="w-full px-4 py-20 md:w-8/10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-10">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default ExpertDoctorSection;
