import "server-only";
import { cache } from "react";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export type AnalyticsSummary =
  | { status: "not_configured" }
  | { status: "error" }
  | {
      status: "ok";
      activeUsers: number;
      sessions: number;
      pageViews: number;
      topPages: { path: string; views: number }[];
    };

function getClient() {
  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_ANALYTICS_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
  });
}

/** Last-28-days summary from the GA4 Data API. Cached per request. */
export const getAnalyticsSummary = cache(async (): Promise<AnalyticsSummary> => {
  const propertyId = process.env.GA_PROPERTY_ID;
  if (
    !propertyId ||
    !process.env.GOOGLE_ANALYTICS_CLIENT_EMAIL ||
    !process.env.GOOGLE_ANALYTICS_PRIVATE_KEY
  ) {
    return { status: "not_configured" };
  }

  try {
    const client = getClient();
    const property = `properties/${propertyId}`;
    const dateRanges = [{ startDate: "28daysAgo", endDate: "today" }];

    const [[summary], [topPagesReport]] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
    ]);

    const row = summary.rows?.[0];
    return {
      status: "ok",
      activeUsers: Number(row?.metricValues?.[0]?.value ?? 0),
      sessions: Number(row?.metricValues?.[1]?.value ?? 0),
      pageViews: Number(row?.metricValues?.[2]?.value ?? 0),
      topPages: (topPagesReport.rows ?? []).map((r) => ({
        path: r.dimensionValues?.[0]?.value ?? "",
        views: Number(r.metricValues?.[0]?.value ?? 0),
      })),
    };
  } catch (err) {
    console.error("Google Analytics fetch failed", err);
    return { status: "error" };
  }
});
