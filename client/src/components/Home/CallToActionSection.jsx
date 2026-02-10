import HeadingAndDesc from "../HeadingAndDesc";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import { Calendar, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CallToActionSection = () => {
  return (
    <div className="flex flex-col justify-center p-4 bg-linear-to-r from-emerald-500 to-[#155dfc]">
      <div className="text-white flex justify-center items-center flex-col pb-8 pt-10 px-4 md:px-0">
        <HeadingAndDesc
          heading="Ready to Experience Verdant Healing?"
          description="Get thousands of experts to work together on your health and wellness journey. Quality care with exceptional service."
          textColor="white"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-15 px-4 md:px-0">
        <Link to="/bookAppointment" className="w-full md:w-auto">
          <BgPrimaryLightBtn
            text={
              <>
                <Calendar className="mr-3" /> Book an Appointment
              </>
            }
          />
        </Link>
        <Link to="tel:+15551234567" className="w-full md:w-auto">
          <BgPrimaryLightBtn
            text={
              <>
                <Phone className="mr-3" /> Call Now
              </>
            }
          />
        </Link>
      </div>
      <hr className="self-center border w-8/10 text-white opacity-25 mb-13" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-auto w-9/10 md:w-8/10 self-center pb-10">
        <InfoElem infoOf="Emergency Line" description="+1 (555) 123-4567" />
        <InfoElem infoOf="Appointments" description="+1 (555) 987-6543" />
        <InfoElem
          infoOf="24/7 Availability"
          description="Always here for you"
        />
      </div>
    </div>
  );
};

const InfoElem = (props) => {
  return (
    <div className="text-white flex flex-col justify-center items-center text-center">
      <p className={`font-bold text-lg mb-2`}>{props.infoOf}</p>
      <p className="">{props.description}</p>
    </div>
  );
};

export default CallToActionSection;
