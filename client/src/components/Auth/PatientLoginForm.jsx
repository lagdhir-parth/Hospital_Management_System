import { useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import { Link } from "react-router-dom";

const PatientLoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // send simple JSON body: { username, password }
    onSubmit?.({
      username: form.username.trim(),
      password: form.password,
    });
  };

  const inputClasses =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) " +
    "px-3 py-2 text-sm text-(--color-text) shadow-sm outline-none transition " +
    "focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) " +
    "placeholder:text-(--color-text-muted)";

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-(--color-surface-muted) px-4 py-[15vh] md:py-[20vh]">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-(--color-surface) shadow-xl ring-1 ring-(--color-border)/60">
        {/* Header */}
        <div className="border-b border-(--color-border)/70 bg-linear-to-r from-(--color-primary)/10 to-transparent px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary)">
            Patient Portal
          </p>
          <h1 className="mt-1 text-2xl font-bold text-(--color-text)">
            Sign in to continue
          </h1>
          <p className="mt-1 text-sm text-(--color-text-muted)">
            Access your appointments, records and personalized care dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 md:px-7">
          <div className="space-y-4">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Username <span className="text-(--color-primary)">*</span>
              </span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter your username"
                autoComplete="username"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Password <span className="text-(--color-primary)">*</span>
              </span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>
          </div>

          <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="size-3.5 rounded border-(--color-border) text-(--color-primary) focus:ring-(--color-primary)"
              />
              <label htmlFor="remember">Keep me signed in</label>
            </div>
            <button
              type="button"
              className="font-medium text-(--color-primary) hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="flex justify-stretch items-stretch pt-1">
            <BgPrimaryBtn text="Sign in" className="mx-auto" />
          </div>

          <p className="pt-1 text-center text-xs text-(--color-text-muted)">
            New patient?{" "}
            <span className="cursor-pointer font-medium text-(--color-primary)">
              <Link to="/register">Create an account</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default PatientLoginForm;
