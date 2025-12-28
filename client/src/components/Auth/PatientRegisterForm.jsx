import { useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";

const PatientRegisterForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    mobile_no: "",
    email: "",
    password: "",
    age: "",
    bloodGroup: "",
    gender: "",
    diagnoses: "",
    allergies: "",
    address: "",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) data.append(key, value);
    });
    onSubmit?.(data);
  };

  const inputClasses =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) " +
    "px-3 py-2 text-sm text-(--color-text) shadow-sm outline-none transition " +
    "focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) " +
    "placeholder:text-(--color-text-muted)";

  const textareaClasses =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) " +
    "px-3 py-2 text-sm text-(--color-text) shadow-sm outline-none transition " +
    "focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) " +
    "placeholder:text-(--color-text-muted) resize-y";

  return (
    <section className="flex justify-center bg-(--color-surface-muted) px-4 py-[15vh] md:py-[20vh]">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-(--color-surface) shadow-xl ring-1 ring-(--color-border)/60 md:grid md:grid-cols-[2fr,3fr]">
        {/* Left: intro */}
        <div className="flex flex-col justify-between gap-6 bg-linear-to-b from-(--color-primary)/10 to-(--color-surface) p-6 md:p-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-(--color-primary)">
              New Patient
            </p>
            <h2 className="text-2xl font-bold text-(--color-text) md:text-3xl">
              Create your patient profile
            </h2>
            <p className="text-sm text-(--color-text-muted) md:text-base">
              Book appointments faster, keep your medical history in one place,
              and get personalized care from our specialists.
            </p>
          </div>

          <div className="space-y-3 text-sm text-(--color-text-muted)">
            <StepBadge
              step="1"
              text="Enter your basic details and contact information."
            />
            <StepBadge
              step="2"
              text="Add key medical info like allergies and diagnoses."
            />
            <StepBadge
              step="3"
              text="Upload a profile photo to help staff recognize you."
            />
          </div>
        </div>

        {/* Right: form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-(--color-surface) p-6 md:p-8"
        >
          {/* Basic info */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Full Name" name="name" required>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="John Doe"
              />
            </FormField>

            <FormField label="Username" name="username" required>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={inputClasses}
                placeholder="john.doe"
              />
            </FormField>

            <FormField label="Mobile Number" name="mobile_no" required>
              <input
                type="tel"
                name="mobile_no"
                value={form.mobile_no}
                onChange={handleChange}
                className={inputClasses}
                placeholder="+91 98765 43210"
              />
            </FormField>

            <FormField label="Email" name="email" required>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder="john@example.com"
              />
            </FormField>

            <FormField label="Password" name="password" required>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Create a strong password"
              />
            </FormField>

            <FormField label="Age" name="age" required>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className={inputClasses}
                placeholder="32"
                min={0}
              />
            </FormField>
          </div>

          {/* Medical info */}
          <div className="grid gap-4 md:grid-cols-3">
            <FormField label="Blood Group" name="bloodGroup" required>
              <select
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </FormField>

            <FormField label="Gender" name="gender" required>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Profile Picture" name="profilePic" required>
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-(--color-text-muted)
                           file:mr-3 file:rounded-md file:border-0
                           file:bg-(--color-primary)/10 file:px-3 file:py-1.5
                           file:text-sm file:font-medium file:text-(--color-primary)
                           hover:file:bg-(--color-primary)/20 file:transition-all file:duration-200"
              />
            </FormField>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Diagnoses"
              name="diagnoses"
              helper="Comma separated: Diabetes, Hypertension"
            >
              <textarea
                name="diagnoses"
                value={form.diagnoses}
                onChange={handleChange}
                className={textareaClasses}
                rows={2}
              />
            </FormField>

            <FormField
              label="Allergies"
              name="allergies"
              helper="Comma separated: Penicillin, Nuts"
            >
              <textarea
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                className={textareaClasses}
                rows={2}
              />
            </FormField>
          </div>

          <FormField label="Address" name="address" required>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className={textareaClasses}
              rows={3}
              placeholder="Street, City, State, PIN"
            />
          </FormField>

          <div className="flex items-center justify-between gap-4 pt-2">
            <p className="text-xs text-(--color-text-muted) md:text-sm">
              By creating an account you agree to our{" "}
              <span className="font-medium text-(--color-primary)">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="font-medium text-(--color-primary)">
                Terms of Care
              </span>
              .
            </p>

            <div className="min-w-[150px]">
              <BgPrimaryBtn text="Create patient profile" className="w-full" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

const FormField = ({ label, name, required, helper, children }) => (
  <label className="flex flex-col gap-1 text-sm" htmlFor={name}>
    <span className="font-medium text-(--color-text)">
      {label}
      {required && <span className="text-(--color-primary)"> *</span>}
    </span>
    {children}
    {helper && (
      <span className="text-xs text-(--color-text-muted)">{helper}</span>
    )}
  </label>
);

const StepBadge = ({ step, text }) => (
  <div className="flex items-center gap-3">
    <span className="flex size-7 items-center justify-center rounded-full bg-(--color-primary)/10 text-xs font-semibold text-(--color-primary)">
      {step}
    </span>
    <p>{text}</p>
  </div>
);

export default PatientRegisterForm;
