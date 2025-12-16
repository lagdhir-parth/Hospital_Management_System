import React from "react";

const BgPrimaryLightBtn = (props) => {
  return (
    <button className="bg-(--color-surface) flex items-center justify-center px-8 w-full md:w-auto py-3 border border-(--color-primary) text-(--color-primary) rounded-xl cursor-pointer hover:bg-(--color-primary-light) hover:text-(--color-text) transition-colors duration-200">
      {props.text}
    </button>
  );
};

export default BgPrimaryLightBtn;
