import React from "react";
import Heading from "../../components/Heading.jsx";
import ContributorCard from "../../components/ContributorCard.jsx";
import { graphql } from "gatsby";

function Contributors({ data }) {
  const contributors = data.allContentfulContributor.edges;
  let contributorCards = [];

  {
    contributors.map(({ node, index }) => {
      contributorCards.push(<ContributorCard key={index} contributor={node} />);
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
      <div className="w-full flex flex-col gap-y-16 mb-24">{contributorCards}</div>
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
    }
  }
`;

export default Contributors;

export const Head = () => <title>The Eye Test</title>;
