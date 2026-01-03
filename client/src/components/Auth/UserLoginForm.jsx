import { useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import ErrorOrSuccessMsg from "../ErrorOrSuccessMsg";
import { useAuth } from "../../contexts/AuthContext";
import CustomDropdown from "../CustomDropdown";

const UserLoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "",
  });

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const roles = ["Patient", "Doctor", "Admin"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isFormDataValid = () => {
    const requiredFields = [
      { key: "username", label: "Username" },
      { key: "password", label: "Password" },
      { key: "role", label: "Role" },
    ];
    for (const { key, label } of requiredFields) {
      const value = form[key];

      if (!value) {
        setErrorMessage(`${label} is required.`);
        return false;
      }
    }
    return true;
  };

  const loginUser = async () => {
    try {
      const res = await api.post(`/auth/login`, form);
      console.log("Login successful: ", res.data.data.loggedInUserData);
      setSuccessMessage("Login successful!");
      const tokensData = {
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      };

      login(tokensData, keepSignedIn); // Pass rememberMe flag

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("Error occured in login: ", error.response?.data?.message);
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isFormDataValid()) {
      await loginUser();
    } else {
      setLoading(false);
      return;
    }
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
          <ErrorOrSuccessMsg
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

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

            <div className="flex flex-col gap-1 text-sm">
              <CustomDropdown
                setForm={setForm}
                value={form.role}
                placeholder="Select role"
                options={roles}
                name="role"
                label="Role"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-(--color-text-muted)">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={keepSignedIn}
                onChange={() => setKeepSignedIn(!keepSignedIn)}
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
            {loading ? (
              <BgPrimaryBtn text="Signing in..." className="mx-auto" disabled />
            ) : (
              <BgPrimaryBtn text="Sign in" className="mx-auto" />
            )}
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

export default UserLoginForm;
