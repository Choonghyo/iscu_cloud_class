export function authenticate(request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const encoded = authorization.slice(6);
    const decoded = Buffer.from(encoded, "base64").toString("utf8");

    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) return null;

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    // TODO 1. 관리자 계정 확인
    const isValidAdmin =
      username === "admin" &&
      password === process.env.ADMIN_PASSWORD;

    if (!isValidAdmin) return null;

    return {
      username,
      role: "admin",
    };
  } catch {
    return null;
  }
}