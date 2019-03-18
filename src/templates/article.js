import React from "react";
import {kebabCase} from "lodash";
import Helmet from "react-helmet";
import {DiscussionEmbed} from "disqus-react";
import {graphql, Link} from "gatsby";
import Layout from "../components/Layout";
import HTMLContent from "../components/HTMLContent";

const Article = ({data}) => {
    const post = data.markdownRemark;
    const disqusShortname = "the-lantern";
    const disqusConfig = {
        identifier: post.wordpressid || post.id,
        title: post.frontmatter.title,
    };
    const tags = post.frontmatter.tags;

    return (
        <Layout>
            <section className="section">
                <Helmet titleTemplate="%s | The Lantern">
                    <title>{`${post.frontmatter.title}`}</title>
                    <meta name="description" content={`${post.frontmatter.excerpt}`} />
                </Helmet>
                <div className="container content">
                    <div className="columns">
                        <div className="column is-10 is-offset-1">
                            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                                {post.title}
                            </h1>
                            <p>By {post.frontmatter.author}</p>
                            <HTMLContent content={post.html} />
                            {tags && tags.length ? (
                                <div style={{marginTop: `4rem`}}>
                                    <h4>Tags</h4>
                                    <ul className="taglist">
                                        {tags.map(tag => (
                                            <li key={tag + `tag`}>
                                                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}

                            <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
                        </div>
                    </div>
                </div>
            </section>
            );
        </Layout>
    );
};

export default Article;

export const pageQuery = graphql`
    query ArticleByID($id: String!) {
        markdownRemark(id: {eq: $id}) {
            id
            html
            excerpt(pruneLength: 400)
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                tags
                author
            }
        }
    }
`;
