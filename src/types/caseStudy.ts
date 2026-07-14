export type VerifiedResult = {
  _key?: string;
  value: string;
  label: string;
};

export type CaseStudy = {
  _id: string;
  title: string;
  slug: string;
  displayName: string;
  engagement: string;
  sector: string;
  location: string;
  summary: string;
  challenge: string;
  intervention: string;
  businessValue: string;
  outputs: string[];
  verifiedResults?: VerifiedResult[];
  featuredOnHomepage?: boolean;
  homepageOrder?: number;
  displayOrder?: number;
  publishedAt?: string;
};