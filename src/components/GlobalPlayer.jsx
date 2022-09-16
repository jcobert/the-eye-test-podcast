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
} from "@fortawesome/pro-regular-svg-icons";

function GlobalPlayer() {
  const state = useContext(GlobalStateContext);
  const dispatch = useContext(GlobalDispatchContext);

  return (
    <div
      id="player-container"
      className={`sticky bottom-0 mx-auto w-full lg:w-8/12 max-w-6xl lg:rounded-t-md p-2 ${
        state.uri === "" ? "hidden" : ""
      }`}
    >
      <div className="my-auto bg-theme-primary border border-slate-400 rounded-md shadow-md">
        {/* Hide, show, close controls */}
        <div className="p-1">
          <button
            id="btn-hide-show"
            onClick={() => {
              document.getElementById("iframe").classList.toggle("hidden");
              if (
                document.getElementById("iframe").className.includes("hidden")
              ) {
                document
                  .getElementById("icon-collapse")
                  .classList.add("hidden");
                document
                  .getElementById("icon-expand")
                  .classList.remove("hidden");
              } else {
                document
                  .getElementById("icon-expand")
                  .classList.add("hidden");
                document
                  .getElementById("icon-collapse")
                  .classList.remove("hidden");
              }
            }}
          >
            <FontAwesomeIcon
              id="icon-expand"
              icon={faUpRightAndDownLeftFromCenter}
              className="text-xl text-slate-100 px-2 hidden"
            />
            <FontAwesomeIcon
              id="icon-collapse"
              icon={faDownLeftAndUpRightToCenter}
              className="text-xl text-slate-100 px-2"
            />
          </button>
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
                className="text-xl text-slate-100 px-2"
              />
            </button>
          </div>
        </div>
        <iframe
          id="iframe"
          className="rounded-md rounded-t-none"
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
