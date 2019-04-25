import React from "react";
import {Link, graphql, StaticQuery} from "gatsby";

class ArticleRoll extends React.Component {
    render() {
        const {data} = this.props;
        const {edges: posts} = data.allMarkdownRemark;

        return (
            <div className="columns is-multiline">
                {posts &&
                    posts.map(({node: post}) => (
                        <div className="is-parent column is-6" key={post.id}>
                            <article className="tile is-child">
                                <p>
                                    <Link
                                        className="title has-text-primary is-size-4 is-block"
                                        to={post.fields.slug}
                                    >
                                        {post.frontmatter.title}
                                    </Link>
                                </p>
                                <p>
                                    {post.excerpt}
                                    <br />
                                </p>

                                <p>
                                    Par <b>{post.frontmatter.author}</b> &bull;{" "}
                                    {post.frontmatter.date}
                                </p>
                            </article>
                        </div>
                    ))}
            </div>
        );
    }
}

export default () => (
    <StaticQuery
        query={graphql`
            query ArticleRollQuery {
                allMarkdownRemark(
                    sort: {order: DESC, fields: [frontmatter___date]}
                    filter: {frontmatter: {templateKey: {eq: "article"}}}
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                            }
                            frontmatter {
                                title
                                templateKey
                                date(formatString: "DD/MM/YYYY")
                                author
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => <ArticleRoll data={data} count={count} />}
    />
);
