// support for .env, .env.development, and .env.production
require('dotenv').config()
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        downloadLocal: true,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-layout',
    'gatsby-plugin-image',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Maciej Kurbański Page',
        short_name: 'Maciej Kurbański',
        start_url: '/',
        background_color: '#171a1b',
        theme_color: '#41adff',
        icon: 'static/favicon-32x32.png',
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            exportLocalsConvention: 'asIs',
            namedExport: false,
          },
        },
      },
    },
  ],
}
