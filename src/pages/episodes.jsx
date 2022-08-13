import React from "react";
import Heading from "../components/Heading.jsx";
import SpotifyPlayer from "../components/SpotifyPlayer.jsx";

const spotifyEpisodes = [
  {
    title: "",
    uri: "spotify:episode:2PbJGxK2fwvxQjXOapiJAk?si=9a5862a069874c73",
  },
];

function Episodes() {
  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to episodes of The Eye Test Podcast right here."}
      />
      {/* Spotify embed */}
      {/* <div className="w-10/12 mx-auto">
        {spotifyEpisodes.map((ep) => (
          <SpotifyPlayer uri={ep.uri} height={"200"} width={"400"} title={ep.title} />
        ))}
      </div> */}
    </div>
  );
}

export default Episodes;

export const Head = () => <title>The Eye Test</title>;
