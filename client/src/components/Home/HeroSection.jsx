import React from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-[#edfbf9] h-screen flex flex-col md:justify-center md:items-center md:flex-wrap md:flex-row py-30 md:py-0 md:px-[8vw] gap-10 md:gap-0">
      <div className="md:size-5/10">
        <div className="px-4 md:px-6">
          <p className=" font-bold text-4xl md:text-[clamp(2.8rem,4vw,6rem)] mb-9 leading-12 md:leading-tight">
            Healing with Care,
            <br />
            <span className="text-(--color-primary) font-bold">
              Rooted in Trust
            </span>
          </p>
          <p className="text-(--color-text-muted) text-xl md:text-[clamp(1.2rem,1.5vw,2rem)] mb-10 md:mb-10 leading-auto md:leading-9">
            Where modern medicine meets heartfelt care. Working hand in hand
            with the finest care team every step of the way.
          </p>

          <div className="flex flex-col md:flex-row flex-wrap gap-7 w-full">
            <Link to="/bookAppointment">
              <BgPrimaryBtn text="Book an appointment" />
            </Link>
            <Link to="/services">
              <BgPrimaryLightBtn text="Our services" />
            </Link>
          </div>
        </div>
      </div>
      <div className="md:size-5/10 flex justify-center items-center">
        <div className="relative flex justify-center items-center">
          <img
            className="sm:w-120 w-95/100 h-auto rounded-2xl object-cover shadow-2xl"
            src="https://res.cloudinary.com/dflzijhj0/image/upload/v1769665386/HeroImg_z99rka.jpg"
            alt="Hero Image"
          />
          <div className="absolute -bottom-5 left-0 md:-left-5 bg-(--color-surface) p-4 rounded-2xl shadow-lg flex gap-8">
            <div className="flex flex-col justify-center items-center border-r border-gray-300 pr-4">
              <p className="text-xl text-(--color-success) font-bold">25+</p>
              <p className="text-(--color-text-muted)">Years Experience</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl text-(--color-info) font-bold">50k+</p>
              <p className="text-(--color-text-muted)">Happy Patients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
