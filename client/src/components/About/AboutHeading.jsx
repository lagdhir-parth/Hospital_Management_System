import { Link } from "react-router-dom";
import BgPrimaryBtn from "../BgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";

const AboutHeading = () => {
  return (
    <section className="pt-[15vh] md:pt-[17vh] mx-auto mb-20">
      <div className="bg-(--color-light-primary-bg) flex flex-col md:flex-row justify-center items-center gap-20 px-5 md:px-20 py-20 rounded-lg">
        <div className="flex flex-col gap-10 md:max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold">About Hospital</h1>
          <p className="text-lg text-(--color-light-text)">
            For over 25 years, Luen Hospital has been a beacon of hope and
            healing in our community. We combine advanced medical technology
            with compassionate care to provide exceptional healthcare services.
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-5 md:w-max">
            <Link to="/services">
              <BgPrimaryBtn text="Our Services" />
            </Link>
            <Link to="/contact">
              <BgPrimaryLightBtn text="Contact Us" />
            </Link>
          </div>
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1662414185445-b9a05e26dba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU5MTM4Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hospital Building Exterior"
            className="md:max-w-lg object-cover rounded-2xl shadow-lg shadow-black/50"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHeading;
