import React from "react";
import HeroSection from "../components/Home/HeroSection";
import ServicesIntro from "../components/Home/ServicesIntro";
import HealingPhilosophySection from "../components/Home/HealingPhilosophySection";
import HeroDepartmentSection from "../components/Home/HeroDepartmentSection";
import PatientStories from "../components/Home/PatientStories";
import CallToActionSection from "../components/Home/CallToActionSection";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <ServicesIntro />
      <HealingPhilosophySection />
      <HeroDepartmentSection />
      <PatientStories />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;
