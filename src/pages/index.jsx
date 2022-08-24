import React from "react";
import Heading from "../components/Heading.jsx";
import PostPreview from "../components/PostPreview.jsx";
import { graphql } from "gatsby";

function Home({ data }) {
  const posts = data.allContentfulBlogPost.edges;
  const postPreviews = [];
  const episodeId = "2PbJGxK2fwvxQjXOapiJAk";
  const uri = `spotify:episode:${episodeId}`;

  posts.map(({ node, index }) => {
    postPreviews.push(<PostPreview key={index} post={node} layout="compact" />);
  });

  return (
    <div>
      <Heading
        title={"The Eye Test"}
        subtitle={"Welcome to the official home of The Eye Test Podcast."}
      />
      <div className="flex flex-col gap-y-16">
        {/* Apple Podcast Player */}
        <div>
          {/* <h3 className="text-xl md:text-2xl text-center text-slate-600 mb-4 md:mb-8">
            Listen to The Eye Test Podcast
          </h3> */}
          <iframe
            className="w-full max-w-md mx-auto rounded-sm overflow-hidden"
            src="https://embed.podcasts.apple.com/us/podcast/the-eye-test-podcast/id1611984184?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=auto"
            height="450px"
            frameborder="0"
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            allow="autoplay *; encrypted-media *; clipboard-write"
          ></iframe>
        </div>
        {/* Featured Blog Posts */}
        <div>
          <h3 className="text-xl md:text-2xl text-center text-slate-600 mb-4 md:mb-8">
            Recent Blog Posts
          </h3>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mb-24">
            {postPreviews.slice(0, 3)}
          </div>
        </div>
      </div>
    </div>
  );
}

export const query = graphql`
  query {
    allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
      edges {
        node {
          title
          description {
            raw
          }
          author {
            name
            title
          }
          heroImage {
            url
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: TRACED_SVG
              resizingBehavior: FILL
            )
          }
          slug
          publishDate(formatString: "MMMM Do, YYYY")
        }
      }
    }
  }
`;

export default Home;

export const Head = () => <title>The Eye Test</title>;
