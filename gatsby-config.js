module.exports = {
  siteMetadata: {
    title: `zaak.codes`,
    name: `zaak.codes`,
    siteUrl: `https://zaak.netlify.app`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Welcome to zaak.codes`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/alexander_zaak`,
      },
      {
        name: `github`,
        url: `https://github.com/alexzaak`,
      },
      {
        name: `instagram`,
        url: `https://instagram.com/zaak.codes`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/alexander-zaak/`,
      },
      {
        name: `website`,
        url: `https://zaak.codes`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `zaak.codes`,
        short_name: `zaak.codes`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
    {
      resolve: `gatsby-plugin-netlify-identity-widget`,
      options: {
      },
    },
    {
      resolve: `gatsby-source-unsplash`,
      options: {
        appId: `${process.env.UNSPLASH_API_KEY}`,
        collections: [
          `71647489`
        ],
        // optional: will only get page 1, so increase this count to include > 10 photos
        perPage: `100`
      },
    },
  ],
};
