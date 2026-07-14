import { articleContent } from "./articleContent";

import {
  actionSection,
  editorialQuote,
  highlightCallout,
  imageTextSection,
  servicePromotion,
  statisticsSection,
} from "./articleBlocks";

import { author } from "./author";
import { caseStudy } from "./caseStudy";
import { category } from "./category";
import { post } from "./post";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  author,
  category,
  caseStudy,

  highlightCallout,
  statisticsSection,
  imageTextSection,
  editorialQuote,
  actionSection,
  servicePromotion,

  articleContent,
  post,
];