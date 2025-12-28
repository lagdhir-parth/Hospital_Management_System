import ContentCard from "../ContentCard";
import HeadingAndDesc from "../HeadingAndDesc";
import { Car, Bus, Ambulance } from "lucide-react";

const TransportationOptions = () => {
  const transportationOptions = [
    {
      icon: <Car size={35} />,
      title: "Driving",
      description:
        "Free parking available in our main parking garage. Valet parking available for patients.",
    },
    {
      icon: <Bus size={35} />,
      title: "Public Transport",
      description:
        "Metro bus lines 12, 34, and 56 stop directly in front of the hospital.",
    },
    {
      icon: <Ambulance size={35} />,
      title: "Emergency Services",
      description:
        "Emergency ambulance services available 24/7. Call 911 for emergency transport.",
    },
  ];

  return (
    <div className="px-4 py-20 md:w-8/10 mx-auto">
      <div className="flex justify-center">
        <HeadingAndDesc
          heading="Getting to Hospital"
          description="Explore various transportation options to reach our hospital conveniently."
        />
      </div>
      <div className="flex justify-center gap-0 md:gap-8 mt-10 flex-col md:flex-row">
        {transportationOptions.map((option, index) => (
          <ContentCard
            key={index}
            icon={option.icon}
            title={option.title}
            description={option.description}
          />
        ))}
      </div>
    </div>
  );
};

export default TransportationOptions;
