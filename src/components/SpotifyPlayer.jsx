import React from "react";

function SpotifyPlayer(props) {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let element = document.getElementById("embed-iframe");
    let options = {
      uri: "spotify:episode:2PbJGxK2fwvxQjXOapiJAk?si=9a5862a069874c73",
      height: "40%",
      width: "100%",
    };
    let callback = (EmbedController) => {};
    IFrameAPI.createController(element, options, callback);
  };

  return (
    <div className="mx-auto">
      <div id="embed-iframe" className="mx-auto"></div>
    </div>
  );
}

export default SpotifyPlayer;
