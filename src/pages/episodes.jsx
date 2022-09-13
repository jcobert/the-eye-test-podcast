import React from "react";
import Heading from "../components/Heading.jsx";
import { graphql } from "gatsby";
import EpisodePreview from "../components/EpisodePreview.jsx";
import FilterListbox from "../components/FilterListbox.jsx";

function Episodes({ data }) {
  const [filtered, setFiltered] = React.useState(false);
  const [selection, setSelection] = React.useState("All");

  const episodes = data.allSimplecastEpisode.edges;
  const tags = ["Bets", "Baseball", "Football", "Golf", "Basketball"];
  tags.sort();
  tags.unshift("All");
  let episodeCards = [];
  
  let recentCount = 0;
  episodes.map(({ node, index }) => {
    let isNew = false;
    if (node.daysSinceRelease < 8 && recentCount < 1) {
      isNew = true;
      recentCount++;
    }
    episodeCards.push(<EpisodePreview key={index} node={node} new={isNew} />);
  });


  return (
    <div>
      <Heading
        title={"Episodes"}
        subtitle={"Listen to The Eye Test Podcast right here."}
      />
      {/* Sort and Filter */}
      <div className="pb-16">
        <FilterListbox
          options={tags}
          filteredState={filtered}
          setFilteredState={setFiltered}
          selectionState={selection}
          setSelectionState={setSelection}
          cards={episodeCards}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8 mb-16">
        {selection}
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
