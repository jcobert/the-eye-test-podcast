import React from "react";
import Heading from "../components/Heading.jsx";
import { Script } from "gatsby";

function Episodes() {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById("embed-iframe");
    let options = {
      uri: "spotify:episode:2PbJGxK2fwvxQjXOapiJAk?si=9a5862a069874c73",
    };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  return (
    <div>
      <Heading
        title={"Episodes"}
        paragraph={"Find all the episodes of The Eye Test Podcast right here."}
      />
      <div id="embed-iframe"></div>

      {/* <Script src="https://open.spotify.com/embed-podcast/iframe-api/v1" /> */}
    </div>
  );
}

export default Episodes;

export const Head = () => <title>The Eye Test</title>;
