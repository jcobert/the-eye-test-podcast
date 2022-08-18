import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"

function BlogPost({ data }) {
  const post = data.contentfulBlogPost;
  const previous = data.previous;
  const next = data.next;
  const image = getImage(post.heroImage)

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a href={uri} className="underline text-theme-primary">
            {children}
          </a>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 className="text-2xl">{children}</h2>;
      },
    },
  };

  return (
    <div>
      {/* Title */}
      <div>
        <h1 className="text-center text-4xl mb-8 lg:mb-12">{post.title}</h1>
      </div>
      {/* Image */}
      <div className="lg:px-24 xl:px-48">
      <GatsbyImage 
        image={image}
        alt="blog post image"
        className="rounded-lg w-full h-72 mx-auto"
      />
      </div>
      {/* Body */}
      <div className="lg:px-24 xl:px-48 mt-8">
        {renderRichText(post.body, options)}
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
            url
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: TRACED_SVG
              resizingBehavior: FILL
            )
          }
      body {
        raw
      }
      tags
      description {
        raw
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`;

export default BlogPost;

export const Head = () => <title>The Eye Test</title>;
