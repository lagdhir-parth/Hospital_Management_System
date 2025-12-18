import {
  Brain,
  CircleCheckBig,
  Clock,
  Heart,
  Stethoscope,
  Scissors,
  Shield,
  ArrowRight,
} from "lucide-react";
import BgPrimaryBtn from "../BgPrimaryBtn";

const ServiceCardSection = () => {
  const services = [
    {
      icon: <Heart />,
      img: "https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwbW9kZXJuJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzU5MTY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Emergency Care",
      description:
        "Comprehensive primary care services for all age groups, focusing on preventive care, diagnosis, and treatment of common illnesses and chronic conditions.",
      therapies: [
        "24/7 Emergency Room",
        "Trauma Center Level II",
        "Critical Care Unit",
        "Emergency Surgery",
        "Rapid Response Team",
      ],
    },
    {
      icon: <Stethoscope />,
      img: "https://images.unsplash.com/photo-1758691462123-8a17ae95d203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9uJTIwbWVkaWNhbCUyMGNhcmV8ZW58MXx8fHwxNzU5MTMxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "General Medicine",
      description:
        "Comprehensive primary care services with our team of qualified physicians for all your healthcare needs.",
      therapies: [
        "Annual Health Checkups",
        "Chronic Disease Management",
        "Preventive Care",
        "Health Screenings",
        "Vaccination Services",
      ],
    },
    {
      icon: <Scissors />,
      img: "https://images.unsplash.com/photo-1684752397429-4ce4d7856cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnRob3BlZGljJTIwc3VyZ2VyeSUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5MTY4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Surgical Services",
      description:
        "Advanced surgical procedures with minimally invasive techniques and experienced surgical teams.",
      therapies: [
        "Minimally Invasive Surgery",
        "Robotic Surgery",
        "Outpatient Surgery",
        "Advanced Anesthesia",
        "Post-Surgical Care",
      ],
    },
    {
      icon: <Brain />,
      img: "https://images.unsplash.com/photo-1758691463165-ca9b5bc2b28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb2xvZ3klMjBicmFpbiUyMG1lZGljYWwlMjBzY2FufGVufDF8fHx8MTc1OTE2ODkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Diagnostic Imaging",
      description:
        "State-of-the-art imaging technology for accurate diagnosis and treatment planning.",
      therapies: [
        "MRI & CT Scans",
        "X-Ray Services",
        "Ultrasound",
        "Nuclear Medicine",
        "Interventional Radiology",
      ],
    },
    {
      icon: <Shield />,
      img: "https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwbW9kZXJuJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzU5MTY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Preventive Care",
      description:
        "Comprehensive wellness programs and preventive services to maintain optimal health.",
      therapies: [
        "Health Screenings",
        "Wellness Programs",
        "Nutrition Counseling",
        "Fitness Assessments",
        "Mental Health Support",
      ],
    },
    {
      icon: <Clock />,
      img: "https://images.unsplash.com/photo-1676313027775-a5a3dca6f98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBjaGlsZHJlbiUyMGhvc3BpdGFsJTIwY2FyZXxlbnwxfHx8fDE3NTkxNjg5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Rehabilitation Services",
      description:
        "Comprehensive rehabilitation programs to help patients recover and regain function.",
      therapies: [
        "Physical Therapy",
        "Occupational Therapy",
        "Speech Therapy",
        "Cardiac Rehabilitation",
        "Sports Medicine",
      ],
    },
  ];
  // console.log(...services)
  return (
    <div className="flex justify-center pb-10">
      <div className="flex justify-center items-center flex-wrap gap-15 p-4">
        {services.map((service, index) => (
          <div key={index}>
            <ServiceCard {...service} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ServiceCard = (props) => {
  return (
    <div className="group md:h-100 flex flex-col shrink-0 md:flex-row gap-4 md:gap-0 overflow-hidden max-w-130 border border-(--color-border) rounded-2xl  hover:shadow-lg transition-shadow duration-300">
      <div className="h-45 md:h-full md:w-4/10 relative overflow-hidden">
        <img
          src={props.img}
          alt={props.title}
          className="size-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-0 left-0 size-full p-4 bg-linear-to-r from-(--color-primary)/70 to-transparent">
          <div className="size-12 bg-(--color-surface) rounded-full flex justify-center items-center text-(--color-primary)">
            {props.icon}
          </div>
        </div>
      </div>
      <div className="md:w-6/10  flex flex-col justify-between gap-3 md:gap-0 p-4 pt-0 md:py-4">
        <p className="font-semibold text-2xl md:text-2xl">{props.title}</p>
        <p className="md:text-md text-(--color-text-muted)">
          {props.description}
        </p>
        <div className="flex flex-col gap-2 my-2">
          {props.therapies.map((therapy, index) => (
            <div key={index} className="flex items-start md:items-center gap-3">
              <span>
                <CircleCheckBig size={16} color="#019a67" />
              </span>
              <p className="text-sm text-(--color-text-muted)">{therapy}</p>
            </div>
          ))}
        </div>
        <div className="self-start mb-1">
          <BgPrimaryBtn
            text={
              <>
                <p>Learn more</p> <ArrowRight />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSection;
