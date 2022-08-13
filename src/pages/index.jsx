import React from "react";
import Layout from "../components/Layout.jsx";
import Heading from "../components/Heading.jsx";

function Home() {

  return (
    <div>
      <Heading 
          title={"The Eye Test"}
          subtitle={"The official home of all things Eye Test"}
        />
      <div></div>
    </div>
  );
}

export default Home;

export const Head = () => <title>The Eye Test</title>;
