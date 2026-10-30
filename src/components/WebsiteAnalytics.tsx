"use client";

import { Analytics } from "@vercel/analytics/next";

export default function WebsiteAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url);

        // Keep private ticket links and payment/admin activity out of reports.
        if (
          /^\/ebbc2026\/(ticket|paybill|payment-admin|scanner)(\/|$)/.test(url.pathname) ||
          url.pathname.startsWith("/ebbc2026/tickets/payment-result")
        ) {
          return null;
        }

        // Keep campaign attribution without sending order references or other inputs.
        for (const key of [...url.searchParams.keys()]) {
          if (!/^utm_(source|medium|campaign|content|term)$/.test(key)) {
            url.searchParams.delete(key);
          }
        }
        url.hash = "";

        return { ...event, url: url.toString() };
      }}
    />
  );
}
