import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import ImageLoader from "../components/ImageLoader"
import styled from "styled-components"
import Markdown from "react-markdown"
import PaginationLinks from "../components/PaginationLinks"

const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "news" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 4
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            type
            title
            description
            thumbnail
            preview
            date
          }
        }
      }
    }
  }
`
const Title = styled.div`
  margin: 1rem 0 0 0;
  width: 100%;

  font-size: 25px;
  font-family: "Open Sans", sans-serif;
`
const Date = styled.div`
  margin: 1rem 0 0 0;
  width: 100%;

  font-size: 15px;
  font-family: "Open Sans", sans-serif;
  color: rgba(61, 45, 45, 0.6);
`
const Content = styled.div`
  margin: 1rem 0 0 0;
  width: 100%;

  font-size: 17px;
  font-family: "Roboto", sans-serif;
`
const Box = styled.div`
  width:100%;
  max-height: 700px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  display: inline-block;
  `

const News: React.FC = () => {
  const quer = useStaticQuery(query).allMarkdownRemark
  const data = quer.edges
  const postsPerPage = 4
  let numberOfPages
  return (
    <Layout>
      <SEO title="News" />
      {data.map(items => {
        numberOfPages = Math.ceil(quer.totalCount / postsPerPage)
        const { thumbnail, title, description, date } = items.node.frontmatter
        return (
          <div id={date}>
            <Title>{title}</Title>
            <Date>{date}</Date>
            <Box>
              <ImageLoader filename={thumbnail.substring(3)} />
            </Box>
            <Content>
              <Markdown source={description} />
            </Content>
            <hr />
          </div>
        )
      })}
      <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
    </Layout>
  )
}

export default News
