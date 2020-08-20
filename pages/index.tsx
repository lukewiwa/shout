import Head from "next/head";
import React, { useState, ReactEventHandler, ChangeEvent } from "react";
// @ts-ignore
import FittedText from "yarft";
import { TalkProps, ShoutProps } from "../types";

const App: React.FC = () => {
  const [shout, setShout] = useState(false);
  const toggleShout: ReactEventHandler = () => setShout(!shout);
  const [text, setText] = useState("");
  const handleText = (event: ChangeEvent<HTMLInputElement>) =>
    setText(event.target.value);

  const urlPrefix = "/shout";

  return (
    <div className="bg-orange-100 h-full w-full flex flex-col justify-center static font-sans">
      <Head>
        <title>Shout</title>
        <link rel="shortcut icon" href={`${urlPrefix}/favicon.ico`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${urlPrefix}/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${urlPrefix}/favicon-16x16.png`}
        />
        <link rel="manifest" href={`${urlPrefix}/site.webmanifest`} />
        <link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5" />
        <meta
          name="msapplication-config"
          content={`${urlPrefix}/browserconfig.xml`}
        />
        <meta name="msapplication-TileColor" content="#dd6b20" />
      </Head>

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
    <form className="flex flex-col stretch justify-between w-full max-w-2xl self-center p-5 pt-0">
      <input
        type="text"
        className="bg-white focus:outline-none focus:border-orange-400 border border-grey-300 py-2 px-4 block w-full appearance-none leading-normal"
        value={props.text}
        onChange={props.onTextChange}
      ></input>
      <button
        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 mt-5"
        onClick={props.onShout}
        type="submit"
      >
        SHOUT!
      </button>
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
