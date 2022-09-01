import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalContextProvider.jsx";

function SpotifyPlayer(props) {
  const state = useContext(GlobalStateContext);
  // let controller = null;

  function controllerCb(EmbedController) {
    EmbedController.loadUri(state.uri);
    // EmbedController.togglePlay();
    // controller = EmbedController;
  }

  // TODO - On route change or component mount instead of window method?
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    let uri = state.uri;
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

// function controllerCb(EmbedController) {
//   document.querySelectorAll("#episodeButtons > button").forEach((episode) => {
//     episode.addEventListener("click", () => {
//       EmbedController.loadUri(episode.dataset.spotifyId);
//       EmbedController.togglePlay();
//     });
//   });
// }

export default SpotifyPlayer;
