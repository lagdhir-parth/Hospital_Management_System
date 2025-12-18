import React from "react";
import BgPrimaryBtn from "../bgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";

const HeroSection = () => {
  return (
    <div className="bg-[#edfbf9] h-screen  flex flex-col md:justify-center md:items-center md:flex-wrap md:flex-row py-30 md:py-0 md:px-[8vw] gap-10 md:gap-0">
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

          <div className="flex flex-wrap gap-7">
            <BgPrimaryBtn text="Book an appointment" />
            <BgPrimaryLightBtn text="Our services" />
          </div>
        </div>
      </div>
      <div className="md:size-5/10 flex justify-center items-center">
        <div className="relative flex justify-center items-center">
          <img
            className="sm:w-120 w-95/100 h-auto rounded-2xl object-cover shadow-2xl"
            src="https://images.unsplash.com/photo-1758691462123-8a17ae95d203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9uJTIwbWVkaWNhbCUyMGNhcmV8ZW58MXx8fHwxNzU5MTMxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
