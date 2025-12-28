import { useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import { ChevronDown } from "lucide-react";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";

const GetInTouchForm = () => {
  const inputClasses =
    "w-full bg-gray-100 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 transition-colors duration-200 text-sm";

  const labelClasses = "block mb-2 md:mb-4 font-bold md:font-medium";

  const [DropdownOpen, setDropdownOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "Emergency Medicine",
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: dropDownValue,
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    });
    setDropDownValue(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted!!!")
  };

  const setValue = (value) => {
    setDropDownValue(value);
    setFormData((prevData) => ({
      ...prevData,
      department: value,
    }));
  };

  return (
    <form className="row-span-3 flex flex-col gap-6 p-6 bg-white rounded-2xl border-2 border-(--color-border) h-min my-auto">
      <div>
        <h2 className="text-2xl font-extrabold md:font-bold mb-3">
          Get in Touch
        </h2>
        <p className="text-(--color-light-text) mb-2">
          Send us a message and we'll get back to you as soon as possible.
        </p>
      </div>
      <fieldset className="space-y-4 h-min">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <label htmlFor="firstName" className={labelClasses}>
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your last name"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className={labelClasses}>
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Your phone number"
          />
        </div>
        <div>
          <label htmlFor="department" className={labelClasses}>
            Department:
          </label>
          <div className="relative w-full">
            {/* Trigger */}
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className={inputClasses + " flex items-center justify-between"}
            >
              <span>{dropDownValue ?? "Select department"}</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Custom dropdown */}
            {DropdownOpen && (
              <ul className="absolute z-20 mt-1 w-full rounded-lg border border-(--color-border) bg-(--color-surface) shadow-lg p-1">
                {departments.map((dept) => (
                  <li
                    key={dept}
                    onClick={() => {
                      setValue(dept);
                      setDropdownOpen(false);
                    }}
                    className="cursor-pointer px-3 py-2 text-sm text-(--color-light-text)
                     hover:bg-gray-200 rounded-lg" // custom hover
                  >
                    {dept}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Subject of your message"
            required
          />
        </div>
        <div>
          <label htmlFor="message" className={labelClasses}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={inputClasses}
            placeholder="Type your message here..."
            required
          ></textarea>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10">
          <BgPrimaryBtn onClick={handleSubmit} type="submit" text="Send Message" />
          <BgPrimaryLightBtn onClick={handleClear} text="Clear" />{" "}
          {/* TODO: Clear Form using Value */}
        </div>
      </fieldset>
    </form>
  );
};

export default GetInTouchForm;
