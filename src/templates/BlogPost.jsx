import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Link } from "gatsby";
import { Img } from "gatsby-plugin-image";

function BlogPost({ data }) {
  const post = data.contentfulBlogPost;
  const previous = data.previous;
  const next = data.next;
  // const plainTextDescription = documentToPlainTextString(
  //   JSON.parse(post.description.raw)
  // );
  // const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw));
  // const { minutes: timeToRead } = readingTime(plainTextBody);

  // const options = {
  //   renderNode: {
  //     [BLOCKS.EMBEDDED_ASSET]: (node) => {
  //       const { gatsbyImage, description } = node.data.target;
  //       return <GatsbyImage image={getImage(gatsbyImage)} alt={description} />;
  //     },
  //   },
  // };

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

  return <div>{renderRichText(post.description, options)}</div>;
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
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
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
