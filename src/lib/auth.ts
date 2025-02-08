import { NextRequest } from "next/server";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: "worldcoin",
      name: "Worldcoin",
      type: "oauth",
      wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
      authorization: { params: { scope: "openid" } },
      clientId: process.env.WLD_CLIENT_ID,
      clientSecret: process.env.WLD_CLIENT_SECRET,
      idToken: true,
      checks: ["state", "nonce", "pkce"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.sub,
          verified: true,
          verificationLevel:
            profile["https://id.worldcoin.org/v1"].verification_level,
        };
      },
    },
  ],
  pages: {
    signIn: "/signin",
    signOut: "/signin",
    error: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.verified = user.verified;
        token.verificationLevel = user.verificationLevel;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.verified = token.verified;
        session.user.verificationLevel = token.verificationLevel;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

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

export function getWorldToken(request: NextRequest): string | null {
  return (
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    null
  );
}
