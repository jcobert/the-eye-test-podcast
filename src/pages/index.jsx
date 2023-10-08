import React, { useState } from "react";
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
  faHeadphonesSimple,
} from "@fortawesome/pro-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Timeline } from "react-twitter-widgets";
import { Link } from "gatsby";
import NoResults from "../components/NoResults.jsx";
import TwitterSkeleton from "../components/TwitterSkeleton.jsx";

function Home({ data }) {
  const posts = data.allContentfulBlogPost.edges;
  let postPreviews = [];
  const episodes = data.allSimplecastEpisode.edges;
  let episodePreviews = [];
  let noResults = false;

  const [twitterLoaded, setTwitterLoaded] = useState(false);

  console.log(twitterLoaded);

  if (posts.length === 1) {
    postPreviews = [<NoResults />];
    noResults = true;
  } else {
    posts.map(({ node, index }) => {
      postPreviews.push(
        <PostPreview key={index} post={node} layout="compact" animate={true} />
      );
    });
    postPreviews.shift();
  }

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
      <div className="flex flex-col mb-16 gap-y-20 md:gap-y-24 lg:px-2 md:mb-24">
        <div className="flex flex-col md:gap-x-4 gap-y-16 justify-items-stretch">
          {/* Landing Feature */}
          <div className="rounded border-slate-400">
            <div className="flex flex-col gap-y-4">
              {/* Hero */}
              <div className="flex flex-col w-full md:flex-row md:items-center gap-x-8">
                {/* Graphic */}
                <div className="flex justify-center w-full md:justify-end md:w-6/12">
                  <FontAwesomeIcon
                    icon={faMicrophoneLines}
                    className="text-[5rem] lg:text-[6rem] text-slate-500/90 animate-icon-enter"
                  />
                </div>
                {/* Text */}
                <div className="flex justify-center w-full py-8 mx-auto text-transparent md:justify-start bg-gradient-to-br from-theme-primary/80 to-theme-secondary/80 bg-clip-text">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    pull="left"
                    className="pr-2 -mt-2 text-xl sm:text-2xl lg:text-3xl text-theme-primary/80"
                  />
                  <p className="text-lg text-center sm:text-xl lg:text-2xl">
                    This is The Eye Test Podcast.
                    <br />I am your host, Brian Donovan.
                  </p>
                  <FontAwesomeIcon
                    icon={faQuoteRight}
                    pull="right"
                    className="self-end pl-2 mb-2 text-xl sm:text-2xl lg:text-3xl text-theme-secondary/80"
                  />
                </div>
              </div>
              {/* Featured Content */}
              <div className="flex flex-col self-center w-full mx-auto mt-8 gap-y-4 lg:gap-y-8 md:mt-16">
                <div className="flex justify-center gap-x-8">
                  <span className="block w-4/12 border-b"></span>
                  <FontAwesomeIcon
                    icon={faHeadphonesSimple}
                    className="text-4xl text-slate-500"
                  />
                  <span className="block w-4/12 border-b"></span>
                </div>
                <div className="p-4 border rounded">
                  <h3 className="flex flex-col items-center justify-center mb-6 text-lg text-center text-slate-700 lg:flex-row">
                    <span>Listen to Brian's feature on</span>
                    <span className="italic text-slate-900 lg:ml-1">
                      Talkin Mets with Mike Silva
                    </span>
                  </h3>
                  <iframe
                    allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                    frameborder="0"
                    height="190"
                    className="w-full max-w-lg mx-auto overflow-hidden bg-transparent animate-slow-fade-in"
                    sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                    src="https://embed.podcasts.apple.com/us/podcast/part-2-talkin-mets-postmortem-panel/id271866252?i=1000582814244"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Episode Feature */}
        <div className="w-full">
          <h3 className="mb-4 text-3xl text-center lg:text-left text-slate-600 font-optician lg:mb-8">
            Latest Episodes
          </h3>
          {/* Episodes Grid */}
          <div className="grid w-full grid-cols-1 pt-4 mb-4 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8">
            {episodePreviews.slice(0, 3)}
            {/* Link to Episodes Page */}
            <div className="flex items-center justify-center xl:col-start-2">
              <Link
                key={"more-episodes"}
                to={"/episodes"}
                className={
                  "w-full md:w-48 text-lg text-theme-primary hover:text-slate-500 bg-slate-50 border border-slate-400 hover:border-slate-500 px-6 py-2 rounded transition"
                }
              >
                <div className="flex items-center justify-center gap-x-2">
                  <span>More episodes</span>
                  <FontAwesomeIcon icon={faAngleRight} className="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Featured Blog Posts */}
        <div className="w-full">
          <h3 className="mb-4 text-3xl text-center lg:text-left text-slate-600 font-optician lg:mb-8">
            Recent Blog Posts
          </h3>
          {/* Posts Grid */}
          <div
            className={
              noResults
                ? "block"
                : "w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-8 mb-4"
            }
          >
            {postPreviews.slice(0, 3)}
            {/* Link to Blog Page */}
            <div
              className={`${
                noResults
                  ? "hidden"
                  : "flex justify-center xl:col-start-2 items-center"
              }`}
            >
              <Link
                key={"more-posts"}
                to={"/blog"}
                className={
                  "w-full md:w-48 text-lg text-theme-primary hover:text-slate-500 bg-slate-50 border border-slate-400 hover:border-slate-500 px-6 py-2 rounded transition"
                }
              >
                <div className="flex items-center justify-center gap-x-2">
                  <span>More posts</span>
                  <FontAwesomeIcon icon={faAngleRight} className="" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* Twitter Feed */}
        <div className="flex justify-center gap-x-8">
          <span className="block w-4/12 border-b"></span>
          <FontAwesomeIcon
            icon={faTwitter}
            className="text-4xl text-slate-500"
          />
          <span className="block w-4/12 border-b"></span>
        </div>
        <div className="w-full max-w-xl mx-auto -mt-8 max-h-[505px] overflow-auto rounded-xl">
          <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: "DonoPodcast",
            }}
            options={{
              tweetLimit: 3,
              height: 500,
            }}
            onLoad={() => setTwitterLoaded(true)}
          />
          {!twitterLoaded && <TwitterSkeleton count={3} height="500px" />}
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
            twitter
            instagram
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
