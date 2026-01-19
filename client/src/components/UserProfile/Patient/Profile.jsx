import { ChevronDown, Trash2, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../api/axios";

const Profile = () => {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();

  const [otherDetails, setOtherDetails] = useState([]);
  const [isDetailsCollapsed, setIsDetailsCollapsed] = useState(true);
  const [loading, setLoading] = useState(false);

  // Populate other details from user data
  useEffect(() => {
    if (!user) return;
    refreshUser();
    const otherDetails = [
      { label: "Mobile No", value: user?.mobile_no ?? "N/A" },
      { label: "Age", value: user?.age ?? "N/A" },
      { label: "Blood Group", value: user?.bloodGroup ?? "N/A" },
      { label: "Gender", value: user?.gender ?? "N/A" },
      {
        label: "Diagnoses",
        value: (user?.diagnoses ?? []).length
          ? (user.diagnoses || []).join(", ")
          : "N/A",
      },
      {
        label: "Allergies",
        value: (user?.allergies ?? []).length
          ? (user.allergies || []).join(", ")
          : "N/A",
      },
      { label: "Address", value: user?.address ?? "N/A" },
    ];
    setOtherDetails(otherDetails);
  }, [user, refreshUser]);

  if (!user) {
    return (
      <section className="flex justify-center items-center min-h-[400px] w-full">
        <div className="p-8 bg-(--color-surface) rounded-2xl shadow-lg text-(--color-text-muted)">
          Loading profile...
        </div>
      </section>
    );
  }

  const handleDeleteProfile = async () => {
    const confirmed = confirm(
      "Are you sure you want to permanently delete your profile?",
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await api.delete(`/patients/deleteProfile`);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Profile deletion failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-8 lg:p-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center lg:items-start">
          {/* Profile Image */}
          <div className="shrink-0">
            <div className="size-32 lg:size-40 rounded-full overflow-hidden border-4 border-(--color-primary) shadow-2xl ring-4 ring-(--color-surface)/50">
              <img
                src={
                  user?.profilePic ??
                  "https://res.cloudinary.com/dflzijhj0/image/upload/v1768822404/userProfilePicPlaceholder_h3etah.jpg"
                }
                alt="Profile Picture"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full space-y-4 text-center lg:text-left">
            {/* Name & Username */}
            <div className="space-y-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-(--color-text) leading-tight">
                {user?.name}
              </h1>
              <p className="text-xl text-(--color-primary) font-semibold">
                @{user?.username}
              </p>
            </div>

            {/* Email & Description */}
            <div className="space-y-2 text-lg">
              <p className="text-(--color-text)">{user?.email}</p>
              {user?.description && (
                <p className="text-(--color-text-muted) text-sm italic bg-(--color-light-primary-bg)/50 p-3 rounded-xl">
                  "{user.description}"
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-4">
              <Link
                to="/profile/patient/edit-patient-profile"
                className="flex-1 sm:flex-none flex justify-center sm:justify-start items-center px-6 py-3 bg-(--color-primary) text-(--color-light-primary-bg) font-medium rounded-xl hover:bg-(--color-primary-dark) shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <UserPen className="mr-2 h-5 w-5 shrink-0" />
                Edit Profile
              </Link>
              <button
                onClick={handleDeleteProfile}
                disabled={loading}
                className="flex-1 sm:flex-none flex justify-center sm:justify-start items-center px-6 py-3 bg-red-500/90 hover:bg-red-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin mr-2 h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        pathLength="1"
                        className="opacity-25"
                      />
                      <path
                        fill="none"
                        opacity="0.75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-5 w-5 shrink-0" />
                    Delete Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Details Section */}
        <div className="mt-10">
          <div className="border border-(--color-border) rounded-2xl bg-(--color-surface) shadow-lg p-8">
            {/* Toggle Header */}
            <div
              className="flex items-center justify-between cursor-pointer group"
              onClick={() => setIsDetailsCollapsed(!isDetailsCollapsed)}
            >
              <h2 className="text-2xl font-bold text-(--color-text)">
                Additional Information
              </h2>
              <ChevronDown
                size={28}
                className={`transition-transform duration-300 ${
                  isDetailsCollapsed ? "" : "rotate-180"
                } text-(--color-text-muted) group-hover:text-(--color-primary)`}
              />
            </div>

            {/* Details Grid */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out mt-6 ${
                isDetailsCollapsed
                  ? "max-h-0 opacity-0"
                  : "min-h-96 opacity-100"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-(--color-border)">
                {otherDetails.map((detail, index) => (
                  <div
                    key={index}
                    className="group hover:bg-(--color-light-primary-bg)/30 p-4 rounded-xl transition-all duration-200"
                  >
                    <dt className="text-sm font-semibold text-(--color-text-muted) mb-1 flex items-center gap-2">
                      {detail.label}
                    </dt>
                    <dd className="text-lg font-medium text-(--color-text) group-hover:text-(--color-primary)">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
