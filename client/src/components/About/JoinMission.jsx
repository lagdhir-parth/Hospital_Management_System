import React from "react";
import HeadingAndDesc from "../HeadingAndDesc";

const JoinMission = () => {
  return (
    <section className="py-10 px-4 bg-(--color-info)">
      <div className="text-(--color-surface) flex place-content-center">
        <HeadingAndDesc
          heading="Join Our Mission"
          description="Whether you're seeking care or looking to be part of our healthcare team, we welcome you to the Luen Hospital family."
          textColor="(--color-surface)"
        />
      </div>
      <div className="flex flex-col md:flex-row place-content-center gap-8">
        <button className="bg-(--color-surface) flex items-center justify-center px-8 w-full md:w-auto py-3 border border-(--color-primary) text-(--color-info) rounded-xl cursor-pointer transition-colors duration-200">
          Explore Careers
        </button>
        <button className="bg-(--color-surface) flex items-center justify-center px-8 w-full md:w-auto py-3 border border-(--color-primary) text-(--color-info) rounded-xl cursor-pointer transition-colors duration-200">
          Schedule a Visit
        </button>
      </div>
    </section>
  );
};

export default JoinMission;
