import React from "react";
import Layout from "../components/Layout.jsx";
import Heading from "../components/Heading.jsx";

function Home() {
  return (
    <div>
      <Layout>
        {/* <Heading 
          title={"The Eye Test"}
          paragraph={"Welcome to the official home of The Eye Test Podcast"}
        /> */}
      </Layout>
    </div>
  );
}

export default Home;

export const Head = () => <title>The Eye Test</title>;
