import HeadingAndDesc from "../HeadingAndDesc";
import StateElem from "./StatisticElem";
import { Star, Quote } from "lucide-react";

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
          <StateElem
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

const PatientStoriesCard = (props) => {
  const name = props.name.split(" ");
  return (
    <div className="bg-(--color-surface) p-8 rounded-2xl flex flex-col justify-between gap-6 shadow-lg max-w-lg mx-auto hover:shadow-xl hover:scale-101 transition-shadow duration-300">
      <div className="flex justify-between pr-4 text-(--color-primary)">
        <div className="flex text-amber-300 quote-card">
          {props.stars > 0 && props.stars <= 5
            ? Array.from({ length: props.stars }).map((_, i) => (
                <Star
                  key={i}
                  strokeWidth={3}
                  fill="oklch(87.9% 0.169 91.605)"
                />
              ))
            : null}
        </div>
        <Quote size={30} className="opacity-25" />
      </div>
      <div className="h-full">
        <p className="text-(--color-light-text)">{'"' + props.story + '"'}</p>
      </div>
      <div className="flex gap-5">
        <div className="size-12 flex justify-center items-center rounded-full bg-(--color-primary) text-white font-bold">
          {name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-lg text-(--color-text)">{props.name}</p>
          <p className="text-(--color-text-muted)">{props.patientOf}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientStories;
