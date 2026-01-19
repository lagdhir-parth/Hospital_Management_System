import { useState, useEffect } from "react";
import { Bell, Shield, Palette, UserCheck2, Download } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import BgPrimaryLightBtn from "../../BgPrimaryLightBtn";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Local state for settings (load from user/localStorage)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
    privacy: {
      profileVisible: true,
      medicalVisible: false,
      contactVisible: true,
    },
    preferences: {
      darkMode: false,
      language: "English",
      autoSave: true,
    },
  });

  const [saving, setSaving] = useState(false);

  // Load settings on mount (simulate API/localStorage)
  useEffect(() => {
    // In real app: fetch from API or localStorage
    const savedSettings = localStorage.getItem("patientSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (section, key) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API save
      localStorage.setItem("patientSettings", JSON.stringify(settings));
      // await api.patch('/patients/updateSettings', settings);

      // Show success (use your ErrorOrSuccessMsg if needed)
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadData = () => {
    // Generate/export patient data
    const patientData = {
      name: user?.name,
      email: user?.email,
      medicalHistory: "Summary...",
      appointments: "List...",
      bills: "Summary...",
    };
    const blob = new Blob([JSON.stringify(patientData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `patient-data-${user?.username}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-(--color-primary) to-(--color-primary-dark) bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="text-(--color-text-muted) text-xl">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Notifications */}
          <div className="border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Bell className="size-8 text-(--color-primary)" />
              <h2 className="text-2xl font-bold text-(--color-text)">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-(--color-text-muted)">
                    Appointment confirmations, billing updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email}
                    onChange={() => handleToggle("notifications", "email")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-(--color-border) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-(--color-primary)/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--color-primary)"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    SMS Alerts
                  </h3>
                  <p className="text-sm text-(--color-text-muted)">
                    Urgent appointment reminders
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms}
                    onChange={() => handleToggle("notifications", "sms")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-(--color-border) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-(--color-primary)/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--color-primary)"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    App Push Notifications
                  </h3>
                  <p className="text-sm text-(--color-text-muted)">
                    In-app alerts and updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.app}
                    onChange={() => handleToggle("notifications", "app")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-(--color-border) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-(--color-primary)/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--color-primary)"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="size-8 text-(--color-primary)" />
              <h2 className="text-2xl font-bold text-(--color-text)">
                Privacy & Visibility
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    Profile Visible
                  </h3>
                  <p className="text-sm text-(--color-text-muted)">
                    Show name and photo to other patients
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.profileVisible}
                    onChange={() => handleToggle("privacy", "profileVisible")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-(--color-border) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-(--color-primary)/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--color-primary)"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    Medical Info Visible
                  </h3>
                  <p className="text-sm text-(--color-text-muted)">
                    Share diagnoses/allergies with doctors
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.privacy.medicalVisible}
                    onChange={() => handleToggle("privacy", "medicalVisible")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-(--color-border) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-(--color-primary)/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--color-primary)"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <Palette className="size-8 text-(--color-primary)" />
              <h2 className="text-2xl font-bold text-(--color-text)">
                Preferences
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    Dark Mode
                  </h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.preferences.darkMode}
                    onChange={() => handleToggle("preferences", "darkMode")}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-(--color-border) peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-(--color-primary)/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-(--color-primary)"></div>
                </label>
              </div>

              <div className="flex items-start justify-between p-4 bg-(--color-light-primary-bg)/50 rounded-2xl hover:bg-(--color-primary)/5 transition-colors">
                <div>
                  <h3 className="font-semibold text-(--color-text)">
                    Language
                  </h3>
                  <p className="text-sm text-(--color-text-muted)">
                    App interface language
                  </p>
                </div>
                <select
                  value={settings.preferences.language}
                  onChange={(e) =>
                    handleToggle("preferences", "language", e.target.value)
                  }
                  className="bg-transparent border border-(--color-border) rounded-xl px-4 py-2 text-(--color-text) focus:ring-2 focus:ring-(--color-primary) focus:border-transparent"
                >
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Gujarati</option>
                </select>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="border border-(--color-border) rounded-3xl bg-(--color-surface) shadow-xl p-8">
            <h2 className="text-2xl font-bold text-(--color-text) mb-8">
              Account Actions
            </h2>

            <div className="space-y-4">
              <button
                onClick={handleDownloadData}
                className="w-full flex items-center justify-center gap-3 p-6 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
              >
                <Download className="size-6" />
                Download My Data
              </button>

              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-(--color-primary) text-(--color-light-primary-bg) font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:bg-(--color-primary-dark) hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin size-6" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        pathLength="1"
                        className="opacity-25"
                      />
                      <path
                        fill="none"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <UserCheck2 className="size-6" />
                    Save All Changes
                  </>
                )}
              </button>

              <hr className="border-(--color-border)/50 my-6" />

              <BgPrimaryLightBtn
                text="Logout"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="w-full! justify-center!"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
