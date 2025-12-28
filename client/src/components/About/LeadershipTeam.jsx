import React from "react";
import HeadingAndDesc from "../HeadingAndDesc";
import LeaderCard from "./LeaderCard";

const LeadershipTeam = () => {
  const leaders = [
    {
      name: "Dr. Margaret Hayes",
      position: "Chief Executive Officer",
      image:
        "https://images.unsplash.com/photo-1734002886107-168181bcd6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkxMjMzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Dr. Hayes brings over 20 years of healthcare leadership experience to Luen Hospital.",
    },
    {
      name: "Dr. David Chen",
      position: "Chief Medical Officer",
      image:
        "https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMG1lZGljYWx8ZW58MXx8fHwxNzU5MTI2NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Dr. Chen oversees all medical services and ensures the highest quality of patient care.",
    },
    {
      name: "Sarah Johnson",
      position: "Chief Nursing Officer",
      image:
        "https://images.unsplash.com/photo-1734002886107-168181bcd6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkxMjMzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      bio: "Sarah leads our nursing team with passion for patient care and clinical excellence.",
    },
  ];
  return (
    <section className=" bg-(--color-bg) py-20 px-4">
      <div className=" md:w-9/11 mx-auto space-y-8">
        <div className="flex place-content-center">
          <HeadingAndDesc
            heading="Our Leadership Team"
            description="Experienced leaders dedicated to advancing healthcare excellence"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 t gap-8 px-4 md:px-8 lg:px-16">
          {leaders.map((leader, index) => (
            <LeaderCard
              key={index}
              name={leader.name}
              position={leader.position}
              image={leader.image}
              bio={leader.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
