import { MapPin } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="bg-(--color-surface)  p-4 md:p-5 flex flex-col justify-between gap-6 rounded-2xl h-min">
      <h2 className="font-extrabold md:font-bold">Location</h2>
      <div className="bg-gray-200 rounded-2xl flex flex-col justify-center items-center text-(--color-light-text) h-48">
        <MapPin size={30} />
        <p className="p-4 text-center">
          Interactive map would be embedded here 123 Healthcare Drive, Medical
          District, NY
        </p>
      </div>
    </section>
  );
};

export default LocationSection;
