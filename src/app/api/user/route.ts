import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { UserCreateSchema } from "@/lib/types/user-api";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const { userId, walletAddress, userType } = UserCreateSchema.parse(json);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.wallet_address, walletAddress),
    });

    if (existingUser) {
      return NextResponse.json(existingUser);
    }

    // Create new user
    const newUser = await db.insert(users).values({
      id: userId,
      wallet_address: walletAddress,
      role: userType,
      name: null,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("[CREATE_USER]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const walletAddress = request.headers.get("x-wallet-address");
    if (!walletAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.wallet_address, walletAddress),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[GET_USER]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
