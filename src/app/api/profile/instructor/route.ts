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

    const userId = getCookieFromHeader("user_id", headers().get("cookie"));

    console.log({ walletAddress });
    if (!walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const body = InstructorProfileSchema.parse(json);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await db.insert(instructorProfiles).values({
      id: userId,
      user_id: userId,
      bio: body.bio,
      experience_years: body.experienceYears,

      hourly_rate: body.hourlyRate,
      license_number: body.licenseNumber,
      vehicle_type: body.vehicleType,
      location: body.location,
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
    const walletAddress = getCookieFromHeader(
      "wallet_address",
      headers().get("cookie")
    );

    const userId = getCookieFromHeader("user_id", headers().get("cookie"));

    if (!walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json();
    const body = InstructorProfileSchema.parse(json);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db
      .update(instructorProfiles)

      .set({
        bio: body.bio,
        experience_years: body.experienceYears,
        hourly_rate: body.hourlyRate,
        license_number: body.licenseNumber,
        vehicle_type: body.vehicleType,
        location: body.location,
      })
      .where(eq(instructorProfiles.user_id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[UPDATE_INSTRUCTOR_PROFILE]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
