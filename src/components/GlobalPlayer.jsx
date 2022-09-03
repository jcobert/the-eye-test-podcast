import React, { useContext } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons";

function GlobalPlayer() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  return (
    <div
      className={`sticky bottom-0 mx-auto w-full lg:w-8/12 max-w-6xl lg:rounded-t-md shadow-md ${
        state.uri === "" ? "hidden" : ""
      }`}
    >
      <div className="my-auto bg-slate-100 border-t-2 border-slate-300">
        <div className="float-right">
          <button
            onClick={() => {
              dispatch({
                type: "UNLOAD_EPISODE",
              });
            }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="text-xl text-slate-600 px-2 pt-1"
            />
          </button>
        </div>
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
