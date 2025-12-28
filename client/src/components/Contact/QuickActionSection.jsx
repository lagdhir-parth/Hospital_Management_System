import { Link } from "react-router-dom";
import BgPrimaryBtn from "../BgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import { Calendar, Phone, Navigation } from "lucide-react";

const QuickActionSection = () => {
  return (
    <section className="bg-(--color-surface) p-4 md:p-5 flex flex-col justify-between gap-6 rounded-2xl h-min">
      <h2 className="font-extrabold md:font-bold">Quick Actions</h2>
      <div className="h-full flex flex-col justify-between gap-3">
        <BgPrimaryBtn
          text={
            <>
              <Link
                to="/bookAppointment"
                className="flex place-content-center w-full"
              >
                <Calendar />
                <p className="ml-3">Schedule Appointment</p>
              </Link>
            </>
          }
        />
        <BgPrimaryLightBtn
          text={
            <>
              <Phone />
              <p className="ml-3">Call Main Number</p>
            </>
          }
        />
        <BgPrimaryLightBtn
          text={
            <>
              <Navigation />
              <p className="ml-3">Get Directions</p>
            </>
          }
        />
      </div>
    </section>
  );
};

export default QuickActionSection;
