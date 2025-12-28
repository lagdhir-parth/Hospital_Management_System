import HeadingAndDesc from "../HeadingAndDesc";
import StatisticElem from "../StatisticElem";

const ImpactByNumbers = () => {
  const stats = [
    {
      value: "25+",
      description: "Years of Service",
    },
    {
      value: "50,000+",
      description: "Patients Treated Annually",
    },
    {
      value: "100+",
      description: "Expert Medical Staff",
    },
    {
      value: "500+",
      description: "Healthcare Professionals",
    },
    {
      value: "98%",
      description: "Patient Satisfaction Rate",
    },
    {
      value: "24/7",
      description: "Emergency Services",
    },
  ];

  return (
    <section className="bg-(--color-primary) text-(--color-surface) py-20 px-4 md:px-10 lg:px-20 space-y-5">
      <div className="flex justify-center items-center">
        <HeadingAndDesc
          heading="Our Impact by the Numbers"
          description="Trusted by thousands of patients and families in our community"
          textColor="(--color-surface)"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-15 mx-auto md:w-9/10">
        {stats.map((stat, index) => (
          <div className="flex items-start justify-center" key={index}>
            <StatisticElem
              key={index}
              value={stat.value}
              description={stat.description}
              mutedTextColor="(--color-surface)"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactByNumbers;
