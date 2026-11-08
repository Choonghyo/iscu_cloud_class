import { findUrlByShortCode } from "../../lib/db";
import { recordClick } from "../../lib/stats";

export async function GET(request, { params }) {
  const { shortCode } = await params;
  console.log("5주차 동적 라우트 실행:", shortCode);

  const originalUrl = await findUrlByShortCode(shortCode);

  // 원본 URL이 존재하지 않으면 404 반환
  if (!originalUrl) {
  console.warn("Short URL not found", { shortCode });
  return new Response("Not Found", { status: 404 });
  }

  try {
    await recordClick(shortCode);
  } catch (error) {
    console.error("Failed to record click", { shortCode, error });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: originalUrl,
      "Cache-Control": "no-store",
    },
  });
}