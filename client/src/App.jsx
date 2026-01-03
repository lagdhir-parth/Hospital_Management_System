import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import BookAppointment from "./pages/BookAppointment";
import Contact from "./pages/Contact";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import UserLogout from "./components/Auth/UserLogout";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import Page404 from "./components/Page404";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<UserLogout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bookAppointment" element={<BookAppointment />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
