import React, { useState } from "react";
import ErrorOrSuccessMsg from "../../ErrorOrSuccessMsg";
import { SquarePen } from "lucide-react";

const EditProfileCard = (props) => {
  return (
    <div className="border border-(--color-border) w-full p-6 rounded-2xl bg-(--color-surface) shadow-lg flex flex-col gap-6">
      <h2 className="text-2xl text-(--color-text) font-bold">
        {props.heading}
      </h2>
      <hr className="border-gray-300" />
      <form onSubmit={props.handleSubmit} className="flex flex-col">
        {props.formFields.map((field) => (
          <FormField
            key={field.id}
            label={field.label}
            type={field.type}
            id={field.id}
            name={field.name}
            value={props.values ? props.values[field.name] : ""}
            onChange={props.onChange}
          />
        ))}

        <ErrorOrSuccessMsg
          successMessage={props.successMessage}
          errorMessage={props.errorMessage}
          setSuccessMessage={props.setSuccessMessage}
          setErrorMessage={props.setErrorMessage}
        />

        {!props.loading ? (
          <button
            type="submit"
            className={`self-end ${
              props.successMessage || props.errorMessage ? "mt-4" : ""
            } flex justify-center items-center px-4 py-2 bg-(--color-primary) text-(--color-light-primary-bg) rounded-md hover:bg-(--color-primary-dark) transition-colors duration-200`}
            disabled={props.loading}
          >
            <SquarePen className="inline mr-2 shrink-0" /> Save Changes
          </button>
        ) : (
          <button
            type="submit"
            className={`self-end ${
              props.successMessage || props.errorMessage ? "mt-4" : ""
            } px-4 py-2 bg-(--color-primary) text-(--color-light-primary-bg) rounded-md hover:bg-(--color-primary-dark) transition-colors duration-200 opacity-50 cursor-not-allowed`}
          >
            Saving...
          </button>
        )}
      </form>
    </div>
  );
};

const FormField = ({ label, type, id, name, value, onChange }) => (
  <div className="flex flex-col mb-4">
    <label htmlFor={id} className="mb-2 font-semibold text-(--color-text)">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border border-(--color-border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary-light)"
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="px-2 py-1 border border-(--color-border) rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-primary-light)"
      />
    )}
  </div>
);

export default EditProfileCard;
