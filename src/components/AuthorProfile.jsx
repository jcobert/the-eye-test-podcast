import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function AuthorProfile(props) {
  const avatar = getImage(props.author.image);

  let avatarComponent = (
    <GatsbyImage
      image={avatar}
      alt="author photo"
      className="rounded-full border border-theme-primary"
    />
  );

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

  // scroll animation options
  const sal = {
    type: "slide-up",
    easing: "ease-out-expo",
    duration: "700",
  };

  return (
    <div
      className="flex flex-col"
      data-sal={props.animate ? sal.type : ""}
      data-sal-easing={sal.easing}
      data-sal-duration={sal.duration}
    >
      <div className="w-full md:max-w-2xl mx-auto flex-1">
        {/* Body */}
        <div className="p-6 bg-slate-50 rounded border border-slate-400 shadow-md flex flex-col justify-between">
          <div className="grid grid-flow-row">
            {/* Name */}
            <div className="text-center font-medium text-theme-primary row-start-2 py-4 text-3xl">
              <h4>{props.author.name}</h4>
            </div>
            {/* Avatar */}
            <div className="flex justify-center items-center gap-x-2">
              <div className="w-10 lg:w-12 md:mx-2">{avatarComponent}</div>
            </div>
          </div>
          {/* Bio */}
          <p className="text-base sm:text-lg">
            {renderRichText(props.author.shortBio, options)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
