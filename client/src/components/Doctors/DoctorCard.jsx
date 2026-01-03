import BgPrimaryBtn from "../BgPrimaryBtn";
import BgPrimaryLightBtn from "../BgPrimaryLightBtn";
import { Award, Calendar, GraduationCap, Phone, Star } from "lucide-react";

const DoctorCard = () => {
  const professionalInfoContainerClasses =
    "flex items-center gap-2 mb-2 text-(--color-primary)";
  const professionalInfoSpanClasses =
    "text-(--color-text-muted) text-sm md:text-xs font-medium";

  return (
    <div className="border border-(--color-border) rounded-2xl shadow-lg overflow-hidden bg-(--color-surface) hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
      <div className="relative w-full h-64">
        <img
          src="https://images.unsplash.com/photo-1734002886107-168181bcd6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nJTIwbWVkaWNhbCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NTkxMjMzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
          <h3 className="font-bold text-2xl md:text-xl">Dr.Sarah Johnson</h3>
          <p className="font-semibold text-(--color-primary) text-lg md:text-base">
            Cardiothoracic Surgery
          </p>
          <p className="text-sm text-(--color-light-text)">
            Chief of Cardiac Surgery
          </p>
        </div>
        <div>
          <div className={professionalInfoContainerClasses}>
            <Award size={20} />
            <span className={professionalInfoSpanClasses}>15+ Years</span>
          </div>
          <div className={professionalInfoContainerClasses}>
            <GraduationCap size={20} />
            <span className={professionalInfoSpanClasses}>
              Harvard Medical School
            </span>
          </div>
          <div className={professionalInfoContainerClasses}>
            <Calendar size={20} />
            <span className={professionalInfoSpanClasses}>Mon,wed,Fri</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Specializations:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className=" bg-gray-300 px-2 py-1 rounded-lg font-semibold text-sm md:text-xs">
              Heart Transplant
            </span>
            <span className="bg-gray-300 px-2 py-1 rounded-lg font-semibold text-sm md:text-xs">
              Minimally Invasive Cardiac Surgery
            </span>
            <span className="bg-gray-300 px-2 py-1 rounded-lg font-semibold text-sm md:text-xs">
              Valve Repair
            </span>
          </div>
        </div>
        <div className="flex justify-between gap-3 text-sm h-min">
          <BgPrimaryBtn text="Book Appointment" className="md:w-full" />

          <div>
            <BgPrimaryLightBtn text={<Phone size={20} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
