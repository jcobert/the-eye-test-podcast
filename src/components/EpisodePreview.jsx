import React, { useContext } from "react";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider.jsx";

function EpisodePreview(props) {
  const dispatch = useContext(GlobalDispatchContext);
  const episode = props.node;
  const description = episode.description.replace(
    episode.title,
    ""
  );

  return (
    <div>
      <h3>{episode.title}</h3>
      <p>{description}</p>
      <button
        className="bg-slate-500 text-white border border-slate-600 rounded shadow-md p-2"
        onClick={() => {
          dispatch({
            type: "LOAD_EPISODE",
            payload: episode.simplecastId,
          });
        }}
      >
        {episode.title}
      </button>
    </div>
  );
}

export default EpisodePreview;
