import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/pro-solid-svg-icons";
import { faPipe } from "@fortawesome/pro-regular-svg-icons";

function BlogPost({ data }) {
  const post = data.contentfulBlogPost;
  const previous = data.previous;
  const next = data.next;
  const image = getImage(post.heroImage);
  const avatar = getImage(post.author.image);

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
        return <h1 className="text-3xl font-bold mb-2 lg:mb-3">{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <h2 className="text-[1.6rem] leading-8 sm:text-[1.75rem] font-semibold mb-2 lg:mb-3">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 className="text-2xl font-semibold mb-1">{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return (
          <h4 className="text-[1.4rem] font-semibold text-slate-800">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return (
          <h5 className="text-[1.3rem] font-semibold text-slate-800">
            {children}
          </h5>
        );
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        return <h6 className="text-xl text-slate-800">{children}</h6>;
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
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <div className="flex px-8 md:px-14 lg:px-20 py-8 text-slate-400">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              pull="left"
              className="text-xl sm:text-2xl pr-2 -mt-2"
            />
            <p className="text-slate-600">{children}</p>
            <FontAwesomeIcon
              icon={faQuoteRight}
              pull="right"
              className="text-xl sm:text-2xl pl-2 mb-2 self-end"
            />
          </div>
        );
      },
    },
  };

  return (
    <div>
      {/* Back Button */}
      <div className="mb-4 sm:mb-8 lg:mb-4 text-xl">
        <Link
          to="/blog"
          className="flex justify-center h-full gap-x-2 w-fit transition-all text-theme-primary hover:text-slate-400"
        >
          <div className="self-center">
            <ChevronLeftIcon className="w-6 -ml-2" />
          </div>
          <p className="self-center">All Posts</p>
        </Link>
      </div>
      {/* Title */}
      <div>
        <h1 className="text-center font-semibold text-4xl sm:text-5xl mb-2 md:mb-6 lg:mb-8 sm:-mt-4 lg:-mt-2">
          {post.title}
        </h1>
      </div>
      {/* Author */}
      <div className="text-center text-slate-700 text-sm md:text-base flex gap-x-1 justify-center items-center mb-4 sm:mb-10 lg:mb-12">
        {/* Avatar */}
        <div className="w-12 lg:w-16 md:mx-2">
          <GatsbyImage
            image={avatar}
            alt="author photo"
            className="rounded-full border border-theme-primary"
          />
        </div>
        <p>By {post.author.name}</p>
        <FontAwesomeIcon icon={faPipe} className="w-2 text-slate-600" />
        <p className="text-slate-500">{post.author.title}</p>
      </div>
      {/* Image */}
      <div className="lg:px-24 xl:px-40 rounded-lg">
        <GatsbyImage
          image={image}
          alt="blog post image"
          className="rounded-lg shadow-md w-full h-52 sm:h-56 md:h-72 mx-auto"
        />
      </div>
      {/* Date Published */}
      <div className="text-sm text-left text-slate-700 lg:px-24 xl:px-40 mt-2">
        <p>{post.publishDate}</p>
      </div>
      {/* Body */}
      <div className="lg:px-24 xl:px-40 mt-8 md:mt-10">
        {renderRichText(post.body, options)}
      </div>
      {/* Post Nav */}
      <div className="flex justify-around my-12 text-xl">
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
        title
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            cornerRadius: 9999
            width: 200
            cropFocus: CENTER
            height: 200
            resizingBehavior: FILL
            placeholder: TRACED_SVG
          )
        }
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
