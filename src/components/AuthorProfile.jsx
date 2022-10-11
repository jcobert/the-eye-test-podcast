import React from "react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

function AuthorProfile(props) {
  const avatar = getImage(props.author.image);

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
        <div className="p-6 bg-slate-50 rounded border border-slate-400 flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row">
            {/* Avatar */}
            <GatsbyImage
              image={avatar}
              alt="author photo"
              className="w-32 mx-auto rounded-full shadow"
              imgClassName="rounded-full border-2 border-slate-300"
              placeholder="tracedSVG"
              objectFit="contain"
            />
            {/* Name */}
            <div className="text-center lg:text-left lg:ml-4 flex-auto">
              <h4 className="font-medium text-theme-primary text-3xl">
                {props.author.name}
              </h4>
              <h6 className="text-slate-700">{props.author.title}</h6>
              <div
                className={`${
                  !props.author.twitter
                    ? "hidden"
                    : "flex justify-center lg:justify-start items-center gap-x-2 mt-2"
                }`}
              >
                <FontAwesomeIcon className="text-slate-600" icon={faTwitter} />
                <span className="text-slate-700">{props.author.twitter}</span>
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="text-base sm:text-lg mt-6 p-4">
            {renderRichText(props.author.shortBio, options)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
