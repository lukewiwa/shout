import React, {
  useState,
  ReactEventHandler,
  FormEventHandler,
  ChangeEventHandler,
} from "react";
// @ts-ignore
import FittedText from "yarft";
import { TalkProps, ShoutProps } from "./types";

const App: React.FC = () => {
  const [shout, setShout] = useState(false);
  const toggleShout: ReactEventHandler = () => setShout(!shout);

  const [text, setText] = useState("");
  const handleText: ChangeEventHandler<HTMLInputElement> = (event) =>
    setText(event.target.value);

  return (
    <div className="bg-orange-100 h-full w-full flex flex-col justify-center static font-sans">
      {shout ? (
        <Shout onClose={toggleShout} text={text.toUpperCase()} />
      ) : (
        <Talk onShout={toggleShout} onTextChange={handleText} text={text} />
      )}
    </div>
  );
};

const Talk = (props: TalkProps) => {
  const handleSubmit: FormEventHandler = (e) => {
    props.onShout(e);
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col stretch justify-between w-full max-w-2xl self-center p-5 pt-0"
    >
      <input
        type="text"
        className="bg-white focus:outline-none focus:border-orange-400 border border-grey-300 py-2 px-4 block w-full appearance-none leading-normal"
        value={props.text}
        onChange={props.onTextChange}
      ></input>
      <input
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-5"
        type="submit"
        value="SHOUT!"
      />
    </form>
  );
};

const Shout = (props: ShoutProps) => {
  return (
    <div
      onClick={props.onClose}
      className="h-screen w-full flex items-center align-middle text-orange-800 font-bold text-center"
    >
      <FittedText defaultFontSize={1000}>{props.text}</FittedText>
    </div>
  );
};

export default App;
