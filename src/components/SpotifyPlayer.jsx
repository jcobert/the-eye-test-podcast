import React from "react";

function SpotifyPlayer(props) {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById("embed-iframe");
    let options = {
      uri: "spotify:episode:2PbJGxK2fwvxQjXOapiJAk?si=9a5862a069874c73",
    };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  return (
    <div className="">
      <div id="embed-iframe"></div>
    </div>
  );
}

export default SpotifyPlayer;
