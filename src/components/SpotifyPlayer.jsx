import React from "react";

function SpotifyPlayer(props) {
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let uri = props.uri;
    let height = props.height;
    let width = props.width;
    let element = document.getElementById("embed-iframe");
    let options = {
      uri: uri,
      height: height,
      width: width,
    };
    let callback = (EmbedController) => {
      document
        .querySelectorAll("#episodeButtons > button")
        .forEach((episode) => {
          episode.addEventListener("click", () => {
            EmbedController.loadUri(episode.dataset.spotifyId);
            EmbedController.togglePlay();
          });
        });
    };
    IFrameAPI.createController(element, options, callback);
  };

  return (
    <div className="">
      <div id="embed-iframe" className=""></div>
    </div>
  );
}

export default SpotifyPlayer;
