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
  faAngleDown,
  faAngleUp,
} from "@fortawesome/pro-regular-svg-icons";
import { faCalendarStar, faCircleStar } from "@fortawesome/pro-solid-svg-icons";
import ShowMoreText from "react-show-more-text";

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

  const latestBadge = (
    <div className="text-left -mb-9">
      <div className="relative -top-10 -left-8 flex gap-x-2 items-center text-theme-tertiary">
        <FontAwesomeIcon icon={faCalendarStar} className="text-5xl" />
        <h4 className="text-lg self-start -mt-1">New!</h4>
      </div>
    </div>
  );

  return (
    <div>
      <div className="w-full flex flex-col gap-y-1 p-6 pt-4 text-center bg-slate-50 rounded border border-slate-400 shadow-md">
        {/* Latest Badge */}
        <div className={`${!props.recent ? "hidden" : ""}`}>{latestBadge}</div>
        {/* Title */}
        <div className="">
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
        {/* Showing all as placeholder - to be set by episode data */}
        <div className="flex flex-wrap gap-6 justify-center py-4 text-slate-700">
          {tagIcons.map((tag) => {
            return (
              <FontAwesomeIcon
                icon={tag.icon}
                className="text-xl md:text-2xl"
              />
            );
          })}
        </div>
        {/* Description */}
        <div className="text-left">
          <ShowMoreText
            lines={3}
            className=""
            anchorClass="text-theme-primary"
            truncatedEndingComponent={"... "}
            more=<span>
              Show More <FontAwesomeIcon icon={faAngleUp} className="text-sm" />
            </span>
            less=<span>
              Show Less{" "}
              <FontAwesomeIcon icon={faAngleDown} className="text-sm" />
            </span>
          >
            <p
              className="text-left py-2"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </ShowMoreText>
        </div>
        {/* Listen Button */}
        <div className="mb-2 mt-6">
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
