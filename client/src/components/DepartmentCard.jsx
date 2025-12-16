import { ArrowRight } from "lucide-react";

const DepartmentCard = (props) => {
  return (
    <div className="group flex flex-col w-full md:w-80 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300 bg-white">
      <div className="relative h-45 overflow-hidden rounded-t-2xl">
        <img
          className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={props.img}
          alt={props.name}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0ae6] to-transparent flex items-end p-4 ">
          <h3 className="absolute text-xl text-white bottom-0 font-semibold mb-2">
            {props.name}
          </h3>
        </div>
      </div>
      <div className="h-6/10 p-5 py-6">
        <p className="text-(--color-light-text) mb-4">{props.description}</p>
        <ul className="flex flex-col gap-2">
          {props.therapies.map((therapy, index) => (
            <li
              key={index}
              className="list-disc marker:text-(--color-primary-dark) list-inside text-(--color-light-text) text-sm"
            >
              {therapy}
            </li>
          ))}
        </ul>
      </div>
      <button className="self-start flex gap-3 text-(--color-primary) px-4 py-2 mb-4 ml-4 rounded-xl font-medium hover:bg-(--color-primary-light) transition cursor-pointer">
        <p>Learn more</p> <ArrowRight />
      </button>
    </div>
  );
};

export default DepartmentCard;
