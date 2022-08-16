import React from "react";
import Heading from "../components/Heading.jsx";
import PostPreview from "../components/PostPreview.jsx";
import { graphql } from "gatsby";

function Blog({ data }) {
  const posts = data.allContentfulBlogPost.edges;
  return (
    <div>
      <Heading
        title={"Blog"}
        subtitle={"Hot takes and  from The Eye Test contributors."}
      />
      <div className="w-full flex flex-col gap-y-16 mb-24">
        {posts.map(({ node, index }) => {
          return <PostPreview key={index} post={node} />;
        })}
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
            gatsbyImage(
              layout: FULL_WIDTH
              placeholder: BLURRED
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
