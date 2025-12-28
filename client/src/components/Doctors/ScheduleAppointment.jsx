import { Calendar, Phone } from "lucide-react";
import BgPrimaryBtn from "../BgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import HeadingAndDesc from "../HeadingAndDesc";
import { Link } from "react-router-dom";

const ScheduleAppointment = () => {
  return (
    <section className="py-13 px-4">
      <div className="flex justify-center">
        <HeadingAndDesc
          heading="Schedule Your Appointment Today"
          description="Our patient care coordinators are available to help you schedule an appointment with the right specialist for your needs."
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-5">
        <Link to="/bookAppointment">
          <BgPrimaryBtn
            text={
              <div className="flex justify-center items-center">
                <Calendar size={20} className="inline-block mr-2" />
                <span>Book Online</span>
              </div>
            }
          />
        </Link>
        <BgPrimaryLightBtn
          text={
            <div className="flex justify-center items-center">
              <Phone size={20} className="inline-block mr-2" />
              <span>Call (555) 123-4567</span>
            </div>
          }
        />
      </div>
    </section>
  );
};

export default ScheduleAppointment;
