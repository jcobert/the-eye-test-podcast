import React from "react";
import Heading from "../components/Heading.jsx";
import PostPreview from "../components/PostPreview.jsx";
import { graphql } from "gatsby";

function Home({ data }) {
  const posts = data.allContentfulBlogPost.edges;
  const postPreviews = [];

  posts.map(({ node, index }) => {
    postPreviews.push(<PostPreview key={index} post={node} />);
  });

  return (
    <div>
      <Heading
        title={"The Eye Test"}
        subtitle={"The official home of all things The Eye Test."}
      />
      {/* Featured Blog Posts */}
      <div>
      <h3 className="text-2xl text-center">Recent Blog Posts</h3>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-24">
          {postPreviews.slice(0, 3)}
        </div>
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
            name
            title
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

export default Home;

export const Head = () => <title>The Eye Test</title>;
