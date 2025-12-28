import { useNavigate } from "react-router-dom";
import ContentCard from "../ContentCard";
import HeadingAndDesc from "../HeadingAndDesc";
import { Brain, Stethoscope, Heart, Shield } from "lucide-react";

const ServicesIntro = () => {
  const services = [
    {
      icon: <Heart size={30} />,
      title: "Emergency Care",
      description:
        "24/7 emergency medical services with experienced healthcare professionals and state-of-the-art equipment.",
    },
    {
      icon: <Stethoscope size={30} />,
      title: "General Medicine",
      description:
        "Comprehensive primary care services with our team of qualified physicians for all your healthcare needs.",
    },
    {
      icon: <Brain size={30} />,
      title: "Specialized Care",
      description:
        "Advanced specialty care across multiple disciplines with cutting-edge technology and expert specialists.",
    },
    {
      icon: <Shield size={30} />,
      title: "Preventive Care",
      description:
        "Comprehensive health screenings and wellness programs designed to keep you healthy and active.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="bg-(--color-surface) flex flex-col justify-center items-center gap-10 pb-15 pt-20 md:px-20 ">
      <HeadingAndDesc
        heading="How Can We Help You Today?"
        description="Our comprehensive healthcare services are designed to meet all your medical needs with compassion, expertise, and the latest medical technology."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 w-90/100 ">
        {services.map((service, index) => (
          <ContentCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            onClick={() => navigate("/services")}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesIntro;
