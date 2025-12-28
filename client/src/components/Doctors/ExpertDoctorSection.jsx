import DoctorCard from "./DoctorCard";

const ExpertDoctorSection = () => {
  return (
    <section className="flex justify-center items-center bg-(--color-bg)">
      <div className="w-full px-4 py-20 md:w-8/10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-10">
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </div>
    </section>
  );
};

export default ExpertDoctorSection;
