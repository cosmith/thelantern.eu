import CMS, {init} from "netlify-cms";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import ArticlePreview from "./preview-templates/ArticlePreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";

// To test locally
// init({
//     config: {
//         backend: {
//             name: "test-repo",
//         },
//     },
// });

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("article", ArticlePreview);
