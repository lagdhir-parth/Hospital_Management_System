const StatisticElem = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p
        className={`text-${props.textColor} text-3xl md:text-4xl font-extrabold md:font-bold mb-2`}
      >
        {props.value}
      </p>
      <p
        className={`text-${props.mutedTextColor ? props.mutedTextColor : "(--color-light-text)"}`}
      >
        {props.description}
      </p>
    </div>
  );
};

export default StatisticElem;
