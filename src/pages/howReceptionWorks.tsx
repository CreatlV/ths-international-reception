import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, useStaticQuery } from "gatsby"

const query = graphql`
  query {
    markdownRemark(frontmatter: { type: { eq: "howReceptionWorks-page" } }) {
      html
    }
  }
`

const HowReceptionWorks: React.FC = () => {
  const queryResult = useStaticQuery(query)
  return (
    <Layout>
      <SEO title="HowReceptionWorks" />
      <h1>How Reception Works</h1>
      <div
        dangerouslySetInnerHTML={{ __html: queryResult.markdownRemark.html }}
      />
    </Layout>
  )
}

export default HowReceptionWorks
