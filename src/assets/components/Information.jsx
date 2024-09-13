import { useEffect, useRef, useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

import PropTypes from "prop-types";

function Information(props) {
  const { output } = props;
  const [tab, setTap] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select Language");

  const worker = useRef();

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text)
      : translation || "No Translation";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Freescribe_${new Date().toDateString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generaTranslation() {
    if (translating || toLanguage === "Select Language") return;

    Worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Lant",
      tgt_lang: toLanguage,
    });
  }

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          console.log("LOADING");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("DONE");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  return (
    <main className="flex-1 p-4 text-center flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl max-w-prose w-full">
        Your<span className="text-blue-400 bold ">Transcription</span>
      </h1>
      <div className="flex items-center  mx-auto bg-white border border-solid border-blue-300 shadow rounded-full overflow-hidden">
        <button
          onClick={() => setTap("transcription")}
          className={`px-4 py-2 font-medium ${
            tab === "transcription"
              ? "bg-blue-400 text-white"
              : "hover:text-blue-600 text-blue-400"
          }`}
        >
          Transcription
        </button>
        <button
          onClick={() => setTap("translation")}
          className={`px-4 py-2 font-medium ${
            tab === "translation"
              ? "bg-blue-400 text-white"
              : "text-blue-400  hover:text-blue-600"
          }`}
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            translation={translation}
            textElement={textElement}
            toLanguage={toLanguage}
            translating={translating}
            setTranslating={setTranslating}
            setTranslation={setTranslation}
            setToLanguage={setToLanguage}
            generaTranslation={generaTranslation}
          />
        )}
      </div>

      <div className="flex items-center gap-4 mx-auto text-base">
        <button
          onClick={handleCopy}
          title="Copy"
          className="specialBtn hover:text-blue-500 duration-200 bg-white text-blue-400 aspect-square grid place-items-center px-4 py-2 rounded"
        >
          <i className="fa-solid fa-copy"></i>
        </button>
        <button
          onClick={handleDownload}
          title="Download"
          className="specialBtn hover:text-blue-500 duration-200 bg-white text-blue-400 aspect-square grid place-items-center px-4 py-2 rounded"
        >
          <i className="fa-solid fa-download"></i>
        </button>
      </div>
    </main>
  );
}

Information.propTypes = {
  output: PropTypes.array,
};

export default Information;
