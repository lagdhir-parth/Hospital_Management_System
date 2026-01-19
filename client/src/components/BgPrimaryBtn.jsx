import React, { Children } from "react";

const BgPrimaryBtn = (props) => {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`flex justify-center gap-2 px-8 w-full md:w-auto py-3 ${
        props.disabled ? "opacity-50 cursor-not-allowed" : ""
      } bg-(--color-primary) text-white rounded-xl ${
        !props.disabled ? "cursor-pointer" : ""
      } hover:bg-(--color-primary-dark) transition-colors duration-200 ${
        props.className
      }`}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </button>
  );
};

export default BgPrimaryBtn;
