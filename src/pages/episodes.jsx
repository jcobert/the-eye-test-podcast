import React, { useContext } from "react";
import Heading from "../components/Heading.jsx";
import { GlobalStateContext } from "../context/GlobalContextProvider.jsx";
import { graphql } from "gatsby";
import EpisodePreview from "../components/EpisodePreview.jsx";

function Episodes({ data }) {
  const state = useContext(GlobalStateContext);
  const episodes = data.allSimplecastEpisode.edges;

  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to The Eye Test Podcast right here."}
      />
      <div
        id="episodeButtons"
        className="flex flex-col md:flex-row gap-y-2 gap-x-4"
      >
        {episodes.map(({ node, index }) => {
          return <EpisodePreview key={index} episode={node} />;
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
