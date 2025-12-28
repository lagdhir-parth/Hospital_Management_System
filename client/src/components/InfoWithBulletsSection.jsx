import { CircleCheckBig } from "lucide-react";

const InfoWithBulletsSection = (props) => {
  return (
    <div className={`${props.classes} flex flex-col gap-6`}>
      <p className="font-bold text-4xl">{props.title}</p>
      <p className="text-lg text-(--color-text-muted)">{props.description}</p>
      <div className="flex flex-col gap-4 mb-5">
        {props.bullets.map((bullet, index) => (
          <div key={index} className="flex items-start md:items-center gap-3">
            <span>
              {bullet.icon ? (
                bullet.icon
              ) : (
                <CircleCheckBig size={20} color="#019a67" />
              )}
            </span>
            <p className="text-[0.99rem] text-(--color-text-muted)">{bullet.text || bullet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoWithBulletsSection;
