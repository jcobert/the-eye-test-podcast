import React from "react";
import Layout from "../components/Layout.jsx";
import Heading from "../components/Heading.jsx";

function Home() {
  // window.onSpotifyIframeApiReady = (IFrameAPI) => {
  //   let element = document.getElementById("embed-iframe");
  //   let options = {
  //     uri: "spotify:episode:2PbJGxK2fwvxQjXOapiJAk?si=9a5862a069874c73",
  //   };
  //   let callback = (EmbedController) => {};
  //   IFrameAPI.createController(element, options, callback);
  // };

  return (
    <div>
      {/* <Heading 
          title={"Welcome!"}
          paragraph={"to the official home of The Eye Test Podcast"}
        /> */}
      <div></div>
    </div>
  );
}

export default Home;

export const Head = () => <title>The Eye Test</title>;
