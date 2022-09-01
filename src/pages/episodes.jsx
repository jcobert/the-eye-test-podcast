import React, { useContext } from "react";
import Heading from "../components/Heading.jsx";
import {
  GlobalStateContext,
  GlobalDispatchContext,
} from "../context/GlobalContextProvider.jsx";

const spotifyEpisodes = [
  {
    title: "S1E16: The Texas Football",
    date: "08132022",
    uri: "spotify:episode:0g84uH74eHsuF0jmBK9scF?si=553dfaa9a3b74339",
  },
  {
    title: "S1E15: The Mets/Braves + ROS Outlook",
    date: "08132022",
    uri: "spotify:episode:2PbJGxK2fwvxQjXOapiJAk?si=297087be17a64479",
  },
];

function Episodes() {
  const dispatch = useContext(GlobalDispatchContext);
  const state = useContext(GlobalStateContext);

  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to The Eye Test Podcast right here."}
      />
      <div className="text-center text-lg text-theme-primary mb-16">
        <p>{state.uri}</p>
      </div>
      <div
        id="episodeButtons"
        className="flex flex-col md:flex-row gap-y-2 gap-x-4"
      >
        {spotifyEpisodes.map((episode) => (
          <button
            className="bg-slate-500 text-white border border-slate-600 rounded shadow-md p-2"
            data-spotify-id={episode.uri}
            onClick={() => {              
              dispatch({
                type: "LOAD_EPISODE",
                payload: episode.uri,
              });
            }}
          >
            {episode.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Episodes;

export const Head = () => <title>The Eye Test</title>;
