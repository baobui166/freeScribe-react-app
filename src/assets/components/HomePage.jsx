import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

function HomePage({ setFile, setAudioStream }) {
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunk, setAudioChunk] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);
  const mimeType = "audio/webm";

  async function startRecording() {
    let tempStream;
    console.log("Starting Stream");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      tempStream = streamData;
    } catch (error) {
      console.error(error.message);
    }
    setRecordingStatus("recording");

    // create new media recorder instance using the stream
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localMediaChunk = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;

      localMediaChunk.push(localMediaChunk);
    };
    setAudioChunk(localMediaChunk);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunk, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunk([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const inteval = setInterval(() => {
      setDuration((pre) => pre + 1);
    }, 1000);

    return () => clearInterval(inteval);
  }, [recordingStatus, duration]);

  return (
    <main className="flex-1 p-4 text-center flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Free<span className="text-blue-400 bold ">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className="flex items-center specialBtn px-4 py-2 rounded-lg text-base justify-between gap-4 mx-auto w-72 max-w-full my-4"
      >
        <p className="text-blue-400">
          {recordingStatus === "inactive" ? "Record" : "Stop Recording"}
        </p>
        <div className="flex items-center gap-2">
          {duration !== 0 && (
            <p className="text-sm">{duration !== 0 ? `${duration}s` : ""}</p>
          )}
        </div>
        <i
          className={`fa-solid fa-microphone duration-200  ${
            recordingStatus === "recording" ? "text-rose-300" : ""
          }`}
        ></i>
      </button>
      <p className="text-base">
        Or{" "}
        <label
          htmlFor="upload"
          className="text-blue-400 cursor-pointer hover:text-blue-600 duration-200"
        >
          Upload{" "}
          <input
            id="upload"
            type="file"
            accept=".mp3, .wave"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        a mp3 file
      </p>
      <p className="italic text-slate-400">Free now free forever</p>
    </main>
  );
}

HomePage.propTypes = {
  setFile: PropTypes.func,
  ssetAudioStream: PropTypes.func,
};

export default HomePage;
