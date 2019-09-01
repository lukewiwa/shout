import React, { useState, ReactEventHandler, ChangeEvent } from "react";
// @ts-ignore
import FittedText from "yarft";
import { TalkProps, ShoutProps } from "./types";

const App: React.FC = () => {
  const [shout, setShout] = useState(false);
  const toggleShout: ReactEventHandler = () => setShout(!shout);
  const [text, setText] = useState("");
  const handleText = (event: ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  return (
    <div className="bg-orange-100 h-screen w-full flex flex-col justify-center static font-sans">
      {shout ? (
        <Shout onClose={toggleShout} text={text.toUpperCase()} />
      ) : (
        <Talk onShout={toggleShout} onTextChange={handleText} text={text} />
      )}
    </div>
  );
};

const Talk = (props: TalkProps) => {
  return (
    <div className="flex flex-col stretch justify-between w-full max-w-2xl self-center p-5 pt-0">
      <input
        type="text"
        className="bg-white focus:outline-none focus:border-orange-400 border border-grey-300 py-2 px-4 block w-full appearance-none leading-normal"
        value={props.text}
        onChange={props.onTextChange}
      ></input>
      <button
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-5"
        type="button"
        onClick={props.onShout}
      >
        SHOUT!
      </button>
    </div>
  );
};

const Shout = (props: ShoutProps) => {
  return (
    <div className="h-screen w-full flex items-center align-middle text-orange-800 font-bold text-center">
      <button
        className="absolute top-0 left-0 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4"
        onClick={props.onClose}
      >
        x
      </button>
      <FittedText defaultFontSize={1000}>{props.text}</FittedText>
    </div>
  );
};

export default App;
