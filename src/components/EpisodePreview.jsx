import React, { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContextProvider.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDice,
  faBaseball,
  faFootball,
  faGolfClub,
  faBasketballHoop,
  faCirclePlay,
} from "@fortawesome/pro-regular-svg-icons";

function EpisodePreview(props) {
  const dispatch = useContext(GlobalDispatchContext);
  const episode = props.node;
  const description = episode.description
    .replace(episode.title, "")
    .trim()
    .replaceAll("\n", "<br>");

  const tagIcons = [
    {
      name: "bets",
      icon: faDice,
    },
    {
      name: "baseball",
      icon: faBaseball,
    },
    {
      name: "football",
      icon: faFootball,
    },
    {
      name: "golf",
      icon: faGolfClub,
    },
    {
      name: "basketball",
      icon: faBasketballHoop,
    },
  ];

  return (
    <div>
      <div className="w-full flex flex-col gap-y-1 p-6 pt-4 text-center bg-slate-50 rounded border border-slate-400 shadow-md">
        {/* Title */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-theme-primary">
            {episode.title}
          </h3>
        </div>
        {/* Date */}
        <div>
          <p className="text-slate-600 text-sm md:text-base">
            {episode.publishedAt}
          </p>
        </div>
        {/* Tags */}
        {/* All as placeholder - to be set by episode data */}
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center py-4 text-slate-700">
          {tagIcons.map((tag) => {
            return <FontAwesomeIcon icon={tag.icon} className="text-2xl" />;
          })}
        </div>
        {/* Description */}
        <div>
          <p
            className="text-left py-2"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
        {/* Listen Button */}
        <div className="my-2">
          <button
            className="w-8/12 md:w-5/12 text-2xl lg:text-xl bg-theme-primary hover:bg-gray-50 text-white hover:text-theme-primary rounded-md border border-white hover:border-theme-primary transition-all p-2"
            onClick={() => {
              dispatch({
                type: "LOAD_EPISODE",
                payload: episode.simplecastId,
              });
            }}
          >
            <div className="flex justify-center items-center gap-x-2">
              <FontAwesomeIcon icon={faCirclePlay} />
              <p>Listen</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EpisodePreview;
