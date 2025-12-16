import React from "react";
import { CircleCheckBig } from "lucide-react";
import BgPrimaryBtn from "../bgPrimaryBtn";

const HealingPhilosophySection = () => {
  const healingPhilosophies = [
    "Patient-centered approach in every interaction",
    "Latest medical technology and treatment methods",
    "Experienced team of board-certified specialists",
    "Comprehensive care coordination across departments",
    "Evidence-based medicine with compassionate care",
  ];

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row md:justify-between gap-20 md:gap-17 py-10 md:py-30 px-4 md:px-[8vw] bg-(--color-bg)">
      <div className="lg:w-5/10 flex justify-center items-center ">
        <img
          className="lg:w-120 w-full h-auto rounded-2xl object-cover shadow-md md:shadow-2xl"
          src="https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwbW9kZXJuJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzU5MTY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        />
      </div>
      <div className="lg:w-5/10 w-98/100 flex flex-col gap-6">
        <p className="font-bold text-4xl">Our Healing Philosophy</p>
        <p className="text-lg text-(--color-text-muted)">
          At Luen Hospital, we believe that exceptional healthcare combines
          cutting-edge medical expertise with genuine human compassion. Our
          philosophy centers on treating not just the condition, but the whole
          person.
        </p>
        <div className="flex flex-col gap-4 mb-5">
          {healingPhilosophies.map((philosophy, index) => (
            <div key={index} className="flex items-start md:items-center gap-3">
              <span>
                <CircleCheckBig size={16} color="#019a67" />
              </span>
              <p className="text-[0.99rem] text-(--color-text-muted)">
                {philosophy}
              </p>
            </div>
          ))}
        </div>
        <div className="w-full self-start">
          <BgPrimaryBtn text="Learn More About Us" />
        </div>
      </div>
    </div>
  );
};

export default HealingPhilosophySection;
