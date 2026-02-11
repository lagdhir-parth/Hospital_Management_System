import { useEffect, useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import api from "../../api/axios";
import ErrorOrSuccessMsg from "../ErrorOrSuccessMsg";
import CustomDropdown from "../CustomDropdown";

const RequestAppointmentForm = () => {
  const [form, setForm] = useState({
    doctorId: "",
    departmentId: "",
    date: "",
    time: "",
    diseases: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    const doctorRes = await api.get(`/doctors/allDoctors`);
    setDoctors(doctorRes.data.data);

    const departmentRes = await api.get(`/departments/allDepartments`);
    setDepartments(departmentRes.data.data);

    console.log("Doctors fetched", doctorRes.data.data);
    console.log("Departments fetched", departmentRes.data.data);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log("Error occured", error);
    }
  }, []);

  useEffect(() => {
    const doctorsName = doctors.map((doc) => doc.name);
    console.log("Doctors names:", doctorsName);
  }, [doctors]);

  useEffect(() => {
    const departmentsName = departments.map((dep) => dep.name);
    console.log("Departments names:", departmentsName);
  }, [departments]);

  const isFormDataValid = () => {
    const requiredFields = [
      { key: "doctorId", label: "Doctor" },
      { key: "departmentId", label: "Department" },
      { key: "date", label: "Date" },
      { key: "time", label: "Time" },
      { key: "diseases", label: "Diseases", trim: true },
      { key: "reason", label: "Reason", trim: true },
    ];
    for (const { key, label, trim = false } of requiredFields) {
      const value = form[key];
      const checkValue = trim ? value?.trim() : value;

      if (!checkValue) {
        setErrorMessage(`${label} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        data.append(key, value);
      }
    });

    const requestAppointment = async () => {
      try {
        const res = await api.post(`/appointments/requestAppointment`, data);
        await api.post(
          `/medicalRecords/${res.data.data._id}/createMedicalRecord`,
        );
        setSuccessMessage("Appointment requested successfully!");
        setForm({
          doctorId: "",
          departmentId: "",
          date: "",
          time: "",
          diseases: "",
          reason: "",
        });
      } catch (error) {
        console.error("Error requesting appointment:", error);
        setErrorMessage(
          error.response?.data?.message || "Failed to request appointment.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (isFormDataValid()) {
      await requestAppointment();
    } else {
      setLoading(false);
      return;
    }
  };

  const input =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) " +
    "px-3 py-2 text-sm text-(--color-text) shadow-sm outline-none transition " +
    "focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) " +
    "placeholder:text-(--color-text-muted)";

  const textarea =
    "w-full rounded-lg border border-(--color-border) bg-(--color-surface) " +
    "px-3 py-2 text-sm text-(--color-text) shadow-sm outline-none transition " +
    "focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) " +
    "placeholder:text-(--color-text-muted) resize-y";

  console.log(form.doctorId);
  return (
    <section className="flex justify-center bg-(--color-surface-muted) px-4 py-[15vh] md:[20vh]">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-(--color-surface) shadow-xl ring-1 ring-(--color-border)/60 md:grid md:grid-cols-[3fr,2fr]">
        {/* Left: form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 md:p-8 bg-(--color-surface)"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-(--color-primary)">
              Request Appointment
            </p>
            <h2 className="mt-1 text-2xl font-bold text-(--color-text)">
              Book your consultation
            </h2>
            <p className="mt-1 text-sm text-(--color-text-muted)">
              Choose your doctor, department, date and tell us briefly about
              your condition so our team can prepare for your visit.
            </p>
          </div>

          {/* Doctor & department */}
          <div className="grid gap-4 md:grid-cols-2">
            <CustomDropdown
              name="doctorId"
              label="Doctor"
              options={doctors}
              value={form.doctorId}
              placeholder="Choose doctor"
              searchable
              setForm={setForm}
            />

            <CustomDropdown
              name="departmentId"
              label="Department"
              options={departments}
              value={form.departmentId}
              placeholder="Choose department"
              searchable
              setForm={setForm}
            />
          </div>

          {/* Date & time */}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Preferred date <span className="text-(--color-primary)">*</span>
              </span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={input}
                min={new Date().toISOString().split("T")[0]}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Preferred time <span className="text-(--color-primary)">*</span>
              </span>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className={input}
              />
            </label>
          </div>

          {/* Diseases & reason */}
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-(--color-text)">
              Existing diseases / conditions{" "}
              <span className="text-(--color-primary)">*</span>
            </span>
            <textarea
              name="diseases"
              value={form.diseases}
              onChange={handleChange}
              className={textarea}
              rows={2}
              placeholder="E.g. Diabetes, hypertension, previous surgery..."
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-(--color-text)">
              Reason for visit <span className="text-(--color-primary)">*</span>
            </span>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className={textarea}
              rows={3}
              placeholder="Briefly describe your symptoms and concerns."
            />
          </label>

          <ErrorOrSuccessMsg
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-(--color-text-muted)">
              Your request will be reviewed by our team. You will receive a
              confirmation once the appointment is scheduled.
            </p>
            <div className="min-w-40">
              {loading ? (
                <BgPrimaryBtn
                  text="Requesting..."
                  className="w-full justify-center"
                  disabled
                />
              ) : (
                <BgPrimaryBtn
                  text="Request appointment"
                  className="w-full justify-center"
                />
              )}
            </div>
          </div>
        </form>

        {/* Right: info / reassurance panel */}
        <aside className="flex flex-col justify-between gap-6 bg-linear-to-b from-(--color-primary)/12 to-(--color-surface) p-6 md:p-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-(--color-text)">
              What happens next?
            </h3>
            <ul className="space-y-2 text-sm text-(--color-text-muted)">
              <li>
                • Our team checks doctor availability for your selected slot.
              </li>
              <li>• You receive confirmation or alternate time suggestions.</li>
              <li>• Appointment appears in your patient dashboard.</li>
            </ul>
          </div>

          <div className="space-y-3 text-sm text-(--color-text-muted)">
            <h4 className="text-sm font-semibold text-(--color-text)">
              Need urgent medical help?
            </h4>
            <p>
              For emergencies, please contact our 24/7 emergency department
              instead of using the online appointment form.
            </p>
            <p className="font-semibold text-(--color-primary)">
              Emergency Line: +91-108 / +91-112
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default RequestAppointmentForm;
