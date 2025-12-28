import { useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";

const RequestAppointmentForm = ({
  doctors = [],
  departments = [],
  onSubmit,
}) => {
  const [form, setForm] = useState({
    doctorId: "",
    departmentId: "",
    date: "",
    time: "",
    diseases: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.({
      doctorId: form.doctorId,
      departmentId: form.departmentId,
      date: form.date,       // yyyy‑mm‑dd for your controller
      time: form.time,       // HH:mm
      diseases: form.diseases.trim(),
      reason: form.reason.trim(),
    });
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
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Select doctor <span className="text-(--color-primary)">*</span>
              </span>
              <select
                name="doctorId"
                value={form.doctorId}
                onChange={handleChange}
                className={input}
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name} &middot; {doc.specialization}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Department <span className="text-(--color-primary)">*</span>
              </span>
              <select
                name="departmentId"
                value={form.departmentId}
                onChange={handleChange}
                className={input}
              >
                <option value="">Choose a department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Date & time */}
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-(--color-text)">
                Preferred date{" "}
                <span className="text-(--color-primary)">*</span>
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
                Preferred time{" "}
                <span className="text-(--color-primary)">*</span>
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
              Reason for visit{" "}
              <span className="text-(--color-primary)">*</span>
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

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-(--color-text-muted)">
              Your request will be reviewed by our team. You will receive a
              confirmation once the appointment is scheduled.
            </p>
            <div className="min-w-40">
              <BgPrimaryBtn
                text="Request appointment"
                className="w-full justify-center"
              />
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
              <li>• Our team checks doctor availability for your selected slot.</li>
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
