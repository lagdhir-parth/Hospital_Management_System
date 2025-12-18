import React from "react";

const HeadingAndDesc = ({
  heading,
  description,
  textColor = "(--color-text-muted)",
}) => {
  return (
    <div className="flex flex-col md:w-50/100 mb-10">
      <h2 className="font-bold text-4xl text-center mb-6">{heading}</h2>
      <p className={`text-lg text-center text-${textColor}`}>{description}</p>
    </div>
  );
};

export default HeadingAndDesc;
