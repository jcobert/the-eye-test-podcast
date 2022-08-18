import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { Link } from "gatsby";
import { Img } from "gatsby-plugin-image";
import { ChevronRightIcon } from "@heroicons/react/solid";

function PostPreview(props) {
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
      <div className="md:max-w-2xl mx-auto">
        {/* Date Published */}
        <div className="text-slate-500">{props.post.publishDate}</div>
        {/* Body */}
        <div className="bg-slate-50 rounded border border-slate-400 shadow-md h-full flex flex-col justify-between">
          <div className="flex flex-col gap-y-6 text-left px-8 pt-6 md:pt-8 h-full justify-between">
            {/* Preview Image */}
            <div
              className="h-36 bg-cover border shadow-sm w-full mx-auto lg:flex-initial"
              style={{ backgroundImage: `url(${props.post.heroImage.url})` }}
            ></div>
            {/* Title */}
            <div className="py-4 text-center font-semibold text-3xl md:text-3xl text-theme-primary">
              <h4>{props.post.title}</h4>
            </div>
            {/* Author */}
            <div className="-mt-8 text-center">
              <p className="text-slate-700">By {props.post.author.name}</p>
              <p className="text-slate-500 text-sm">
                {props.post.author.title}
              </p>
            </div>
            {/* Description */}
            <p className="text-md sm:text-lg">
              {renderRichText(props.post.description, options)}
            </p>
            {/* CTA */}
            <div className="bg-theme-primary hover:bg-gray-50 text-white hover:text-theme-primary text-lg font-medium w-full sm:w-10/12 md:w-5/12 lg:w-4/12 h-16 md:h-14 mx-auto mt-4 mb-8 rounded-md border border-white hover:border-theme-primary transition-all">
              <Link
                to={`/blog/${props.post.slug}`}
                className="flex justify-center h-full gap-x-2"
              >
                <p className="self-center">Read more</p>
                <div className="self-center">
                  <ChevronRightIcon className="w-6" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPreview;
