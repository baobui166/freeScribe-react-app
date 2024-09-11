import { useState } from "react";
import Header from "./assets/components/Header";
import HomePage from "./assets/components/HomePage";

function App() {
  const [file, setFile] = useState("");
  const [audioStream, setAudioStream] = useState("");

  const isAudioAvailable = file || audioStream;

  return (
    <div className="flex flex-col  max-w-[1000px] mx-auto">
      <section className="min-h-screen flex flex-col">
        <Header />
        {boolCheck ? "" : <HomePage />}
      </section>
      <h1 className="text-green-400"></h1>
      <footer></footer>
    </div>
  );
}

export default App;
