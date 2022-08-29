import React from "react";
import SpotifyPlayer from "./SpotifyPlayer.jsx";

function GlobalPlayer(props) {
  return (
    <div>
      <div className="my-auto">
        <SpotifyPlayer height="100" uri="https://open.spotify.com/show/0XYbDTCopdke2SPAWIxM0f?si=62ee843cd4124844" />
      </div>
    </div>
  );
}

export default GlobalPlayer;
