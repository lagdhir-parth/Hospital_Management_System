const MainHeading = (props) => {
  return (
    <div className="pt-[15vh] md:pt-[20vh] pb-15 md:pb-20">
      <div className="bg-(--color-light-primary-bg) flex flex-col justify-center items-center px-4 py-15 md:py-17">
        <h1 className="font-extrabold md:font-bold text-4xl md:text-5xl text-(--color-text) text-center">
          {props.title}
        </h1>
        <p className="text-(--color-light-text) text-lg md:text-xl text-center mt-6 px-4 md:px-0 md:w-6/12">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default MainHeading;
