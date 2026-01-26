import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import BookAppointment from "./pages/BookAppointment";
import Contact from "./pages/Contact";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import Page404 from "./pages/Page404";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useAuth } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientProfilePage from "./pages/PatientProfilePage";
import Profile from "./components/UserProfile/Patient/Profile";
import DoctorProfilePage from "./pages/DoctorProfilePage";
import AdminProfilePage from "./pages/AdminProfilePage";
import DashboardLayout from "./components/UserProfile/DashboardLayout";
import Appointments from "./components/UserProfile/Patient/Appointments";
import MedicalHistory from "./components/UserProfile/Patient/MedicalHistory";
import Billing from "./components/UserProfile/Patient/Billing";
import Settings from "./components/UserProfile/Patient/Settings";
import EditProfile from "./components/UserProfile/Patient/EditProfile";
import { useEffect, useState } from "react";
import DoctorProfile from "./components/UserProfile/Doctor/DoctorProfile";
import DoctorAppointment from "./components/UserProfile/Doctor/DoctorAppointment";
import DoctorMedicalHistory from "./components/UserProfile/Doctor/DoctorMedicalHistory";
import EditDoctorProfile from "./components/UserProfile/Doctor/EditDoctorProfile";
import TreatedPatients from "./components/UserProfile/Doctor/TreatedPatients";
import AdminProfile from "./components/UserProfile/Admin/AdminProfile";
import AdminUserManagement from "./components/UserProfile/Admin/AdminUserManagement";
import AdminDoctorManagement from "./components/UserProfile/Admin/AdminDoctorManagement";
import AdminMedicalRecords from "./components/UserProfile/Admin/AdminMedicalRecords";
import AdminBills from "./components/UserProfile/Admin/AdminBills";
import AdminDepartmentManagement from "./components/UserProfile/Admin/AdminDepartmentManagement";

const App = () => {
  const { isAuthenticated } = useAuth();

  const [hideNavbarFooter, setHideNavbarFooter] = useState(true);

  const location = useLocation();
  useEffect(() => {
    const ishideNavbarFooter = [
      "/profile", // All profile routes
    ].some((path) => location.pathname.startsWith(path));

    setHideNavbarFooter(ishideNavbarFooter);
  }, [location]);

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
          <Route path="/bookAppointment" element={<BookAppointment />} />

          <Route path="/profile/patient" element={<PatientProfilePage />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Profile />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="medical-history" element={<MedicalHistory />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<Settings />} />
              <Route path="personal-info" element={<Profile />} />
              <Route path="edit-patient-profile" element={<EditProfile />} />
            </Route>
          </Route>
          <Route path="/profile/doctor" element={<DoctorProfilePage />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DoctorProfile />} />
              <Route path="appointments" element={<DoctorAppointment />} />
              <Route
                path="medical-history"
                element={<DoctorMedicalHistory />}
              />
              <Route path="settings" element={<Settings />} />
              <Route path="personal-info" element={<DoctorProfile />} />
              <Route
                path="edit-doctor-profile"
                element={<EditDoctorProfile />}
              />
              <Route path="treated-patients" element={<TreatedPatients />} />

              {/* Additional doctor-specific routes can be added here */}
            </Route>
          </Route>
          <Route path="/profile/admin" element={<AdminProfilePage />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<AdminProfile />} />
              <Route path="user-management" element={<AdminUserManagement />} />
              <Route
                path="doctor-management"
                element={<AdminDoctorManagement />}
              />
              <Route path="medical-records" element={<AdminMedicalRecords />} />
              <Route path="bills-and-payments" element={<AdminBills />} />
              <Route
                path="department-management"
                element={<AdminDepartmentManagement />}
              />
              <Route path="personal-info" element={<AdminProfile />} />
              {/* Additional admin-specific routes can be added here */}
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={<Page404 setHideNavbarFooter={setHideNavbarFooter} />}
        />
      </Routes>
      {!hideNavbarFooter && <Footer />}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="colored"
      />
    </div>
  );
};

export default App;
