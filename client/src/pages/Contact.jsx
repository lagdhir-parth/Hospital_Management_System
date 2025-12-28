import ContactInfo from "../components/Contact/ContactInfo";
import FAQs from "../components/Contact/FAQs";
import GetInTouchSection from "../components/Contact/GetInTouchSection";
import TransportationOptions from "../components/Contact/TransportationOptions";
import MainHeading from "../components/MainHeading";

const Contact = () => {
  return (
    <div>
      <MainHeading
        title="Contact Us"
        description="We're here to help you with all your healthcare needs. Reach out to us for appointments, information, or emergency care."
      />
      <ContactInfo />
      <GetInTouchSection />
      <TransportationOptions />
      <FAQs />
    </div>
  );
};

export default Contact;
