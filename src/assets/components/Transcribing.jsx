import PropTypes from "prop-types";

function Transcribing({ downloading }) {
  return (
    <div className="flex flex-col justify-center gap-10 md:gap-14 py-14 mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl text-center">
        <div className="flex flex-col gap-2 sm:gap-4 pb-4">
          <span className="text-blue-400 bold ">Transcribing</span>
          <p>
            {!downloading ? "warming up cylinders" : "core cylinnders engaged"}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-5 sm:gap-4 max-w-[500px] mx-auto w-full">
          {[1, 2, 3].map((val) => (
            <div
              key={val}
              className={`rounded-full h-2 sm:h-3 bg-slate-300 loading loading${val}`}
            ></div>
          ))}
        </div>
      </h1>
    </div>
  );
}

Transcribing.propTypes = {
  downloading: PropTypes.string,
};

export default Transcribing;
