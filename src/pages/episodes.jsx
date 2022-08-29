import React from "react";
import Heading from "../components/Heading.jsx";

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
  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to The Eye Test Podcast right here."}
      />
      <div
        id="episodeButtons"
        className="flex flex-col md:flex-row gap-y-2 gap-x-4"
      >
        {spotifyEpisodes.map((episode) => (
          <button
            className="bg-slate-500 text-white border border-slate-600 rounded shadow-md p-2"
            data-spotify-id={episode.uri}
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
