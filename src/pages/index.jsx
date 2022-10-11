import React from "react";
import Heading from "../components/Heading.jsx";
import PostPreview from "../components/PostPreview.jsx";
import EpisodePreview from "../components/EpisodePreview.jsx";
import { graphql } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneLines,
  faQuoteLeft,
  faQuoteRight,
  faAngleRight,
} from "@fortawesome/pro-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Timeline } from "react-twitter-widgets";
import { Link } from "gatsby";

function Home({ data }) {
  const posts = data.allContentfulBlogPost.edges;
  const postPreviews = [];
  const episodes = data.allSimplecastEpisode.edges;
  const episodePreviews = [];

  posts.map(({ node, index }) => {
    postPreviews.push(
      <PostPreview key={index} post={node} layout="compact" animate={true} />
    );
  });

  let recentCount = 0;
  episodes.map(({ node, index }) => {
    let isNew = false;
    if (node.daysSinceRelease < 8 && recentCount < 1) {
      isNew = true;
      recentCount++;
    }
    episodePreviews.push(
      <EpisodePreview key={index} node={node} new={isNew} animate={true} />
    );
  });

  return (
    <div>
      <Heading
        title={"The Eye Test"}
        subtitle={"Welcome to the official home of The Eye Test Podcast."}
      />
      <div className="flex flex-col gap-y-20 md:gap-y-24 lg:px-2 mb-16 md:mb-24">
        <div className="flex flex-col md:gap-x-4 gap-y-16 justify-items-stretch">
          {/* Landing Feature */}
          <div className="rounded p-2 lg:p-4 border-slate-400">
            <div className="flex flex-col lg:flex-row gap-y-4">
              {/* Hero */}
              <div className="w-full flex flex-col md:flex-row md:items-center lg:flex-col">
                {/* Graphic */}
                <div className="w-full md:w-7/12 lg:w-full justify-end">
                  <FontAwesomeIcon
                    icon={faMicrophoneLines}
                    className="text-[5rem] lg:text-[6rem] text-slate-700 mx-auto w-full"
                  />
                </div>
                {/* Text */}
                <div className="flex justify-center md:justify-start lg:justify-center w-full md:w-11/12 lg:w-10/12 mx-auto py-8 text-slate-700">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    pull="left"
                    className="text-xl sm:text-2xl lg:text-3xl text-slate-400 pr-2 -mt-2"
                  />
                  <p className="text-lg sm:text-xl lg:text-2xl text-center">
                    This is The Eye Test Podcast.
                    <br />I am your host, Brian Donovan.
                  </p>
                  <FontAwesomeIcon
                    icon={faQuoteRight}
                    pull="right"
                    className="text-xl sm:text-2xl lg:text-3xl text-slate-400 pl-2 mb-2 self-end"
                  />
                </div>
              </div>
              {/* Placeholder Blurb */}
              {/* <div className="w-full flex flex-col self-center gap-y-4 lg:gap-y-8 mt-2 md:mt-10 lg:mt-0 px-2 md:px-10 lg:px-2">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam nec ante id ligula rutrum blandit. Nunc blandit
                  vehicula congue. Cras luctus, neque nec sodales euismod.
                </p>
                <p>
                  Aliquam a libero enim. Aliquam magna odio, gravida eget
                  blandit a, convallis non mauris. Fusce ultricies nisi suscipit
                  consequat ornare.
                </p>
              </div> */}
            </div>
          </div>
        </div>
        {/* Episode Feature */}
        <div className="w-full">
          <h3 className="text-3xl text-center lg:text-left text-slate-600 font-optician mb-4 lg:mb-8">
            Latest Episodes
          </h3>
          {/* Episodes Grid */}
          <div className="w-full pt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 mb-4">
            {episodePreviews.slice(0, 3)}
            {/* Link to Episodes Page */}
            <div className="flex justify-center xl:col-start-2 items-center">
              <Link
                key={"more-episodes"}
                to={"/episodes"}
                className={
                  "w-full md:w-48 text-lg text-theme-primary hover:text-slate-500 bg-slate-50 border border-slate-400 hover:border-slate-500 px-6 py-2 rounded transition"
                }
              >
                <div className="flex items-center gap-x-2 justify-center">
                  <span>More episodes</span>
                  <FontAwesomeIcon icon={faAngleRight} className="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Featured Blog Posts */}
        <div className="w-full">
          <h3 className="text-3xl text-center lg:text-left text-slate-600 font-optician mb-4 lg:mb-8">
            Recent Blog Posts
          </h3>
          {/* Posts Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 mb-4">
            {postPreviews.slice(0, 3)}
            {/* Link to Blog Page */}
            <div className="flex justify-center xl:col-start-2 items-center">
              <Link
                key={"more-posts"}
                to={"/blog"}
                className={
                  "w-full md:w-48 text-lg text-theme-primary hover:text-slate-500 bg-slate-50 border border-slate-400 hover:border-slate-500 px-6 py-2 rounded transition"
                }
              >
                <div className="flex items-center gap-x-2 justify-center">
                  <span>More posts</span>
                  <FontAwesomeIcon icon={faAngleRight} className="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Twitter Feed */}
        <div className="flex gap-x-8 justify-center">
          <span className="block w-4/12 border-b"></span>
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-6xl text-slate-500"
          />
          <span className="block w-4/12 border-b"></span>
        </div>
        <div className="w-full max-w-xl mx-auto">
          <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: "DonoPodcast",
            }}
            options={{
              tweetLimit: 3,
            }}
          />
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
    allSimplecastEpisode(sort: { order: DESC, fields: publishedAt }) {
      edges {
        node {
          simplecastId
          slug
          enclosureUrl
          number
          publishedAt(formatString: "MMMM D, Y")
          daysSinceRelease
          title
          description
          image {
            childImageSharp {
              fixed(width: 300) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
`;

export default Home;

export const Head = () => <title>The Eye Test</title>;
