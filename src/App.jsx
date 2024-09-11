import { useState } from "react";
import Header from "./assets/components/Header";
import HomePage from "./assets/components/HomePage";
import FileDisplay from "./assets/components/FileDisplay";

function App() {
  const [file, setFile] = useState("");
  const [audioStream, setAudioStream] = useState("");

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  return (
    <div className="flex flex-col  max-w-[1000px] mx-auto">
      <section className="min-h-screen flex flex-col">
        <Header />
        {isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <h1 className="text-green-400"></h1>
      <footer></footer>
    </div>
  );
}

export default App;
