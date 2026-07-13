import {articleContent} from "./articleContent";

import {
  actionSection,
  editorialQuote,
  highlightCallout,
  imageTextSection,
  servicePromotion,
  statisticsSection,
} from "./articleBlocks";

import {author} from "./author";
import {category} from "./category";
import {post} from "./post";
import {siteSettings} from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  author,
  category,

  highlightCallout,
  statisticsSection,
  imageTextSection,
  editorialQuote,
  actionSection,
  servicePromotion,

  articleContent,
  post,
];