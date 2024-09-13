import { useEffect, useRef, useState } from "react";
import Header from "./assets/components/Header";
import HomePage from "./assets/components/HomePage";
import FileDisplay from "./assets/components/FileDisplay";
import Information from "./assets/components/Information";
import Transcribing from "./assets/components/Transcribing";
import { MessageTypes } from "./utils/presets";

export default function App() {
  const [file, setFile] = useState("");
  const [audioStream, setAudioStream] = useState("");
  const [output, setOutput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finised, setFinised] = useState(false);
  const [downLoading, setDownLoading] = useState(false);

  const isAudioAvailable = file || audioStream;
  const worker = useRef(null);

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  useEffect(() => {
    if (!worker.current)
      worker.current = new Worker(
        new URL("./utils/Whisper.worker.js", import.meta.url, {
          type: "module",
        })
      );

    const onMessageRecive = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownLoading(true);
          console.log("DOWNLOADING");
          break;

        case "LOADING":
          setDownLoading(true);
          console.log("LOADING");
          break;

        case "RESULT":
          setOutput(e.data.results);
          console.log("RESULT");
          break;
        case "INFERENCE_DONE":
          setFinised(true);
          console.log("INFERENCE_DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageRecive);

    return worker.current.removeEventListener("message", onMessageRecive);
  }, []);

  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleSubmission() {
    if (!file && !audioStream) return;

    let audio = await readAudioFrom(file ? file : audioStream);
    const module_name = `openai/whisper-tiny.en`;
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      module_name,
    });
  }
  return (
    <div className="flex flex-col  max-w-[1000px] mx-auto">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information output={output} />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
            handleSubmission={handleSubmission}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
        {/* {isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )} */}
      </section>
      <h1 className="text-green-400"></h1>
      <footer></footer>
    </div>
  );
}
