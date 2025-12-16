import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  MapPin,
  Mail,
  Clock,
  Hospital,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Doctors", path: "/doctors" },
    { name: "Services", path: "/services" },
    { name: "Departments", path: "/departments" },
    { name: "Appointments", path: "/appointments" },
    { name: "Contact", path: "/contact" },
  ];

  const services = [
    "Emergency Care",
    "Surgery",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
  ];

  const anchorClasses =
    "hover:text-(--color-primary) transition-colors duration-200 cursor-pointer";

  return (
    <div>
      <footer className="bg-[#101828] text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:w-8/10 mx-auto px-7 md:px-10 py-10 gap-10">
          <div className="flex flex-col justify-between md:justify-start space-y-7">
            <div className="flex font-bold text-xl md:text-xl xl:text-2xl whitespace-nowrap xl:whitespace-normal">
              <div className="mr-2">
                <Hospital size={30} />
              </div>
              <p>Hospital Management</p>
            </div>
            <p className="text-[#d1d5dc]">
              Providing exceptional healthcare with compassion and expertise for
              over 25 years. Your health and wellbeing are our top priorities.
            </p>
            <div className="flex space-x-4 text-[#d1d5dc]">
              <a href="#" className={anchorClasses + " size-6"}>
                <Facebook />
              </a>
              <a href="#" className={anchorClasses + " size-6"}>
                <Twitter />
              </a>
              <a href="#" className={anchorClasses + " size-6"}>
                <Instagram />
              </a>
              <a href="#" className={anchorClasses + " size-6"}>
                <Linkedin />
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Quick Links</h2>
            <ul className="text-[#d1d5dc] space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.path} className={anchorClasses}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Our Services</h2>
            <ul className="text-[#d1d5dc] space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className={anchorClasses}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-4">Contact Us</h2>
            <address className="text-[#d1d5dc] space-y-4">
              <ContactInfoElem
                icon={<MapPin className="text-(--color-primary)" />}
                text="123 Healthcare Drive
Medical District, NY 10001"
              />
              <ContactInfoElem
                icon={<Phone className="text-(--color-primary)" />}
                text="(123) 456-7890"
              />
              <ContactInfoElem
                icon={<Mail className="text-(--color-primary)" />}
                text="contact@hospital.com"
              />
              <ContactInfoElem
                icon={<Clock className="text-(--color-primary)" />}
                text="Mon-Fri: 8am - 6pm"
              />
            </address>
          </div>
        </div>
        <hr />
        <div className="flex flex-col justify-center items-center space-y-2 py-4 md:py-2 md:flex-row md:justify-between md:space-y-0 px-4 md:px-20 text-[#d1d5dc] text-sm">
          <div className="p-4">
            <p>© 2024 Hospital Management. All rights reserved.</p>
          </div>
          <div className="flex justify-evenly w-full md:w-auto space-x-4 p-4 pt-0 md:pt-4">
            <a className={anchorClasses}>Privacy Policy</a>
            <a className={anchorClasses}>Terms of Service</a>
            <a className={anchorClasses}>HIPAA Notice</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ContactInfoElem = (props) => {
  return (
    <div className="flex gap-5">
      {props.icon}
      <p>{props.text}</p>
    </div>
  );
};

export default Footer;
