import React from "react";

const HeroServiceIntroCard = (props) => {
  return (
    <div className="group flex flex-col items-center p-10 px-8 bg-(--color-surface) rounded-2xl gap-4 mb-8 border border-(--color-border) hover:bg-(--color-primary-light) hover:shadow-lg hover:border-transparent transition-all duration-200 transform hover:-translate-y-2">
      <div className="size-16 rounded-full bg-(--color-primary-light) text-(--color-primary) flex justify-center items-center group-hover:bg-(--color-primary) group-hover:text-(--color-surface) transition-colors duration-200">
        {props.icon}
      </div>
      <p className="font-semibold text-lg mt-4 text-center">{props.title}</p>
      <p className="text-center text-(--color-text-muted)">
        {props.description}
      </p>
    </div>
  );
};

export default HeroServiceIntroCard;
