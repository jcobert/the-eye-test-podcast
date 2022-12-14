import React from "react";
import Heading from "../components/Heading.jsx";
import PostPreview from "../components/PostPreview.jsx";
import { graphql } from "gatsby";
import FilterListbox from "../components/FilterListbox.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { Disclosure, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSliders,
  faAngleUp,
  faArrowsRotate,
} from "@fortawesome/pro-regular-svg-icons";
import NoResults from "../components/NoResults.jsx";

function Blog({ data }) {
  const [filtered, setFiltered] = React.useState(false);
  const [selection, setSelection] = React.useState("");
  const [found, setFound] = React.useState("");

  const posts = data.allContentfulBlogPost.edges;
  const tags = ["Betting", "Baseball", "Football", "Golf", "Basketball", "UFC"];
  tags.sort();
  tags.unshift("Any");
  let authors = [];
  let blogPostCards = [];
  let noResults = false;

  if (posts.length <= 1) {
    blogPostCards = [<NoResults />];
    noResults = true;
  } else {
    posts.map(({ node, index }) => {
      blogPostCards.push(<PostPreview key={index} post={node} />);
      authors.push([node.author.name, node.author.title]);
    });
    blogPostCards.shift();
  }

  authors.sort();
  authors.splice(0, 1); // Removes author of dummy null blog entry
  authors.unshift(["Any"]);

  let resultsMessage = "";
  if (selection.length === blogPostCards.length) {
    resultsMessage = `Showing all posts`;
  } else if (filtered && selection.length > 0) {
    resultsMessage = `Found ${selection.length} of ${blogPostCards.length}`;
  }

  function handleResetClick() {
    setFiltered(false);
    setSelection(blogPostCards);
    noResults = false;
  }

  return (
    <div>
      <div className="">
        <Heading
          title={"Blog"}
          subtitle={
            "Hot takes and expert knowledge from The Eye Test contributors."
          }
        />
      </div>
      {/* Sort, Filter, and Search */}
      <div className="pb-12 md:pb-16 lg:mb-4 md:max-w-2xl mx-auto">
        <div className="flex flex-col mx-auto lg:w-9/12">
          {/* Search Bar */}
          <div
            className={`mb-4 lg:mb-6 z-30 ${
              noResults ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            <SearchBar
              items={posts.slice(1)}
              filteredState={filtered}
              setFilteredState={setFiltered}
              selectionState={selection}
              setSelectionState={setSelection}
              foundState={found}
              setFoundState={setFound}
              cards={blogPostCards}
              source="blog"
            />
          </div>
          {/* Filter and Sort Panel */}
          <div className="border rounded-md bg-slate-50 hover:border-slate-300 transition z-20">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full p-2 flex justify-between items-center text-slate-700 hover:text-theme-primary transition-all">
                    <div className="flex px-2 justify-center items-center gap-x-3">
                      <FontAwesomeIcon icon={faSliders} className="text-xl" />
                      <p>Filter and Sort</p>
                    </div>
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      className={`text-xl px-2 ${
                        open ? "rotate-180" : ""
                      } transition-all duration-100`}
                    />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-200 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    className={
                      noResults ? "pointer-events-none" : "pointer-events-auto"
                    }
                  >
                    <Disclosure.Panel static>
                      {({ close }) => (
                        <div className="p-2 mt-2 border-t flex flex-col md:flex-row items-end justify-evenly gap-x-2 gap-y-2">
                          <FilterListbox
                            options={tags}
                            filteredState={filtered}
                            setFilteredState={setFiltered}
                            selectionState={selection}
                            setSelectionState={setSelection}
                            cards={blogPostCards}
                            filter="category"
                            source="blog"
                            title="Category"
                          />
                          <FilterListbox
                            options={authors}
                            filteredState={filtered}
                            setFilteredState={setFiltered}
                            selectionState={selection}
                            setSelectionState={setSelection}
                            cards={blogPostCards}
                            filter="author"
                            source="blog"
                            title="Author"
                          />
                          {/* Reset Button */}
                          <div className="w-full md:w-3/12 mx-auto">
                            <button
                              className={`w-full border shadow-sm rounded-md p-2 transition ${
                                filtered
                                  ? "bg-theme-primary text-white border-gray-300 hover:bg-white hover:text-theme-primary active:bg-theme-primary active:text-white"
                                  : "bg-slate-200 text-slate-800 border-gray-300 hover:bg-slate-100 active:bg-slate-200"
                              }`}
                              onClick={() => {
                                handleResetClick();
                                close();
                              }}
                            >
                              <span className="flex gap-x-2 justify-center items-center">
                                <FontAwesomeIcon icon={faArrowsRotate} />
                                <p className="inline-block text-sm">Reset</p>
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
          {/* Results Message */}
          <div className="text-center text-sm text-slate-500 mt-4">
            <p>{resultsMessage}</p>
          </div>
        </div>
      </div>
      {/* Posts Selection */}
      <div className="w-full flex flex-col gap-y-16 mb-24">
        {selection.length < 1 ? (
          <div className="text-center text-slate-700">
            <p>No posts found...</p>
          </div>
        ) : (
          selection
        )}
      </div>
    </div>
  );
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          title
          description {
            raw
          }
          author {
            twitter
            instagram
            title
            shortBio {
              raw
            }
            name
            email
            company
            image {
              gatsbyImageData(
                layout: CONSTRAINED
                cornerRadius: 9999
                width: 600
                cropFocus: CENTER
                height: 600
                resizingBehavior: FILL
                placeholder: TRACED_SVG
              )
            }
          }
          heroImage {
            url
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: TRACED_SVG
              resizingBehavior: FILL
            )
          }
          slug
          publishDate(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`;

export default Blog;

export const Head = () => <title>The Eye Test</title>;
