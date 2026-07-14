import type { CaseStudy } from "@/types/caseStudy";

export const fallbackCaseStudies: CaseStudy[] = [
  {
    _id: "bonnke-staff-assessment",

    slug:
      "staff-assessment-management-priorities",

    displayName:
      "Established Salon Team — Nairobi",

    title:
      "Turning Staff Feedback into Management Priorities",

    engagement:
      "Staff Assessment",

    sector:
      "People & Performance",

    location:
      "Nairobi",

    summary:
      "A structured assessment helped management organise staff feedback, identify recurring performance concerns and define clearer team-development priorities.",

    challenge:
      "Management needed a clearer view of staff experience, service consistency and development gaps across a 64-person workforce covering senior stylists, junior stylists, nail technicians and trainees.",

    intervention:
      "Salons Assured designed and conducted a staff assessment using random sampling across the different team categories. The findings were organised into practical themes covering performance, service delivery, communication and staff-development needs.",

    businessValue:
      "The engagement created an evidence-based starting point for targeted training, clearer management conversations and more consistent expectations across the team.",

    outputs: [
      "Staff assessment framework",
      "Cross-category staff sampling",
      "Findings and management priorities",
      "Training recommendations",
    ],

    featuredOnHomepage: true,
    homepageOrder: 1,
    displayOrder: 1,
  },

  {
    _id: "nadra-business-systems",

    slug:
      "complete-beauty-business-documentation-system",

    displayName:
      "Multi-Department Salon Business — Kenya",

    title:
      "Building a Complete Business Documentation System",

    engagement:
      "Business Systems",

    sector:
      "Systems & Governance",

    location:
      "Kenya",

    summary:
      "A coordinated documentation programme brought HR, leadership and operating requirements into one structured business system.",

    challenge:
      "The business required a clearer operating framework so important HR, administrative, leadership and service standards were documented rather than depending on informal instructions or individual memory.",

    intervention:
      "Salons Assured developed a coordinated suite of HR and administration documents, CEO and leadership documents, operating procedures, templates and management controls tailored to the salon environment.",

    businessValue:
      "The completed documentation provided management with a more consistent reference point for onboarding, accountability, decision-making and day-to-day operations.",

    outputs: [
      "HR and administration documents",
      "CEO and leadership documents",
      "Operational procedures",
      "Management templates and controls",
    ],

    featuredOnHomepage: true,
    homepageOrder: 2,
    displayOrder: 2,
  },

  {
    _id: "taiyari-premium-structure",

    slug:
      "premium-salon-operating-structure",

    displayName:
      "Premium Beauty Salon — Kenya",

    title:
      "Structuring a Premium Salon for Consistent Delivery",

    engagement:
      "Business Systems",

    sector:
      "Premium Operations",

    location:
      "Kenya",

    summary:
      "Premium business positioning was translated into practical management, service and people systems designed for consistent execution.",

    challenge:
      "The salon needed operational documents and management standards that matched a premium market position instead of relying on basic or generic salon templates.",

    intervention:
      "Salons Assured created premium salon systems covering leadership oversight, professional conduct, service standards, customer experience, team accountability and daily management controls.",

    businessValue:
      "The engagement provided a stronger operational foundation for protecting service standards, guiding employees and supporting a more consistent premium client experience.",

    outputs: [
      "Premium operating standards",
      "Leadership oversight documents",
      "Service and conduct guidelines",
      "Management control tools",
    ],

    featuredOnHomepage: true,
    homepageOrder: 3,
    displayOrder: 3,
  },

  {
    _id: "next-level-governance",

    slug:
      "leadership-governance-structure",

    displayName:
      "Salon & Grooming Business — Kenya",

    title:
      "Strengthening Leadership and Governance",

    engagement:
      "Leadership & Governance",

    sector:
      "Leadership & Accountability",

    location:
      "Kenya",

    summary:
      "Leadership responsibilities were translated into practical documents that clarified oversight, accountability and business control.",

    challenge:
      "The business required clearer separation between ownership, leadership and daily management responsibilities as operations became more demanding.",

    intervention:
      "Salons Assured developed leadership and governance documents covering executive responsibilities, management reporting, accountability, decision-making and business oversight.",

    businessValue:
      "The work provided leaders with clearer reference points for managing performance, reviewing operations and maintaining control as the business develops.",

    outputs: [
      "Executive responsibility documents",
      "Management reporting structure",
      "Governance and accountability tools",
      "Leadership review templates",
    ],

    featuredOnHomepage: false,
    displayOrder: 4,
  },

  {
    _id: "barberians-controls",

    slug:
      "management-operational-controls",

    displayName:
      "Barbershop & Spa Business — Kenya",

    title:
      "Creating Clearer Management and Operational Controls",

    engagement:
      "Business Systems",

    sector:
      "Operations & Management",

    location:
      "Kenya",

    summary:
      "Operational and leadership documentation was organised to support clearer management routines and more consistent business control.",

    challenge:
      "The business needed documented management processes that could guide staff, support service consistency and reduce dependence on verbal instructions.",

    intervention:
      "Salons Assured organised leadership, management and operating requirements into practical documents, procedures, checklists and accountability tools suited to a barbershop and spa environment.",

    businessValue:
      "The resulting system gave management a clearer structure for communicating standards, assigning responsibility and reviewing daily operations.",

    outputs: [
      "Management procedures",
      "Operational checklists",
      "Accountability documents",
      "Service-standard guidance",
    ],

    featuredOnHomepage: false,
    displayOrder: 5,
  },

  {
    _id: "femilux-brand-systems",

    slug:
      "brand-aligned-business-systems",

    displayName:
      "Premium Beauty Brand — Kenya",

    title:
      "Aligning Business Systems with a Premium Brand",

    engagement:
      "Business Systems",

    sector:
      "Brand & Operations",

    location:
      "Kenya",

    summary:
      "Business documentation was developed around the brand’s premium identity, management requirements and service expectations.",

    challenge:
      "The business required professional documents that supported its operating needs while remaining aligned with a distinctive premium brand identity.",

    intervention:
      "Salons Assured created business, leadership and operational documents using language, structure and standards appropriate for the brand’s positioning and intended client experience.",

    businessValue:
      "The engagement provided a more coherent set of tools for management, employee guidance and consistent delivery without disconnecting operations from the brand promise.",

    outputs: [
      "Brand-aligned operating documents",
      "Leadership and management tools",
      "Employee guidance documents",
      "Premium service standards",
    ],

    featuredOnHomepage: false,
    displayOrder: 6,
  },
];

export function getFeaturedFallbackCaseStudies() {
  return fallbackCaseStudies
    .filter(
      (study) =>
        study.featuredOnHomepage,
    )
    .sort(
      (first, second) =>
        (first.homepageOrder || 99) -
        (second.homepageOrder || 99),
    )
    .slice(0, 3);
}