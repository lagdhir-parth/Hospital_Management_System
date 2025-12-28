import ContentCard from "../ContentCard";
import { MapPin, Phone, Mail, Clock, Ambulance } from "lucide-react";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: <MapPin />,
      title: "Address",
      description:
        "123 Healthcare Drive, Medical District, NY 10001, United States",
    },
    {
      icon: <Phone />,
      title: "Phone Numbers",
      description:
        "Main: +1 (555) 123-4567\nEmergency: +1 (555) 911-HELP\n\nAppointments: +1 (555) 987-6543",
    },
    {
      icon: <Mail />,
      title: "Email",
      description:
        "info@luenhospital.com\nappointments@luenhospital.com\n\nemergency@luenhospital.com",
    },
    {
      icon: <Clock />,
      title: "Working Hours",
      description:
        "Emergency: 24/7\nGeneral Services: Mon-Fri 8AM-6PM\nOutpatient: Mon-Sat 7AM-7PM",
    },
  ];
  return (
    <div className="md:w-75/100 mx-auto pb-30 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {contactDetails.map((detail, index) => (
          <ContentCard
            key={index}
            icon={detail.icon}
            title={detail.title}
            description={detail.description}
          />
        ))}
      </div>
      <div className="bg-[#fef2f2] border border-[#ffc9c9] rounded-2xl p-6 mt-10 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
        <div className="text-(--color-error)">
          <Ambulance size={50} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-[#9f1226] font-semibold text-xl">
            Emergency Services Available 24/7
          </h2>
          <p className="text-[#c21115]">
            For life-threatening emergencies, call 911 or come directly to our
            Emergency Department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
