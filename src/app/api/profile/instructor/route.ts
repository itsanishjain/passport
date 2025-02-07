import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { instructorProfiles, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { InstructorProfileSchema } from "@/lib/types/profile-api";
import { getCookieFromHeader, getWalletAddress } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const walletAddress = getCookieFromHeader(
      "wallet_address",
      headers().get("cookie")
    );

    console.log({ walletAddress });
    if (!walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const body = InstructorProfileSchema.parse(json);

    const user = await db.query.users.findFirst({
      where: eq(users.wallet_address, walletAddress),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = await db.insert(instructorProfiles).values({
      id: crypto.randomUUID(),
      user_id: user.id,
      ...body,
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[CREATE_INSTRUCTOR_PROFILE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const walletAddress = getWalletAddress(request);
    if (!walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const body = InstructorProfileSchema.parse(json);

    const user = await db.query.users.findFirst({
      where: eq(users.wallet_address, walletAddress),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db
      .update(instructorProfiles)
      .set(body)
      .where(eq(instructorProfiles.user_id, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[UPDATE_INSTRUCTOR_PROFILE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
