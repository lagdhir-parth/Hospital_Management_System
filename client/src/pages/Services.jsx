import MainHeading from "../components/MainHeading";
import MedicalHelp from "../components/Service/MedicalHelp";
import ServiceCardSection from "../components/Service/ServiceCardSection";

const Services = () => {
  return (
    <div>
      <MainHeading
        title="Our Medical Services"
        description="Comprehensive healthcare services delivered with compassion, expertise, and cutting-edge medical technology to ensure the best possible outcomes for our patients."
      />
      <ServiceCardSection />
      <MedicalHelp />
    </div>
  );
};

export default Services;
