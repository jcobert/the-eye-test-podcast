import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider.jsx";

function EpisodePreview(props) {
  const dispatch = useContext(GlobalDispatchContext);
  const episode = props.node;
  let description = episode.description.replace(episode.title, "").trim();
  description = description.replaceAll("\n", "<br>");

  return (
    <div>
      <div className="w-full flex flex-col gap-y-1 p-2 text-center bg-slate-50 rounded border border-slate-400 shadow-md">
        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold text-theme-primary">
            {episode.title}
          </h3>
        </div>
        {/* Date */}
        <div>
          <p className="text-slate-600 text-sm">{episode.publishedAt}</p>
        </div>
        {/* Description */}
        <div>
          <p
            className="text-left p-4"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        {/* Tags */}
        <div></div>
        {/* Listen Button */}
        <div>
          <button
            className="w-8/12 bg-slate-300 text-slate-800 border border-slate-600 rounded shadow-md p-2"
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
    </div>
  );
}

export default EpisodePreview;
