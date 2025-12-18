import React from "react";
import MainHeading from "../components/MainHeading";
import HeroDepartmentSection from "../components/Home/HeroDepartmentSection";

const Departments = () => {
  return (
    <div>
      <MainHeading
        title="Our Medical Departments"
        description="Comprehensive medical care across multiple specialties with world-class facilities and expert physicians."
      />
      <div className="-mt-17">
        <HeroDepartmentSection />
      </div>
    </div>
  );
};

export default Departments;
