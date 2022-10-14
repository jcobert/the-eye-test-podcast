const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const blogPost = path.resolve("./src/templates/BlogPost.jsx");
  const contributorProfile = path.resolve("./src/templates/ContributorProfile.jsx");

  const blogPosts = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      reporter.panicOnBuild(
        `There was an error loading your posts`,
        result.errors
      );
      return;
    }
    const posts = result.data.allContentfulBlogPost.nodes;
    if (posts.length > 0) {
      posts.forEach((post, index) => {
        const previousPostSlug = index === 0 ? null : posts[index - 1].slug;
        const nextPostSlug =
          index === posts.length - 1 ? null : posts[index + 1].slug;

        createPage({
          path: `/blog/${post.slug}/`,
          component: blogPost,
          context: {
            slug: post.slug,
            previousPostSlug,
            nextPostSlug,
          },
        });
      });
    }
  });

  const contributorProfiles = await graphql(
    `
      {
        allContentfulContributor {
          nodes {
            name
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      reporter.panicOnBuild(
        `There was an error loading profiles`,
        result.errors
      );
      return;
    }
    const contributors = result.data.allContentfulContributor.nodes;
    if (contributors.length > 0) {
      contributors.forEach((contributor) => {
        createPage({
          path: `/blog/contributors/${contributor.name.toLowerCase().replace(" ", "-")}/`,
          component: contributorProfile,
          context: {
            name: contributor.name,
          },
        });
      });
    }
  });
};
