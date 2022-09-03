import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalContextProvider.jsx";

function GlobalPlayer(props) {
  const state = useContext(GlobalStateContext);

  return (
    <div
      className={`sticky bottom-0 mx-auto h-[200px] w-full lg:w-8/12 max-w-6xl lg:rounded-t-md shadow-md ${
        state.uri === "" ? "hidden" : ""
      }`}
    >
      <div className="my-auto">
        <iframe
          height="200px"
          width="100%"
          frameborder="no"
          scrolling="no"
          seamless
          src={`https://player.simplecast.com/${state.uri}?dark=false&hide_share=true`}
        ></iframe>
      </div>
    </div>
  );
}

export default GlobalPlayer;
