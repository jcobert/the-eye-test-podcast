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
    IFrameAPI.createController(element, options, controllerCb);
  };

  return (
    <div className="">
      <div id="embed-iframe" className=""></div>
    </div>
  );
}

function controllerCb(EmbedController) {
  document.querySelectorAll("#episodeButtons > button").forEach((episode) => {
    episode.addEventListener("click", () => {
      EmbedController.loadUri(episode.dataset.spotifyId);
      EmbedController.togglePlay();
    });
  });
}

export { controllerCb };
export default SpotifyPlayer;
