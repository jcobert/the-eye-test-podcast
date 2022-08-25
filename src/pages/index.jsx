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
      <div className="flex flex-col gap-y-16 md:gap-y-20 lg:gap-y-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-x-4 gap-y-16 justify-items-stretch">
          {/* Apple Podcast Player */}
          <div className="md:col-start-2 lg:col-start-3 lg:col-span-3">
            {/* <h3 className="text-xl md:text-2xl text-center lg:text-left text-slate-600 mb-4 lg:mb-8">
              Catch Up on the Latest Episodes
            </h3> */}
            <iframe
              className="w-full max-w-3xl mx-auto border border-slate-400 shadow rounded-sm overflow-hidden"
              src="https://embed.podcasts.apple.com/us/podcast/the-eye-test-podcast/id1611984184?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=auto"
              height="452px"
              width="650px"
              frameborder="0"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
              allow="autoplay *; encrypted-media *; clipboard-write"
            ></iframe>
          </div>
          {/* Placeholder */}
          <div className="col-start-1 col-span-1 lg:col-span-2 row-start-1">
            {/* <h3 className="text-xl md:text-2xl text-center lg:text-left text-slate-600 mb-4 lg:mb-8">
              Placeholder
            </h3> */}
            <div className="border border-slate-400">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                nec ante id ligula rutrum blandit. Nunc blandit vehicula congue.
                Cras luctus, neque nec sodales euismod, mi ipsum facilisis ex,
                non lacinia nunc felis sit amet neque. Aliquam a libero enim.
                Aliquam magna odio, gravida eget blandit a, convallis non
                mauris. Fusce ultricies nisi suscipit consequat ornare. Nullam
                scelerisque libero a augue consectetur, ac commodo massa
                suscipit.
              </p>
            </div>
          </div>
        </div>
        {/* Featured Blog Posts */}
        <div className="w-full col-span-full">
          <h3 className="text-xl md:text-2xl text-center lg:text-left text-slate-600 mb-4 lg:mb-8">
            Recent Blog Posts
          </h3>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 mb-24">
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
