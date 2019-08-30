import React, { useState, ReactEventHandler, ChangeEvent } from "react";
// @ts-ignore
import ScaleText from "react-scale-text";

const Talk = (props: any) => {
  return (
    <div className="flex flex-col stretch justify-between w-1/2 self-center p-5">
      <input
        type="text"
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        value={props.text}
        onChange={props.onTextChange}
      ></input>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5"
        onClick={props.onShout}
      >
        SHOUT!
      </button>
    </div>
  );
};

const Shout = (props: any) => {
  return (
    <div className="h-screen w-full flex align-middle items-center">
      <button
        className="absolute top-0 left-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={props.onClose}
      >
        x
      </button>
      <ScaleText className="h-screen w-full">
        <span className="h-screen align-middle">{props.text}</span>
      </ScaleText>
    </div>
  );
};

const App: React.FC = () => {
  const [shout, setShout] = useState(false);
  const toggleShout: ReactEventHandler = () => setShout(!shout);
  const [text, setText] = useState("");
  const handleText = (event: ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  return (
    <div className="bg-red-100 h-screen w-full flex flex-col justify-center static">
      {shout ? (
        <Shout onClose={toggleShout} text={text.toUpperCase()} />
      ) : (
        <Talk onShout={toggleShout} onTextChange={handleText} />
      )}
    </div>
  );
};

export default App;
