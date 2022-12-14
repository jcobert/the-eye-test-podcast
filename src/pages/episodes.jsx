import React from "react";
import Heading from "../components/Heading.jsx";
import { graphql } from "gatsby";
import EpisodePreview from "../components/EpisodePreview.jsx";
import FilterListbox from "../components/FilterListbox.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/pro-regular-svg-icons";

function Episodes({ data }) {
  const [filtered, setFiltered] = React.useState(false);
  const [selection, setSelection] = React.useState("");
  const [found, setFound] = React.useState("");
  const [reset, setReset] = React.useState(false);

  const episodes = data.allSimplecastEpisode.edges;
  const tags = ["Betting", "Baseball", "Football", "Golf", "Basketball", "UFC"];
  tags.sort();
  tags.unshift("Any");
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

  let resultsMessage = "";
  if (selection.length === episodeCards.length) {
    resultsMessage = `Showing all episodes`;
  } else if (filtered && selection.length > 0) {
    resultsMessage = `Found ${selection.length} of ${episodeCards.length}`;
  }

  function handleResetClick() {
    setFiltered(false);
    setSelection(episodeCards);
    setReset(true);
  }

  return (
    <div>
      <div className="lg:float-left">
        <Heading
          title={"Episodes"}
          subtitle={"Listen to The Eye Test Podcast right here."}
        />
      </div>
      {/* Sort and Filter */}
      <div className="pb-20 md:pb-16 lg:mb-20 lg:flex justify-end">
        <div className="lg:w-9/12">
          {/* <h6 className="w-full md:w-56 mx-auto md:ml-0 pb-1 text-slate-800">
            Sort and Filter
          </h6> */}
          <div className="p-4 pt-3 border rounded-md flex flex-col md:flex-row items-end justify-evenly gap-x-2 gap-y-2">
            <FilterListbox
              options={tags}
              filteredState={filtered}
              setFilteredState={setFiltered}
              selectionState={selection}
              setSelectionState={setSelection}
              cards={episodeCards}
              filter="category"
              source="podcast"
              title="Category"
              className=""
              reset={reset}
              resetState={setReset}
            />
            <SearchBar
              items={episodes}
              filteredState={filtered}
              setFilteredState={setFiltered}
              selectionState={selection}
              setSelectionState={setSelection}
              foundState={found}
              setFoundState={setFound}
              cards={episodeCards}
              source="podcast"
              className=""
            />
            {/* Reset Button */}
            <div className="w-full md:w-3/12 mx-auto">
              <button
                className={`w-full border shadow-sm rounded-md p-2 transition ${
                  filtered
                    ? "bg-theme-primary text-white border-gray-300 hover:bg-white hover:text-theme-primary active:bg-theme-primary active:text-white"
                    : "bg-slate-200 text-slate-800 border-gray-300 hover:bg-slate-100 active:bg-slate-200"
                }`}
                onClick={handleResetClick}
              >
                <span className="flex gap-x-2 justify-center items-center">
                  <FontAwesomeIcon icon={faArrowsRotate} />
                  <p className="inline-block text-sm">Reset</p>
                </span>
              </button>
            </div>
          </div>
          {/* Results Message */}
          <div className="text-center lg:text-right lg:pr-4 text-sm text-slate-500 mt-4">
            <p>{resultsMessage}</p>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8 mb-16">
        {selection.length < 1 ? (
          <div className="text-center text-slate-700 lg:col-span-2">
            <p>No episodes found...</p>
          </div>
        ) : (
          selection
        )}
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
