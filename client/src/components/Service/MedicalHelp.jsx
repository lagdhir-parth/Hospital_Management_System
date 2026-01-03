import { Link } from "react-router-dom";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";

const MedicalHelp = () => {
  return (
    <div className="bg-(--color-primary) text-(--color-bg) text-center flex flex-col justify-center p-4 py-8 md:py-13 gap-4 md:gap-6 md:mx-0">
      <h2 className="text-3xl font-extrabold md:font-bold">
        Need Medical Care?
      </h2>
      <p className="text-lg md:text-xl">
        Our experienced medical team is here to provide you with the best
        possible care.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
        <Link to="/bookAppointment" className="w-full md:w-auto">
          <BgPrimaryLightBtn text="Book Appointment" />
        </Link>
        <BgPrimaryLightBtn text="Emergency Services" />
      </div>
    </div>
  );
};

export default MedicalHelp;
