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
  faAngleDown,
} from "@fortawesome/pro-regular-svg-icons";

function Blog({ data }) {
  const [filtered, setFiltered] = React.useState(false);
  const [selection, setSelection] = React.useState("Any");
  const [found, setFound] = React.useState("");

  const posts = data.allContentfulBlogPost.edges;
  const tags = ["Betting", "Baseball", "Football", "Golf", "Basketball"];
  tags.sort();
  tags.unshift("Any");
  let authors = [];
  let blogPostCards = [];

  {
    posts.map(({ node, index }) => {
      blogPostCards.push(<PostPreview key={index} post={node} />);
      authors.push(node.author.name);
    });
  }

  authors.sort();
  authors.unshift("Any");

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
          <div className="mb-4 lg:mb-6">
            <SearchBar
              items={posts}
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
          <div className="p-2 border rounded-md bg-slate-50 hover:border-slate-300 z-50">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="w-full flex justify-between items-center text-slate-700">
                    <div className="flex px-2 justify-center items-center gap-x-3">
                      <FontAwesomeIcon icon={faSliders} className="text-xl" />
                      <p>Filter and Sort</p>
                    </div>
                    <FontAwesomeIcon
                      icon={open ? faAngleDown : faAngleUp}
                      className="text-xl px-2"
                    />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel static>
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
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
          {/* Sort and Filter */}
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-16 mb-24">{selection}</div>
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
            name
            title
            image {
              gatsbyImageData(
                layout: CONSTRAINED
                cornerRadius: 9999
                width: 100
                cropFocus: CENTER
                height: 100
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
