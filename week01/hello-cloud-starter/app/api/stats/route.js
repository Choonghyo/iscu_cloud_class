import {getSummaryStats,getTopUrl,getUrlStats,} from "../../../lib/stats";
import { authenticate } from "../../../lib/auth";
import { authorize } from "../../../lib/authorization";

function authenticationRequiredResponse() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
      "Cache-Control": "no-store",
    },
  });
}

function forbiddenResponse() {
  return new Response("Forbidden", {
    status: 403,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function GET(request) {

  const user = authenticate(request);
  if (!user) return authenticationRequiredResponse();
  if (!authorize(user, "stats:read")) return forbiddenResponse();
  
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