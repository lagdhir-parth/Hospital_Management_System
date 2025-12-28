import { Globe, TrendingUp, Users } from "lucide-react";
import InfoWithBulletsSection from "../InfoWithBulletsSection";

const MissionAndVisionSection = () => {
  const missions = [
    "Patient-centered care approach",
    "Continuous medical education and training",
    "Community health and wellness programs",
  ];

  const visions = [
    {
      icon: <Globe size={20} color="#2563eb" />,
      text: "Regional healthcare leadership",
    },
    {
      icon: <TrendingUp size={20} color="#2563eb" />,
      text: "Continuous improvement and innovation",
    },
    {
      icon: <Users size={20} color="#2563eb" />,
      text: "Community partnership and engagement",
    },
  ];

  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-20 px-4 md:px-10 lg:px-30 pb-20 rounded-lg">
      <InfoWithBulletsSection
        title="Our Mission"
        description="To provide exceptional, compassionate healthcare services to our community while advancing medical knowledge through innovation, education, and research. We are committed to treating every patient with dignity, respect, and the highest quality of care."
        bullets={missions}
        classes="lg:w-5/10 w-98/100"
      />
      <InfoWithBulletsSection
        title="Our Vision"
        description="To be the leading healthcare provider in the region, recognized for clinical excellence, innovative treatments, and exceptional patient experiences. We envision a healthier community where every individual has access to world-class medical care."
        bullets={visions}
        classes="lg:w-5/10 w-98/100"
      />
    </section>
  );
};

export default MissionAndVisionSection;
