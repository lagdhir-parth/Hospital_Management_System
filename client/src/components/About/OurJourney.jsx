import React from "react";
import HeadingAndDesc from "../HeadingAndDesc";
import { Circle } from "lucide-react";

const OurJourney = () => {
  const journeyNodes = [
    {
      year: "2007",
      description:
        "Our journey began with a vision to revolutionize healthcare.",
    },
    {
      year: "1998",
      description: "Luen Hospital founded with 50 beds",
    },
    {
      year: "2005",
      description: "Expanded to 200 beds and added cardiac surgery unit",
    },
    {
      year: "2010",
      description: "Achieved Magnet Recognition for nursing excellence",
    },
    {
      year: "2015",
      description: "Opened state-of-the-art cancer treatment center",
    },
    {
      year: "2018",
      description: "Launched robotic surgery program",
    },
    {
      year: "2020",
      description: "Expanded emergency department and ICU capacity",
    },
    {
      year: "2023",
      description: "Became region's first Level II trauma center",
    },
    {
      year: "2024",
      description: "Celebrating 25+ years of healthcare excellence",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 space-y-10">
      <div className="flex place-content-center">
        <HeadingAndDesc
          heading="Our Journey"
          description="Since our inception, we have been dedicated to transforming healthcare through innovation, compassion, and excellence. Our journey is marked by significant milestones that reflect our commitment to improving patient outcomes and advancing medical research."
        />
      </div>
      <div className="flex place-content-center">
        <div className="flex flex-col place-content-center gap-8">
          {journeyNodes.map((node, index) => (
            <div key={index} className="flex items-center justify-start gap-5">
              <p className="text-(--color-primary) font-extrabold md:font-semibold w-8">
                {node.year}
              </p>
              <div className="relative flex flex-col items-center">
                {index !== 0 && (
                  <div className="absolute -top-14 bottom-3 w-0.5 md:w-1 bg-[#019a67]" />
                )}
                <Circle stroke="0" fill="#019a67" />
              </div>
              <p className="text-(--color-light-text) md:text-lg">
                {node.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
