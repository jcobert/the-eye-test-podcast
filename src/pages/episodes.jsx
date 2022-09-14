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
      <div className="lg:float-left">
        <Heading
          title={"Episodes"}
          subtitle={"Listen to The Eye Test Podcast right here."}
        />
      </div>
      {/* Sort and Filter */}
      <div className="pb-20 md:pb-16 lg:float-right lg:mb-20">
        <div className="lg:w-fit">
          <h6 className="w-full md:w-56 mx-auto md:ml-0 pb-1 text-slate-800">
            Sort and Filter
          </h6>
          <div className="p-4 pt-3 border rounded-md flex">
            <FilterListbox
              options={tags}
              filteredState={filtered}
              setFilteredState={setFiltered}
              selectionState={selection}
              setSelectionState={setSelection}
              cards={episodeCards}
              title="Category"
            />
          </div>
        </div>
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
