import { Award, Heart, Shield, Target } from "lucide-react";
import ContentCard from "../ContentCard";
import HeadingAndDesc from "../HeadingAndDesc";

const CoreValues = () => {
  const coreValues = [
    {
      icon: <Heart size={35} />,
      title: "Compassionate Care",
      description:
        "We treat every patient with empathy, respect, and the highest level of care, understanding that healing goes beyond medical treatment.",
    },
    {
      icon: <Award size={35} />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from medical procedures to patient service, continuously improving our standards.",
    },
    {
      icon: <Shield size={35} />,
      title: "Safety First",
      description:
        "Patient safety is our top priority. We maintain the highest safety standards and continuously monitor our practices for improvement.",
    },
    {
      icon: <Target size={35} />,
      title: "Innovation",
      description:
        "We embrace cutting-edge medical technology and innovative treatment methods to provide the best possible outcomes for our patients.",
    },
  ];

  return (
    <section className="bg-(--color-bg) py-20 px-4 md:px-10 lg:px-20 space-y-5">
      <div className="flex justify-center items-center">
        <HeadingAndDesc
          heading="Our Core Values"
          description="These fundamental principles guide every decision we make and every interaction we have with our patients, families, and community."
        />
      </div>
      <div className="md:w-8/10 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {coreValues.map((value, index) => (
          <ContentCard
            key={index}
            icon={value.icon}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
