from collections import defaultdict
import re
import os
import xmltodict

PAGES_PATH = "./src/pages/"
TEMPLATE = """---
templateKey: article
title: "{title}"
date: {date}
author: {author}
language: {language}
wordpressid: {wordpressid}
topic: {topic}
tags:
    - {tags}
---

{content}
"""

LANGUAGE_REGEX = re.compile(r"<!--:([a-z][a-z])-->|\[:([a-z][a-z])\]")


def get_info_by_language(text):
    by_language = {}

    splits = text.split("<!--:-->")
    group_index = 1
    if len(splits) == 1:
        splits = splits[0].split("[:]")
        group_index = 2

    splits = [t for t in splits if t]

    for split in splits:
        language = "fr"
        match = LANGUAGE_REGEX.search(split)
        if match:
            language = match.group(group_index)

        by_language[language] = LANGUAGE_REGEX.sub("", split)

    return by_language


with open("export-2019-03-18.xml", "rb") as f:
    data = xmltodict.parse(f)
    posts = data["data"]["post"]

    print(f"Found {len(posts)} posts")

    for post in posts:
        print("\n-- processing post", post["ID"], post["Title"])

        year = post["Date"][:4]
        month = post["Date"][4:6]
        day = post["Date"][6:8]
        date = year + "-" + month + "-" + day
        author = post["AuthorFirstName"] + " " + post["AuthorLastName"]

        tags = []
        if post["Tags"]:
            tags = post["Tags"].replace("|", "\n    - ")

        if not post["Content"] or not post["Slug"]:
            continue

        languages = defaultdict(lambda: {"content": None, "title": None})

        titles = get_info_by_language(post["Title"])
        contents = get_info_by_language(post["Content"])

        if not set(titles.keys()) == set(contents.keys()):
            print("title and content mismatch")
            print(set(titles.keys()), set(contents.keys()))
            break

        for language in titles.keys():
            md = TEMPLATE.format(
                title=titles[language],
                date=date,
                author=author,
                language=language,
                content=contents[language],
                wordpressid=post["ID"],
                tags=tags,
                topic=post["Categories"],
            )

            folder = PAGES_PATH + language + "/" + year + "/" + month + "/"
            os.makedirs(folder, exist_ok=True)

            with open(folder + post["Slug"] + ".md", "w") as f:
                f.write(md)
