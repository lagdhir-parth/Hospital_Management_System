import GetInTouchForm from "./GetInTouchForm";
import QuickActionSection from "./QuickActionSection";
import LocationSection from "./LocationSection";

const GetInTouchSection = () => {
  return (
    <div className="bg-(--color-bg) py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-8 my-16 p-4 md:w-8/10 mx-auto">
        <GetInTouchForm />
        <section>
          <img
            src="https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGNvbnRhY3QlMjByZWNlcHRpb24lMjBkZXNrfGVufDF8fHx8MTc1OTE2OTQ2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Hospital Contact Reception"
            className="w-full h-64 object-cover mt-8 rounded-lg shadow-lg"
          />
        </section>
        <QuickActionSection />
        <LocationSection />
      </div>
    </div>
  );
};

export default GetInTouchSection;
