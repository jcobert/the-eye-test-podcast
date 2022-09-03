require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `The Eye Test Podcast`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/.*\.svg/,
        },
      },
    },
    {
      resolve: "@sergeysova/gatsby-source-simplecast",
      options: {
        token: process.env.SIMPLECAST_TOKEN,
        podcastId: "a66d9758-9ee4-4c63-b480-f723d5a13d47",
      },
    },
  ],
};
