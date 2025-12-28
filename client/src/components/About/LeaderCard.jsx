import React from "react";

const LeaderCard = (props) => {
  return (
    <div className="flex flex-col px-6 py-8 bg-(--color-surface) border border-(--color-border) rounded-2xl gap-5 shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex place-content-center">
        <img
          src={props.image}
          alt="Leader Image"
          className="size-32 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col place-items-center gap-2">
        <h3 className="text-(--color-text) font-bold text-xl">{props.name}</h3>
        <p className="text-(--color-primary) text-lg font-semibold">
          {props.position}
        </p>
      </div>
      <div className="flex place-content-center">
        <p className="text-(--color-light-text) text-sm md:text-base text-center">
          {props.bio}
        </p>
      </div>
    </div>
  );
};

export default LeaderCard;
