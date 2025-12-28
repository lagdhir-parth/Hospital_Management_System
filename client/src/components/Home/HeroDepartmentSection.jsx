import { Link } from "react-router-dom";
import BgPrimaryBtn from "../BgPrimaryBtn";
import DepartmentCard from "../DepartmentCard";
import HeadingAndDesc from "../HeadingAndDesc";

const HeroDepartmentSection = () => {
  const departments = [
    {
      img: "https://images.unsplash.com/photo-1543121955-8dfb9e9e255f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaW9sb2d5JTIwaGVhcnQlMjBtZWRpY2FsJTIwZGVwYXJ0bWVudHxlbnwxfHx8fDE3NTkxNjg5MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Cardiology",
      description:
        "Advanced heart and cardiovascular care with state-of-the-art diagnostic and treatment facilities.",
      therapies: [
        "Cardiac Surgery",
        "Interventional Cardiology",
        "Heart Rhythm Management",
      ],
    },
    {
      img: "https://images.unsplash.com/photo-1758691463165-ca9b5bc2b28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb2xvZ3klMjBicmFpbiUyMG1lZGljYWwlMjBzY2FufGVufDF8fHx8MTc1OTE2ODkyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Neurology",
      description:
        "Comprehensive neurological care for brain, spine, and nervous system disorders with expert specialists.",
      therapies: ["Brain Surgery", "Stroke Care", "Epilepsy Treatment"],
    },
    {
      img: "https://images.unsplash.com/photo-1684752397429-4ce4d7856cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnRob3BlZGljJTIwc3VyZ2VyeSUyMG1lZGljYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzU5MTY4OTI4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Orthopedics",
      description:
        "Complete bone, joint, and musculoskeletal care with minimally invasive surgical techniques.",
      therapies: ["Joint Replacement", "Sports Medicine", "Trauma Surgery"],
    },
    {
      img: "https://images.unsplash.com/photo-1676313027775-a5a3dca6f98b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWRpYXRyaWMlMjBjaGlsZHJlbiUyMGhvc3BpdGFsJTIwY2FyZXxlbnwxfHx8fDE3NTkxNjg5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Pediatrics",
      description:
        "Specialized healthcare for infants, children, and adolescents with child-friendly environment.",
      therapies: ["Neonatal Care", "Child Development", "Pediatric Surgery"],
    },
    {
      img: "https://images.unsplash.com/photo-1758691461888-b74515208d7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwbW9kZXJuJTIwaG9zcGl0YWx8ZW58MXx8fHwxNzU5MTY3OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Emergency Medicine",
      description:
        "24/7 emergency care with rapid response team and advanced life support capabilities.",
      therapies: ["Trauma Care", "Critical Care", "Emergency Surgery"],
    },
    {
      img: "https://images.unsplash.com/photo-1758691462123-8a17ae95d203?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY29uc3VsdGF0aW9uJTIwbWVkaWNhbCUyMGNhcmV8ZW58MXx8fHwxNzU5MTMxNjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      name: "Women's Health",
      description:
        "Comprehensive women's healthcare including obstetrics, gynecology, and reproductive health.",
      therapies: ["Maternity Care", "Gynecology", "Fertility Services"],
    },
  ];
  return (
    <div>
      <div className="flex mb-10 pt-20 pb-10 px-4 justify-center items-center">
        <HeadingAndDesc
          heading="Our Specialized Departments"
          description="Comprehensive medical care across multiple specialties with world-class facilities and expert physicians dedicated to your health and wellbeing."
        />
      </div>
      <div className="flex flex-col flex-wrap items-center gap-10 p-4 md:flex-row md:justify-center md:px-[4vw]">
        {departments.map((dept, index) => (
          <DepartmentCard
            key={index}
            img={dept.img}
            name={dept.name}
            description={dept.description}
            therapies={dept.therapies}
          />
        ))}
      </div>
      <div className="flex justify-center items-center p-4 my-4">
        <Link to="/departments">
          <BgPrimaryBtn text="View All Departments" />
        </Link>
      </div>
    </div>
  );
};

export default HeroDepartmentSection;
