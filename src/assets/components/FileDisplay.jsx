import PropTypes from "prop-types";

function FileDisplay({ file, audiStream, handleAudioReset }) {
  return (
    <main className="flex-1 mx-auto p-4 text-center flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center pb-20 w-72 sm:w-96 max-w-full">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your<span className="text-blue-400 bold ">File</span>
      </h1>
      <div className="flex flex-col text-left items-center gap-2 my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file?.name : "Custom audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button onClick={handleAudioReset} className="text-slate-400">
          Reset
        </button>
        <button className="specialBtn px-4 py-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium">
          <p>Transcribe</p>
          <i className="fa-solid fa-pen"></i>
        </button>
      </div>
    </main>
  );
}

FileDisplay.propTypes = {
  file: PropTypes.string,
  audiStream: PropTypes.object,
  handleAudioReset: PropTypes.func,
};

export default FileDisplay;
