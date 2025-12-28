import HeadingAndDesc from "../HeadingAndDesc";

const Heading = () => {
  const statistics = [
    { value: "8", label: "Cardiologists" },
    { value: "6", label: "Neurologists" },
    { value: "12", label: "Orthopedists" },
    { value: "10", label: "Pediatricians" },
    { value: "7", label: "Women's Health Specialists" },
    { value: "15", label: "Emergency Medicine" },
    { value: "18", label: "Internal Medicine" },
    { value: "14", label: "Surgeons" },
  ];
  return (
    <div className="pt-[15vh] md:pt-[17vh]">
      <div className="flex flex-col justify-center items-center gap-5 bg-(--color-light-primary-bg) py-17 md:py-20 px-4 md:px-8 lg:px-16">
        <HeadingAndDesc
          heading="Meet Our Expert Medical Team"
          description="Our world-class physicians and specialists are dedicated to providing exceptional care with the latest medical advances and compassionate service."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 text-center px-4 md:px-8 lg:px-16">
          {statistics.map((stat, index) => (
            <div
              className="flex flex-col justify-center items-center border border-gray-300 p-5 rounded-2xl bg-(--color-surface) shadow-md"
              key={index}
            >
              <h3 className="font-extrabold md:font-bold text-xl text-(--color-primary-dark) mb-1">
                {stat.value}
              </h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heading;
