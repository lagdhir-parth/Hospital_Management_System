import GetInTouchForm from "./GetInTouchForm";
import QuickActionSection from "./QuickActionSection";
import LocationSection from "./LocationSection";

const GetInTouchSection = () => {
  return (
    <div className="bg-(--color-bg) py-10">
      {/* Fixed: Added opening <div>, cleaned className */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Row 1: Form spans full width on mobile, left on desktop */}
        <div className="lg:col-span-1 lg:row-span-3">
          <GetInTouchForm />
        </div>

        {/* Row 1/2 right: Image */}
        <section className="lg:col-span-1">
          <img
            src="https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGNvbnRhY3QlMjByZWNlcHRpb24lMjBkZXNrfGVufDF8fHx8MTc1OTE2OTQ2OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hospital Contact Reception Desk"
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl border-4 border-(--color-border)"
          />
        </section>

        {/* Row 2 left: Quick Actions */}
        <QuickActionSection />

        {/* Row 2 right: Location with Map */}
        <LocationSection />
      </div>
    </div>
  );
};

export default GetInTouchSection;
