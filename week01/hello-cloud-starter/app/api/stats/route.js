import {
  getSummaryStats,
  getTopUrl,
  getUrlStats,
} from "../../../lib/stats";

export async function GET() {
  try {
    const summary = await getSummaryStats();
    const topUrl = await getTopUrl();
    const urls = await getUrlStats();

    return Response.json({
      summary: {
        ...summary,
        topUrl,
      },
      urls,
    });
  } catch (error) {
    console.error("Failed to fetch stats", error);

    return Response.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}