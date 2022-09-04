import React from "react";
import Heading from "../components/Heading.jsx";
import { graphql } from "gatsby";
import EpisodePreview from "../components/EpisodePreview.jsx";

function Episodes({ data }) {
  const episodes = data.allSimplecastEpisode.edges;
  let recentCount = 0;

  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to The Eye Test Podcast right here."}
      />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8 mb-16">
        {episodes.map(({ node, index }) => {
          let recent = false;
          if (node.daysSinceRelease < 8 && recentCount < 1) {
            recent = true;
            recentCount++;
          }
          return <EpisodePreview key={index} node={node} recent={recent} />;
        })}
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query PodcastPageQuery {
    allSimplecastEpisode(sort: { order: DESC, fields: publishedAt }) {
      edges {
        node {
          simplecastId
          slug
          enclosureUrl
          number
          publishedAt(formatString: "MMMM D, Y")
          daysSinceRelease
          title
          description
          image {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;

export default Episodes;

export const Head = () => <title>The Eye Test</title>;
