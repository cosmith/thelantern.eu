import React from "react";
import ArticleTemplate from "../../templates/article";

const ArticlePreview = ({entry, widgetFor}) => (
    <ArticleTemplate
        title={entry.getIn(["data", "title"])}
        image={entry.getIn(["data", "image"])}
        author={entry.getIn(["data", "author"])}
        content={widgetFor("body")}
        tags={entry.getIn(["data", "tags"])}
    />
);

export default ArticlePreview;
