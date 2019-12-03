
const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions

    return new Promise((resolve, reject) => {
        const portfolioEntry = path.resolve('./src/templates/portfolio-entry.js')
        resolve(
            graphql(
                `
                    {
                        allContentfulPortfolioProject(filter: { node_locale: {eq: "en-US"} }) {
                            edges {
                                node {
                                    title
                                    slug
                                }
                            }
                        }
                    }
                `
            ).then(result => {
                if (result.errors) {
                    console.log(result.errors)
                    reject(result.errors)
                }

                const posts = result.data.allContentfulPortfolioProject.edges
                posts.forEach((post, index) => {
                    createPage({
                        path: `/portfolio-entry/${post.node.slug}/`,
                        component: portfolioEntry,
                        context: {
                            slug: post.node.slug
                        },
                    })
                })
            })
        )
        resolve();
    })
}
