import React, { useContext } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider.jsx";

function EpisodePreview(props) {
  const dispatch = useContext(GlobalDispatchContext);
  const episode = props.node;
  const description = episode.description
    .replace(episode.title, "")
    .replaceAll("\n", "<br>");

  return (
    <div>
      <div className="w-full p-2 text-center bg-slate-50 rounded border border-slate-400 shadow-md">
        <h3>{episode.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: description }}></p>
        <button
          className="w-8/12 bg-slate-500 text-white border border-slate-600 rounded shadow-md p-2"
          onClick={() => {
            dispatch({
              type: "LOAD_EPISODE",
              payload: episode.simplecastId,
            });
          }}
        >
          Listen
        </button>
      </div>
    </div>
  );
}

export default EpisodePreview;
