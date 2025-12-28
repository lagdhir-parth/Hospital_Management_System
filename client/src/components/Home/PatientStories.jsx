import HeadingAndDesc from "../HeadingAndDesc";
import StatisticElem from "../StatisticElem";
import PatientStoriesCard from "./PatientStoriesCard";

const PatientStories = () => {
  const patientStories = [
    {
      patientName: "Prashant Bhuva",
      patientOf: "Cardiac Surgery Patient",
      story:
        "The cardiac team at Luen Hospital saved my life. The compassionate care and expert medical treatment I received exceeded all my expectations. The staff made me feel comfortable during a very scary time.",
      stars: 5,
    },
    {
      patientName: "Michael Chen",
      patientOf: "Orthopedic Surgery Patient",
      story:
        "After my knee replacement surgery, I'm back to playing tennis! The orthopedic team's expertise and the rehabilitation program helped me recover faster than I ever imagined possible.",
      stars: 5,
    },
    {
      patientName: "Lisa Rodriguez",
      patientOf: "Emergency Care Patient",
      story:
        "When I had a medical emergency, the ER team acted quickly and professionally. Their immediate response and quality care made all the difference. I'm grateful for their dedication.",
      stars: 5,
    },
  ]; // Placeholder for patient stories data

  const statistics = [
    {
      value: "98%",
      description: "Patient Satisfaction",
      textColor: "(--color-primary)",
    },
    {
      value: "25+",
      description: "Years of Excellence",
      textColor: "(--color-info)",
    },
    {
      value: "50k+",
      description: "Lives Saved",
      textColor: "(--color-primary)",
    },
    {
      value: "150+",
      description: "Expert Doctors",
      textColor: "(--color-info)",
    },
  ]; // Placeholder for statistics data

  return (
    <div className="bg-(--color-bg) py-20 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center py-4 mb-4">
        <HeadingAndDesc
          heading="Patient Stories"
          description="Hear from our patients about their experiences and how our dedicated medical team helped them on their journey to better health."
        />
      </div>
      <div className="p-4 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-8/10 mb-13">
        {patientStories.map((story, index) => (
          <PatientStoriesCard
            key={index}
            story={story.story}
            name={story.patientName}
            patientOf={story.patientOf}
            stars={story.stars}
          />
        ))}
      </div>
      <hr className=" border w-8/10 text-(--color-text-muted) opacity-10 mb-13" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-auto w-9/10 md:w-8/10 gap-y-6">
        {statistics.map((stat, index) => (
          <StatisticElem
            key={index}
            textColor={stat.textColor}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientStories;
