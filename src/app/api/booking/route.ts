import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookings } from "@/drizzle/schema";
import { BookingCreateSchema } from "@/lib/types/booking-api";
import { getCookieFromHeader } from "@/lib/auth";
import { headers } from "next/headers";
import superjson from "superjson";

export async function POST(request: NextRequest) {
  try {
    const userId = getCookieFromHeader("user_id", headers().get("cookie"));
    const walletAddress = getCookieFromHeader(
      "wallet_address",
      headers().get("cookie")
    );

    if (!userId || !walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { json, meta } = await request.json();
    const data = superjson.deserialize({ json, meta });
    const body = BookingCreateSchema.parse(data);

    console.log("Parsed body:", body);

    const booking = await db.insert(bookings).values({
      id: crypto.randomUUID(),
      instructor_id: body.instructorId,
      learner_id: userId,
      start_time: body.date.toISOString(),
      end_time: new Date(
        body.date.getTime() + parseFloat(body.duration) * 60 * 60 * 1000
      ).toISOString(),
      status: body.status,
      location: body.pickupLocation,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[CREATE_BOOKING]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
