import React from "react";
import Heading from "../components/Heading.jsx";

function Blog() {
  return (
    <div>
      <Heading
        title={"Blog"}
        subtitle={"Insight from The Eye Test contributors."}
      />
    </div>
  );
}

export default Blog;

export const Head = () => <title>The Eye Test</title>;
