import { NextRequest } from "next/server";

export function getWalletAddress(request: NextRequest): string | null {
  return request.headers.get("x-wallet-address");
}

export function getCookieFromHeader(
  cookieName: string,
  headers: string | null
): string | null {
  if (!headers) return null;

  const cookie = headers
    .split("; ")
    .find((row) => row.startsWith(`${cookieName}=`))
    ?.split("=")[1];

  return cookie ? decodeURIComponent(cookie) : null;
}
