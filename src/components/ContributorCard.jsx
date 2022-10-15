import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "gatsby";

function ContributorCard(props) {
  const avatar = getImage(props.contributor.image);

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
          <h2 className="text-[1.6rem] leading-8 sm:text-[1.75rem] font-medium mb-2 lg:mb-3">
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 className="text-2xl font-medium mb-1">{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return (
          <h4 className="text-[1.4rem] font-medium text-slate-800">
            {children}
          </h4>
        );
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return (
          <h5 className="text-[1.3rem] font-medium text-slate-800">
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
        <div className="p-6 rounded border flex flex-col justify-between font-jost">
          <div className="flex flex-col lg:flex-row">
            {/* Avatar */}
            <GatsbyImage
              image={avatar}
              alt="contributor photo"
              className="w-32 mx-auto rounded-full shadow"
              imgClassName="rounded-full border-2 border-slate-300"
              placeholder="tracedSVG"
              objectFit="contain"
            />
            {/* Info */}
            <div className="text-center lg:text-left lg:ml-4 flex-auto mt-2 lg:mt-0">
              {/* Name */}
              <h4 className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-theme-primary/95 to-[#4465be]/95">
                {props.contributor.name}
              </h4>
              {/* Title */}
              <h6 className="text-slate-700">{props.contributor.title}</h6>
              {/* Social Links */}
              <div className="flex lg:flex-col gap-x-16 md:gap-x-16 gap-y-2 justify-center mt-4">
                {/* Twitter */}
                <div
                  className={`${
                    !props.contributor.twitter
                      ? "hidden"
                      : "flex justify-center lg:justify-start items-center gap-x-2"
                  }`}
                >
                  <Link
                    className="flex items-center md:flex-col lg:flex-row text-slate-700 hover:text-theme-primary transition"
                    to={`https://twitter.com/${props.contributor.twitter}`}
                  >
                    <FontAwesomeIcon
                      className="text-slate-600 text-3xl md:text-xl lg:text-lg lg:mr-2 hover:text-slate-500 transition"
                      icon={faTwitter}
                    />
                    <span className="hidden md:inline-block text-sm">@{props.contributor.twitter}</span>
                  </Link>
                </div>
                {/* Instagram */}
                <div
                  className={`${
                    !props.contributor.instagram
                      ? "hidden"
                      : "flex justify-center lg:justify-start items-center gap-x-2"
                  }`}
                >
                  <Link
                    className="flex items-center md:flex-col lg:flex-row text-slate-700 hover:text-theme-primary transition"
                    to={`https://www.instagram.com/${props.contributor.instagram}`}
                  >
                    <FontAwesomeIcon
                      className="text-slate-600 text-3xl md:text-xl lg:text-lg lg:mr-[.65rem] hover:text-slate-500 transition"
                      icon={faInstagram}
                    />
                    <span className="hidden md:inline-block text-sm">@{props.contributor.instagram}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="text-base sm:text-lg mt-6 p-4">
            {renderRichText(props.contributor.shortBio, options)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContributorCard;
