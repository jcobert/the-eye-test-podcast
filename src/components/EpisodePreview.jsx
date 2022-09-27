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
      name: "betting",
      icon: faDice,
      keywords: ["bets", "gambl", "picks", "over/under", "moneyline"],
    },
    {
      name: "baseball",
      icon: faBaseball,
      keywords: ["baseball", "mlb", "mets", "yankees"],
    },
    {
      name: "football",
      icon: faFootball,
      keywords: ["football", "nfl", "jets"],
    },
    {
      name: "golf",
      icon: faGolfClub,
      keywords: ["golf", "pga", "masters"],
    },
    {
      name: "basketball",
      icon: faBasketballHoop,
      keywords: ["basketball", "nba", "knicks", "nets"],
    },
  ];

  function identifyTags() {
    return tagIcons.filter(function (tag) {
      return (
        tag.keywords.some((keyword) =>
          episode.title.toLowerCase().includes(keyword)
        ) ||
        tag.keywords.some((keyword) =>
          episode.description.toLowerCase().includes(keyword)
        )
      );
    });
  }

  const newBadge = (
    <div className="text-left -mb-10">
      <div className="relative -top-10 -left-8 flex gap-x-2 items-start text-theme-tertiary">
        <FontAwesomeIcon icon={faCalendarStar} className="text-5xl" />
        <h4 className="text-2xl -mt-1 font-optician">NEW!</h4>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className={`w-full flex flex-col gap-y-1 p-6 pt-4 text-center bg-slate-50 rounded shadow-md border ${
          props.new ? "border-theme-tertiary" : "border-slate-400"
        }`}
      >
        {/* New Badge */}
        <div className={`${!props.new ? "hidden" : ""}`}>{newBadge}</div>
        {/* Title */}
        <div className={`${props.new ? "" : "lg:mt-3"}`}>
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
        {/* Placeholder - to be set by episode data */}        
        <div className="flex flex-wrap gap-6 justify-center py-4 text-slate-700">
          {identifyTags().map((tag) => {
            return (
              <FontAwesomeIcon
                icon={tag.icon}
                className="text-xl md:text-2xl"
              />
            );
          })}
        </div>
        {/* Description */}
        <div className="text-left sm:px-4 md:px-6">
          <ShowMoreText
            lines={3}
            className="py-2"
            anchorClass="text-theme-primary"
            truncatedEndingComponent={"... "}
            more={
              <span>
                Show More{" "}
                <FontAwesomeIcon icon={faAngleUp} className="text-sm" />
              </span>
            }
            less={
              <span>
                Show Less{" "}
                <FontAwesomeIcon icon={faAngleDown} className="text-sm" />
              </span>
            }
          >
            <p
              className="text-left"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </ShowMoreText>
        </div>
        {/* Listen Button */}
        <div className="mb-2 mt-6">
          <button
            className={`w-8/12 md:w-5/12 text-2xl lg:text-xl hover:bg-gray-50 text-white border border-white rounded-md transition-all p-2 bg-theme-primary hover:text-theme-primary hover:border-theme-primary`}
            onClick={() => {
              dispatch({
                type: "LOAD_EPISODE",
                payload: [episode.simplecastId, episode.title],
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
