import React, { useEffect, useRef, useState } from "react";
import EditProfileCard from "./EditProfileCard";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../api/axios";
import ErrorOrSuccessMsg from "../../ErrorOrSuccessMsg";
import { SquarePen, ImagePlus } from "lucide-react";
import BgPrimaryBtn from "../../BgPrimaryBtn";
import BgPrimaryLightBtn from "../../BgPrimaryLightBtn";

const EditProfile = () => {
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    // Refresh user once on component mount to get latest data
    refreshUser();
  }, [refreshUser]);

  const [profileSuccessMessage, setProfileSuccessMessage] = useState("");
  const [profileErrorMessage, setProfileErrorMessage] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [medicalSuccessMessage, setMedicalSuccessMessage] = useState("");
  const [medicalErrorMessage, setMedicalErrorMessage] = useState("");
  const [medicalLoading, setMedicalLoading] = useState(false);
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profilePicSuccessMessage, setProfilePicSuccessMessage] = useState("");
  const [profilePicErrorMessage, setProfilePicErrorMessage] = useState("");
  const [profilePicLoading, setProfilePicLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "",
    username: "",
    mobile_no: "",
    email: "",
    address: "",
    description: "",
  });

  const [medicalInfo, setMedicalInfo] = useState({
    diagnoses: "",
    allergies: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [profilePicImg, setProfilePicImg] = useState(null);
  const [profilePicPreviewUrl, setProfilePicPreviewUrl] = useState(null);

  const imageUploadRef = useRef(null);

  const handleDivClick = () => {
    imageUploadRef.current.click();
  };

  const initialPopulateRef = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (initialPopulateRef.current) return; // don't overwrite if user already edited fields

    setProfileData({
      name: user?.name || "",
      username: user?.username || "",
      mobile_no: user?.mobile_no || "",
      email: user?.email || "",
      address: user?.address || "",
      description: user?.description || "",
    });
    setMedicalInfo({
      diagnoses: (user?.diagnoses || []).join(", "),
      allergies: (user?.allergies || []).join(", "),
    });
    initialPopulateRef.current = true;
  }, [user]);

  useEffect(() => {
    setProfilePicImg(user?.profilePic || null);
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMedicalInfoChange = (e) => {
    const { name, value } = e.target;
    setMedicalInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleProfilePicChange = (e) => {
    const { files } = e.target;
    if (files) {
      setProfilePicImg(files[0]);
    }
  };

  useEffect(() => {
    // derive a preview URL for the current profilePicImg
    if (!profilePicImg) {
      setProfilePicPreviewUrl(null);
      return;
    }

    if (typeof profilePicImg === "string") {
      setProfilePicPreviewUrl(profilePicImg);
      return;
    }

    const objectUrl = URL.createObjectURL(profilePicImg);
    setProfilePicPreviewUrl(objectUrl);

    console.log(profilePicPreviewUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [profilePicImg]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);

    try {
      await api.patch(`/patients/updateProfile`, profileData);
      setProfileSuccessMessage("Profile updated successfully!");
    } catch (err) {
      console.log(err.response?.data?.message);
      setProfileErrorMessage(
        err.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setProfileLoading(false);
    }
  };

  const handleMedicalInfoSubmit = async (e) => {
    e.preventDefault();
    setMedicalLoading(true);
    try {
      await api.patch(`/patients/updateMedicalInfo`, medicalInfo);
      setMedicalSuccessMessage("Medical information updated successfully!");
    } catch (err) {
      console.log(err.response?.data?.message);
      setMedicalErrorMessage(
        err.response?.data?.message ||
          "Failed to update medical information. Please try again.",
      );
    } finally {
      setMedicalLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);

    if (
      passwords.oldPassword.length == 0 ||
      passwords.newPassword.length == 0
    ) {
      setPasswordErrorMessage(
        "Please fill out all password fields before changing your password.",
      );
      setPasswordLoading(false);
      return;
    }

    //TODO: Add more validations (also in registration) that password must contain 6 characters
    // if (passwords.oldPassword.length < 6) {
    //   setPasswordErrorMessage(
    //     "Old password must be at least 6 characters long."
    //   );
    //   setPasswordLoading(false);
    //   return;
    // }

    // if (passwords.newPassword.length < 6) {
    //   setPasswordErrorMessage(
    //     "New password must be at least 6 characters long."
    //   );
    //   setPasswordLoading(false);
    //   return;
    // }

    try {
      await api.patch(`/patients/updatePassword`, passwords);
      setPasswordSuccessMessage("Password updated successfully!");
      setPasswords({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.log(err.response?.data?.message);
      setPasswordErrorMessage(
        err.response?.data?.message ||
          "Failed to update password. Please try again.",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleProfilePicSubmit = async (e) => {
    e.preventDefault();
    setProfilePicLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePic", profilePicImg);
      await api.patch(`/patients/updateProfilePic`, formData);
      setProfilePicSuccessMessage("Profile picture updated successfully!");
      refreshUser();
    } catch (err) {
      console.log(err.response?.data?.message);
      setProfilePicErrorMessage(
        err.response?.data?.message ||
          "Failed to update profile picture. Please try again.",
      );
    } finally {
      setProfilePicLoading(false);
    }
  };

  return (
    <div className="space-y-8 w-full flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) bg-clip-text text-transparent">
          Edit Profile
        </h1>
        <p className="mt-4 text-(--color-text-muted) text-lg max-w-2xl mx-auto">
          Update your personal information, medical details, and profile picture
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-center">
        <div className="row-span-2 col-span-1 flex flex-col gap-6">
          <EditProfileCard
            heading="Edit Personal Information"
            handleSubmit={handleProfileSubmit}
            values={profileData}
            onChange={handleProfileChange}
            formFields={[
              { label: "Name", type: "text", id: "name", name: "name" },
              {
                label: "Username",
                type: "text",
                id: "username",
                name: "username",
              },
              {
                label: "Mobile Number",
                type: "text",
                id: "mobile_no",
                name: "mobile_no",
              },
              { label: "Email", type: "email", id: "email", name: "email" },
              {
                label: "Address",
                type: "textarea",
                id: "address",
                name: "address",
              },
              {
                label: "Description",
                type: "textarea",
                id: "description",
                name: "description",
              },
            ]}
            successMessage={profileSuccessMessage}
            errorMessage={profileErrorMessage}
            setSuccessMessage={setProfileSuccessMessage}
            setErrorMessage={setProfileErrorMessage}
            loading={profileLoading}
          />
        </div>
        <div className="border border-(--color-border) w-full p-6 rounded-2xl bg-(--color-surface) shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl text-(--color-text) font-bold">
            Change Profile Picture
          </h2>
          <hr className="border-gray-300" />
          <form
            onSubmit={handleProfilePicSubmit}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-start">
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                onChange={handleProfilePicChange}
                ref={imageUploadRef}
                className="hidden text-sm text-(--color-text-muted)
                           file:mr-3 file:rounded-md file:border-0
                           file:bg-(--color-primary)/10 file:px-3 file:py-1.5
                           file:text-sm file:font-medium file:text-(--color-primary)
                           hover:file:bg-(--color-primary)/20 file:transition-all file:duration-200"
              />

              <div>
                <div
                  className={`size-50 p-2 flex justify-center items-center rounded-full bg-(--color-primary)/30 border-2 border-(--color-border) ${
                    profilePicImg ? "bg-(--color-primary)/50" : ""
                  } mt-2 cursor-pointer hover:border-(--color-primary) transition-colors duration-200`}
                  onClick={handleDivClick}
                >
                  <img
                    src={
                      profilePicPreviewUrl ||
                      import.meta.env.VITE_USERPLACEHOLDERIMG
                    }
                    alt="Profile Preview"
                    className="size-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <ErrorOrSuccessMsg
                successMessage={profilePicSuccessMessage}
                errorMessage={profilePicErrorMessage}
                setSuccessMessage={setProfilePicSuccessMessage}
                setErrorMessage={setProfilePicErrorMessage}
              />
            </div>

            {!profilePicLoading ? (
              <button
                type="submit"
                className={`self-center md:self-end ${
                  profilePicSuccessMessage || profilePicErrorMessage
                    ? "mt-4"
                    : ""
                } flex justify-center items-center px-4 py-2 bg-(--color-primary) text-(--color-light-primary-bg) rounded-md hover:bg-(--color-primary-dark) transition-colors duration-200`}
                disabled={profilePicLoading}
              >
                <SquarePen className="inline mr-2 shrink-0" /> Change Image
              </button>
            ) : (
              <button
                type="submit"
                className={`self-end ${
                  profilePicSuccessMessage || profilePicErrorMessage
                    ? "mt-4"
                    : ""
                } px-4 py-2 bg-(--color-primary) text-(--color-light-primary-bg) rounded-md hover:bg-(--color-primary-dark) transition-colors duration-200 opacity-50 cursor-not-allowed`}
              >
                Changing...
              </button>
            )}
          </form>
        </div>
        <EditProfileCard
          heading="Change Password"
          handleSubmit={handlePasswordSubmit}
          values={passwords}
          onChange={handlePasswordChange}
          formFields={[
            {
              label: "Old Password",
              type: "password",
              id: "oldPassword",
              name: "oldPassword",
            },
            {
              label: "New Password",
              type: "password",
              id: "newPassword",
              name: "newPassword",
            },
          ]}
          successMessage={passwordSuccessMessage}
          errorMessage={passwordErrorMessage}
          setSuccessMessage={setPasswordSuccessMessage}
          setErrorMessage={setPasswordErrorMessage}
          loading={passwordLoading}
        />
      </div>

      <EditProfileCard
        heading="Edit Medical Information"
        handleSubmit={handleMedicalInfoSubmit}
        values={medicalInfo}
        onChange={handleMedicalInfoChange}
        formFields={[
          {
            label: "Diagnoses",
            type: "textarea",
            id: "diagnoses",
            name: "diagnoses",
          },
          {
            label: "Allergies",
            type: "textarea",
            id: "allergies",
            name: "allergies",
          },
        ]}
        successMessage={medicalSuccessMessage}
        errorMessage={medicalErrorMessage}
        setSuccessMessage={setMedicalSuccessMessage}
        setErrorMessage={setMedicalErrorMessage}
        loading={medicalLoading}
      />

      <div>
        <BgPrimaryLightBtn
          text="Cancel changes"
          onClick={() => window.history.back()}
        />
      </div>
    </div>
  );
};

export default EditProfile;
