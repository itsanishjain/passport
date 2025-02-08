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

export function deleteCookies() {
  // List of cookies to delete
  const cookies = [
    "user_type",
    "user_id",
    "wallet_address",
    // Add any other cookies that need to be deleted
  ];

  cookies.forEach((cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}
