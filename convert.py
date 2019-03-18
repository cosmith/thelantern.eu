import os
import xmltodict

PAGES_PATH = "./src/pages/"
TEMPLATE = """---
templateKey: article
title: {title}
date: {date}
author: {author}
language: {language}
wordpressid: {wordpressid}
tags:
    - {tags}
---

{content}
"""

with open("export-2019-03-18.xml", "rb") as f:
    data = xmltodict.parse(f)
    post = data["data"]["post"][1]
    year = post["Date"][:4]
    month = post["Date"][4:6]
    day = post["Date"][6:8]
    date = year + "-" + month + "-" + day
    author = post["AuthorFirstName"] + " " + post["AuthorLastName"]
    tags = post["Tags"].replace("|", "\n    - ")

    language = "fr"  # TODO

    md = TEMPLATE.format(
        title=post["Title"],
        date=date,
        author=author,
        language=language,
        content=post["Content"],
        wordpressid=post["ID"],
        tags=tags,
    )

    folder = PAGES_PATH + language + "/" + year + "/" + month + "/"
    os.makedirs(folder, exist_ok=True)

    with open(folder + post["Slug"] + ".md", "w") as f:
        f.write(md)
