import InsightsEventsClient, {
  type HomeInsight,
} from "@/components/InsightsEventsClient";

import { client } from "@/sanity/lib/client";
import { HOME_INSIGHTS_QUERY } from "@/sanity/lib/homepageQueries";

const fetchOptions = {
  next: {
    revalidate: 60,
  },
};

export default async function InsightsEvents() {
  let insights: HomeInsight[] = [];

  try {
    insights = await client.fetch<HomeInsight[]>(
      HOME_INSIGHTS_QUERY,
      {},
      fetchOptions,
    );
  } catch {
    insights = [];
  }

  return (
    <InsightsEventsClient
      insights={insights}
    />
  );
}