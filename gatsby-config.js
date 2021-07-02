module.exports = {
  siteMetadata: {
    title: `Zaak.Codes`,
    name: `Zaak.Codes`,
    siteUrl: `https://zaak.netlify.app`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Welcome to Zaak.Codes`,
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
        name: `xing`,
        url: `https://www.xing.com/profile/Alexander_Zaak`,
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
          //contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Zaak.Codes`,
        short_name: `Zaak.Codes`,
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
        appId: `12345678`,
        collections: [
          `098765`
        ],
        // optional: will only get page 1, so increase this count to include > 10 photos
        perPage: `100`
      },
    },
  ],
};
