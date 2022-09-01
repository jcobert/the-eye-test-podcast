import React, { useContext } from "react";
import { GlobalStateContext } from "../context/GlobalContextProvider.jsx";
import SpotifyPlayer from "./SpotifyPlayer.jsx";

function GlobalPlayer(props) {
  // const state = useContext(GlobalStateContext);
  // let player = <SpotifyPlayer height="100" uri={state.uri} />;

  // React.useEffect(() => {
  //   player = <SpotifyPlayer height="100" uri={state.uri} />;
  // }, state);

  return (
    <div>
      <div className="my-auto">
        {/* <SpotifyPlayer height="100" uri={props.uri} /> */}
      </div>
    </div>
  );
}

export default GlobalPlayer;
