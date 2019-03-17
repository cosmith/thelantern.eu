import React from "react";
import {BlogPostTemplate} from "../../templates/blog-post";

const BlogPostPreview = ({entry, widgetFor}) => (
    <BlogPostTemplate
        content={widgetFor("body")}
        author={entry.getIn(["data", "author"])}
        tags={entry.getIn(["data", "tags"])}
        title={entry.getIn(["data", "title"])}
    />
);

export default BlogPostPreview;
