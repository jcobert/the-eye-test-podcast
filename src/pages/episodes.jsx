import React from "react";
import Heading from "../components/Heading.jsx";
import { graphql } from "gatsby";
import EpisodePreview from "../components/EpisodePreview.jsx";
import FilterListbox from "../components/FilterListbox.jsx";

function Episodes({ data }) {
  const episodes = data.allSimplecastEpisode.edges;
  let recentCount = 0;
  const tags = ["Bets", "Baseball", "Football", "Golf", "Basketball"];

  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to The Eye Test Podcast right here."}
      />
      {/* Sort and Filter */}
      <div className="pb-16">
        <FilterListbox options={tags} />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8 mb-16">
        {episodes.map(({ node, index }) => {
          let isNew = false;
          if (node.daysSinceRelease < 8 && recentCount < 1) {
            isNew = true;
            recentCount++;
          }
          return <EpisodePreview key={index} node={node} new={isNew} />;
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
