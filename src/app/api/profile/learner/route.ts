import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { learnerProfiles, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { LearnerProfileSchema } from "@/lib/types/profile-api";
import { getCookieFromHeader } from "@/lib/auth";
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
    const body = LearnerProfileSchema.parse(json);

    const user = await db.query.users.findFirst({
      where: eq(users.wallet_address, walletAddress),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const profile = await db.insert(learnerProfiles).values({
      id: crypto.randomUUID(),
      user_id: user.id,
      ...body,
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[CREATE_LEARNER_PROFILE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const walletAddress = getCookieFromHeader(
      "wallet_address",
      headers().get("cookie")
    );

    if (!walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const body = LearnerProfileSchema.parse(json);

    const user = await db.query.users.findFirst({
      where: eq(users.wallet_address, walletAddress),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db
      .update(learnerProfiles)
      .set({
        learning_goals: body.learningGoals,
        preferred_location: body.preferredLocation,
        preferred_schedule: body.preferredSchedule,
        license_type: body.licenseType,
        experience_level: body.experienceLevel,
      })
      .where(eq(learnerProfiles.user_id, user.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[UPDATE_LEARNER_PROFILE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
