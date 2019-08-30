import React, { useState, ReactEventHandler, ChangeEvent } from "react";

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
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={props.onShout}
      >
        SHOUT!
      </button>
    </div>
  );
};

const Shout = (props: any) => {
  return (
    <div className="flex-col">
      <button onClick={props.onClose}>x</button> <span>{props.text}</span>
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
    <div className="h-full w-full flex flex-col">
      {shout ? (
        <Shout onClose={toggleShout} text={text.toUpperCase()} />
      ) : (
        <Talk onShout={toggleShout} onTextChange={handleText} />
      )}
    </div>
  );
};

export default App;
