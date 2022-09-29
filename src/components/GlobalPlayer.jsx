import React, { useContext } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
  faVolume,
} from "@fortawesome/pro-regular-svg-icons";

function GlobalPlayer() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);
  let playerTitle = state.title;
  if (state.title.length > 40) {
    playerTitle = playerTitle.slice(0, 40) + "...";
  }

  function handleHideShow() {
    document.getElementById("iframe").classList.toggle("hidden");
    if (document.getElementById("iframe").className.includes("hidden")) {
      document.getElementById("icon-collapse").classList.add("hidden");
      document.getElementById("icon-expand").classList.remove("hidden");
      document
        .getElementById("controls-bar")
        .classList.add("rounded-b-[.3rem]");
    } else {
      document.getElementById("icon-expand").classList.add("hidden");
      document.getElementById("icon-collapse").classList.remove("hidden");
      document
        .getElementById("controls-bar")
        .classList.remove("rounded-b-[.3rem]");
    }
  }

  function handleClose() {
    document.getElementById("iframe").classList.remove("hidden");
    document
      .getElementById("controls-bar")
      .classList.remove("rounded-b-[.3rem]");
    dispatch({
      type: "UNLOAD_EPISODE",
    });
  }

  return (
    <div
      id="player-container"
      className={`sticky bottom-0 mx-auto w-full md:w-10/12 lg:w-8/12 max-w-4xl lg:rounded-t-md p-2 ${
        state.uri === "" ? "hidden" : ""
      } animate-player-display`}
    >
      <div className="my-auto bg-transparent border border-slate-400 rounded-md shadow-md">
        {/* Player Title Bar */}
        <div
          id="controls-bar"
          className="p-1 bg-theme-primary/95 rounded-t-[.3rem] flex justify-between flex-1"
        >
          {/* Hide/Show Button */}
          <div>
            <button id="btn-hide-show" onClick={handleHideShow}>
              <FontAwesomeIcon
                id="icon-expand"
                icon={faUpRightAndDownLeftFromCenter}
                className="text-xl text-white px-2 pt-1 hidden hover:text-slate-200 transition-all"
              />
              <FontAwesomeIcon
                id="icon-collapse"
                icon={faDownLeftAndUpRightToCenter}
                className="text-xl text-white px-2 pt-1 hover:text-slate-200 transition-all"
              />
            </button>
          </div>
          {/* Player Title */}
          <div className="text-center text-sm sm:text-base text-slate-100 flex items-center justify-around gap-x-1">
            <FontAwesomeIcon icon={faVolume} className="text-xl px-2" />
            <p className="overflow-hidden flex-shrink-0">{playerTitle}</p>
          </div>
          {/* Close Button */}
          <div>
            <button onClick={handleClose}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-xl text-white hover:text-slate-200 transition-all px-2 pt-1"
              />
            </button>
          </div>
        </div>
        <iframe
          id="iframe"
          className="rounded-md rounded-t-none bg-gray-50"
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
