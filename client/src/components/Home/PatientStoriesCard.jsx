import { Star, Quote } from "lucide-react";

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

export default PatientStoriesCard
