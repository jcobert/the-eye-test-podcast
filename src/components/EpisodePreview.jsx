import React, { useContext } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider.jsx";

function EpisodePreview(props) {
  const dispatch = useContext(GlobalDispatchContext);

  return (
    <div>
      {/* <p>Title: {props.episode.title}</p> */}
      <button
        className="bg-slate-500 text-white border border-slate-600 rounded shadow-md p-2"
        onClick={() => {
          dispatch({
            type: "LOAD_EPISODE",
            payload: props.episode.simplecastId,
          });
        }}
      >
        {props.episode.title}
      </button>
    </div>
  );
}

export default EpisodePreview;
