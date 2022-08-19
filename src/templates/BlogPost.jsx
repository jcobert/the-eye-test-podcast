import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";

function BlogPost({ data }) {
  const post = data.contentfulBlogPost;
  const previous = data.previous;
  const next = data.next;
  const image = getImage(post.heroImage);

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <b className="font-bold">{text}</b>,
    },
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        return (
          <a
            href={uri}
            className="underline text-theme-primary hover:text-slate-500 transition-all"
          >
            {children}
          </a>
        );
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        return <h1 className="text-3xl">{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 className="text-2xl sm:text-[1.75rem] font-semibold mb-2 lg:mb-3">{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 className="text-2xl text-slate-800 mb-1">{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return <h4 className="text-xl">{children}</h4>;
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className="mb-4 md:mb-6 text-base">{children}</p>;
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return <ul className="list-disc pl-4 mb-8">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (node, children) => {
        return <ol className="list-decimal pl-4 mb-8">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (node, children) => {
        return <li className="-mb-3 leading-snug">{children}</li>;
      },
    },
  };

  return (
    <div>
      {/* Title */}
      <div>
        <h1 className="text-center font-semibold text-4xl sm:text-5xl mb-8 lg:mb-12">{post.title}</h1>
      </div>
      {/* Image */}
      <div className="lg:px-24 xl:px-40 rounded-lg">
        <GatsbyImage
          image={image}
          alt="blog post image"
          className="rounded-lg shadow-md w-full h-52 sm:h-56 md:h-72 mx-auto"
        />
      </div>
      {/* Body */}
      <div className="lg:px-24 xl:px-40 mt-8 md:mt-10">
        {renderRichText(post.body, options)}
      </div>
      {/* Post Nav */}
      <div className="flex justify-around my-8 text-xl">
        {/* Previous */}
        <div
          className={`transition-all ${
            previous
              ? "text-theme-primary hover:text-slate-400"
              : "text-gray-300"
          }`}
        >
          <Link
            to={previous ? `/blog/${previous.slug}` : ""}
            className={`flex justify-center h-full gap-x-2 ${
              previous ? "" : "cursor-default"
            }`}
          >
            <div className="self-center">
              <ChevronLeftIcon className="w-6" />
            </div>
            <p className="self-center">Previous</p>
          </Link>
        </div>
        {/* Next */}
        <div
          className={`transition-all ${
            next ? "text-theme-primary hover:text-slate-400 " : "text-gray-300"
          }`}
        >
          <Link
            to={next ? `/blog/${next.slug}` : ""}
            className={`flex justify-center h-full gap-x-2 ${
              next ? "" : "cursor-default"
            }`}
          >
            <p className="self-center">Next</p>
            <div className="self-center">
              <ChevronRightIcon className="w-6" />
            </div>
          </Link>
        </div>
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
