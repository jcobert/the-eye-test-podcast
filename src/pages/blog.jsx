import React from "react";
import Heading from "../components/Heading.jsx";
import PostPreview from "../components/PostPreview.jsx";
import { graphql } from "gatsby";
import FilterListbox from "../components/FilterListbox.jsx";
import SearchBar from "../components/SearchBar.jsx";

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
      <div className="pb-20 md:pb-16 lg:mb-4 md:max-w-2xl mx-auto">
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
          {/* Sort and Filter */}
          <div className="">
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
          </div>
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
