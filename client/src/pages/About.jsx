import AboutHeading from "../components/About/AboutHeading";
import MissionAndVisionSection from "../components/About/MissionAndVisionSection";
import CoreValues from "../components/About/CoreValues";
import ImpactByNumbers from "../components/About/ImpactByNumbers";
import OurJourney from "../components/About/OurJourney";
import LeadershipTeam from "../components/About/LeadershipTeam";
import JoinMission from "../components/About/JoinMission";

const About = () => {
  return (
    <div>
      <AboutHeading />
      <MissionAndVisionSection />
      <CoreValues />
      <ImpactByNumbers />
      <OurJourney />
      <LeadershipTeam />
      <JoinMission />
    </div>
  );
};

export default About;
