import BgPrimaryBtn from "../BgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import { Link } from "react-router-dom";
import {
  Award,
  Calendar,
  GraduationCap,
  Phone,
  ReceiptIndianRupee,
  Star,
} from "lucide-react";

const DoctorCard = ({ doctor }) => {
  const professionalInfoContainerClasses =
    "flex items-center gap-2 mb-2 text-(--color-primary)";
  const professionalInfoSpanClasses =
    "text-(--color-text-muted) text-sm md:text-xs font-medium";

  return (
    <div className="border border-(--color-border) rounded-2xl shadow-lg overflow-hidden bg-(--color-surface) hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
      <div className="relative w-full h-64">
        <img
          src={doctor?.profilePic || import.meta.env.VITE_USERPLACEHOLDERIMG}
          alt="Doctor image"
          className="object-cover size-full"
        />
        <p className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
          <Star
            size={16}
            stroke="oklch(87.9% 0.169 91.605)"
            fill="oklch(87.9% 0.169 91.605)"
          />
          <span>123</span>
          <span className="text-(--color-text-muted)">(234)</span>
        </p>
      </div>
      <div className="flex flex-col justify-center gap-5 px-4 py-8">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-2xl md:text-xl">{doctor.name}</h3>
          <p className="font-semibold text-(--color-primary) text-lg md:text-base">
            {doctor.username}
          </p>
          <p className="text-sm text-(--color-light-text)">
            {doctor.description}
          </p>
        </div>
        <div>
          <div className={professionalInfoContainerClasses}>
            <Award size={20} />
            <span className={professionalInfoSpanClasses}>
              {doctor.yearsOfExperience}+ Years
            </span>
          </div>
          <div className={professionalInfoContainerClasses}>
            <Calendar size={20} />
            <span className={professionalInfoSpanClasses}>Mon,wed,Fri</span>
          </div>
          <div className={professionalInfoContainerClasses}>
            <GraduationCap size={20} />
            <span className={professionalInfoSpanClasses}>
              {doctor.qualifications.join(", ")}
            </span>
          </div>
          <div className={professionalInfoContainerClasses}>
            <ReceiptIndianRupee size={20} />
            <span className={professionalInfoSpanClasses}>
              {doctor.consultationFee} per appointment
            </span>
          </div>
          <div className={professionalInfoContainerClasses}>
            <Phone size={20} />
            <span className={professionalInfoSpanClasses}>
              {doctor.mobileNumber}
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Specializations:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-gray-300 px-2 py-1 rounded-lg font-semibold text-sm md:text-xs">
              {doctor.specialization}
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-3 text-sm h-min">
          {/* TODO: Create route:"/book-appointment/${doctor.id}"*/}
          <Link to="/bookAppointment">
            <BgPrimaryBtn text="Book Appointment" className="md:w-full" />
          </Link>

          <Link to={`tel: ${doctor.mobileNumber}`}>
            <BgPrimaryLightBtn text={<Phone size={20} />} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
