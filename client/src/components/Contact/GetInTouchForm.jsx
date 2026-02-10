import { useState } from "react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import { ChevronDown } from "lucide-react";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import CustomDropdown from "../CustomDropdown";
import api from "../../api/axios.js";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useEffect } from "react";
import ErrorOrSuccessMsg from "../ErrorOrSuccessMsg.jsx";

const GetInTouchForm = () => {
  const inputClasses =
    "w-full bg-gray-100 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-gray-400 transition-colors duration-200 text-sm";

  const labelClasses = "block mb-2 md:mb-4 font-bold md:font-medium";

  const { user, isAuthenticated, refreshUser } = useAuth();

  const [dropDownValue, setDropDownValue] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.mobile_no || "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    refreshUser(); // To get latest user data
    setFormData({
      firstName: user?.name || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.mobile_no || "",
      subject: "",
      message: "",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      firstName: user?.name || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.mobile_no || "",
      subject: "",
      message: "",
    });
    setDropDownValue(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isAuthenticated) {
      setErrorMessage("Please login to send a message.");
      setLoading(false);
      return;
    }

    if (Object.keys(formData).some((key) => !formData[key])) {
      setErrorMessage("Please fill all the required fields.");
      setLoading(false);
      return;
    }

    // Build HTML email body
    const htmlMsg = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">New HMS Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Full Name:</strong></td><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${formData.firstName} ${formData.lastName}</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Email:</strong></td><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${formData.email}</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Mobile:</strong></td><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${formData.phoneNumber}</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Subject:</strong></td><td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;">${formData.subject}</td></tr>
      </table>
      <div style="background: #f8fafc; padding: 20px; border-left: 4px solid #1e40af; margin-top: 20px;">
        <strong>Message:</strong><br>${formData.message}
      </div>
      <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
        Submitted via HMS Contact Form | ${new Date().toLocaleString()}
      </p>
    </div>
  `;

    try {
      await api.post(
        "/send-email",
        {
          // to: formData.email,
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          subject: `HMS Contact Form: ${formData.subject}`,
          msg: htmlMsg,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // If protected
        },
      );

      setSuccessMessage("Message sent to HMS team! We'll reply soon.");
      handleClear();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to send message",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className=" flex flex-col gap-6 p-6 bg-white rounded-2xl border-2 border-(--color-border) h-min my-auto"
      onSubmit={handleSubmit}
    >
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
              First Name: <span className="text-(--color-primary)">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClasses}>
              Last Name: <span className="text-(--color-primary)">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClasses}
              placeholder="Your last name"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email: <span className="text-(--color-primary)">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Your email address"
            // readOnly={isAuthenticated}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" className={labelClasses}>
            Phone Number: <span className="text-(--color-primary)">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Your phone number"
            readOnly={isAuthenticated}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject: <span className="text-(--color-primary)">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Subject of your message"
          />
        </div>
        <div>
          <label htmlFor="message" className={labelClasses}>
            Message: <span className="text-(--color-primary)">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className={inputClasses}
            placeholder="Type your message here..."
          ></textarea>
        </div>
        <ErrorOrSuccessMsg
          successMessage={successMessage}
          errorMessage={errorMessage}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
        />
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-10">
          <BgPrimaryBtn
            type="submit"
            text={loading ? "Sending..." : "Send Message"}
            disabled={loading}
          />
          <BgPrimaryLightBtn onClick={handleClear} text="Clear" />{" "}
        </div>
      </fieldset>
    </form>
  );
};

export default GetInTouchForm;
