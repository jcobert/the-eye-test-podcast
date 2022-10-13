import React from "react";
import { graphql } from "gatsby";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";

function AuthorProfile({ data }) {
  const author = data.contentfulContributor;
  const avatar = getImage(author.image);

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

  return (
    <div className="flex flex-col">
      <div className="w-full md:max-w-2xl mx-auto flex-1">
        {/* Body */}
        <div className="p-6 rounded border flex flex-col justify-between">
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
              <h4 className="font-medium text-3xl text-transparent bg-clip-text bg-gradient-to-r from-theme-primary/95 to-[#4465be]/95">
                {author.name}
              </h4>
              <h6 className="text-slate-700">{author.title}</h6>
              <div
                className={`${
                  !author.twitter
                    ? "hidden"
                    : "flex justify-center lg:justify-start items-center gap-x-2 mt-2"
                }`}
              >
                <FontAwesomeIcon className="text-slate-600" icon={faTwitter} />
                <span className="text-slate-700">{author.twitter}</span>
              </div>
            </div>
          </div>
          {/* Bio */}
          <div className="text-base sm:text-lg mt-6 p-4">
            {renderRichText(author.shortBio, options)}
          </div>
        </div>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query AuthorByName($name: String!) {
    contentfulContributor(name: { eq: $name }) {
      twitter
      title
      shortBio {
        raw
      }
      name
      email
      company
      image {
        gatsbyImageData(
          layout: CONSTRAINED
          cornerRadius: 9999
          width: 600
          cropFocus: CENTER
          height: 600
          resizingBehavior: FILL
          placeholder: TRACED_SVG
        )
      }
    }
  }
`;

export default AuthorProfile;

export const Head = () => <title>The Eye Test</title>;
