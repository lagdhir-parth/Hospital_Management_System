import React from "react";

const BgPrimaryBtn = (props) => {
  return (
    <button onClick={props.onClick} type={props.type} className={`flex justify-center gap-2 px-8 w-full md:w-auto py-3 bg-(--color-primary) text-white rounded-xl cursor-pointer hover:bg-(--color-primary-dark) transition-colors duration-200 ${props.className}`}>
      {props.text}
    </button>
  );
};

export default BgPrimaryBtn;
