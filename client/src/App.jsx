import { library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
library.add(fas, far, fab)

import "./App.css"
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar"
import LandingPage from './pages/LandingPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Departments from './pages/Departments'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'

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
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
