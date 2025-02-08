import {
  verifyCloudProof,
  IVerifyResponse,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { getCookieFromHeader } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";

interface IRequestPayload {
  payload: ISuccessResult;
  action: string;
  signal: string | undefined;
}

export async function POST(req: NextRequest) {
  const { payload, action, signal } = (await req.json()) as IRequestPayload;
  const app_id = process.env.APP_ID as `app_${string}`;
  const verifyRes = (await verifyCloudProof(
    payload,
    app_id,
    action,
    signal
  )) as IVerifyResponse; // Wrapper on this

  console.log(verifyRes);

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database

    // we need to update the wallet address with the verified user and the setcookie of wallet address
    const walletAddress = getCookieFromHeader(
      "wallet_address",
      headers().get("cookie")
    );
    const userId = getCookieFromHeader("user_id", headers().get("cookie"));

    console.log({ walletAddress }, { userId });
    console.log({ verifyRes });

    // if (walletAddress && userId) {
    //   await db
    //     .update(users)
    //     .set({
    //       updated_at: new Date().toISOString(),
    //     })
    //     .where(eq(users.id, userId));
    // } else {
    //   return NextResponse.json({ verifyRes, status: 400 });
    // }

    return NextResponse.json({ verifyRes, status: 200 });
  } else {
    // This is where you should handle errors from the World ID /verify endpoint.
    // Usually these errors are due to a user having already verified.
    return NextResponse.json({ verifyRes, status: 400 });
  }
}
