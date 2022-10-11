import React from "react";
import Heading from "../components/Heading.jsx";
import AuthorProfile from "../components/AuthorProfile.jsx";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/pro-regular-svg-icons";

function Authors({ data }) {
  const authors = data.allContentfulContributor.edges;
  let authorCards = [];

  {
    authors.map(({ node, index }) => {
      authorCards.push(<AuthorProfile key={index} author={node} />);
    });
  }

  return (
    <div>
      <div className="">
        <Heading
          title={"Contributors"}
          subtitle={"Meet the contributors to The Eye Test blog."}
        />
      </div>
      <div className="w-full flex flex-col gap-y-16 mb-24">{authorCards}</div>
    </div>
  );
}

export const query = graphql`
  query {
    allContentfulContributor(sort: { fields: name, order: ASC }) {
      edges {
        node {
          twitter
          title
          shortBio {
            raw
          }
          name
          facebook
          email
          company
          image {
            gatsbyImageData(
              layout: CONSTRAINED
              cornerRadius: 9999
              width: 100
              cropFocus: CENTER
              height: 100
              resizingBehavior: FILL
              placeholder: TRACED_SVG
            )
          }
        }
      }
    }
  }
`;

export default Authors;

export const Head = () => <title>The Eye Test</title>;
