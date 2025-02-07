import { users, instructorProfiles, learnerProfiles } from "@/drizzle/schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "@/drizzle/schema";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error("Missing database credentials in environment variables");
  process.exit(1);
}

// Create a new client instance for the script
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create a new db instance

const db = drizzle(client, { schema });

const TOTAL_USERS = 100;
const INSTRUCTOR_COUNT = 30;
const LEARNER_COUNT = 70;

// Helper to generate random number between min and max
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to randomly pick from an array
const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const vehicleTypes = ["manual", "automatic", "both"] as const;
const experienceLevels = ["beginner", "intermediate", "advanced"] as const;
const licenseTypes = ["provisional", "full"] as const;
const locations = [
  "London",
  "Manchester",
  "Birmingham",
  "Leeds",
  "Liverpool",
  "Newcastle",
  "Sheffield",
  "Bristol",
  "Nottingham",
  "Glasgow",
];

async function seed() {
  console.log("🌱 Starting seeding...");

  try {
    const tables = await db.query.users.findFirst();
    console.log(tables);
    return true;
    // Clear existing data
    // console.log("Clearing existing data...");
    // try {
    //   await db.delete(instructorProfiles);
    //   await db.delete(learnerProfiles);

    //   await db.delete(users);
    // } catch (error) {
    //   console.log("No existing data to clear");
    // }

    // Verify tables exist
    console.log("Verifying database tables...");
    // const tables = await db.query.users.findFirst();
    // if (!tables) {
    //   console.error("Database tables not found. Please run migrations first:");
    //   console.error("1. npm run db:generate");
    //   console.error("2. npm run db:push");
    //   process.exit(1);
    // }

    // Create instructors
    console.log("Creating instructors...");
    for (let i = 0; i < INSTRUCTOR_COUNT; i++) {
      const id = crypto.randomUUID();
      const isWoman = Math.random() > 0.5;

      await db.insert(users).values({
        id,
        wallet_address: crypto.randomUUID(),
        name: `Instructor ${i + 1}`,
        role: "instructor",
        profile_url: isWoman
          ? "/assets/avatar-women-placeholder.png"
          : "/assets/avatar-placeholder.png",
        orb_verified: Math.random() > 0.7 ? 1 : 0,
        device_verified: Math.random() > 0.3 ? 1 : 0,
      });

      await db.insert(instructorProfiles).values({
        id: crypto.randomUUID(),
        user_id: id,
        bio: `Experienced driving instructor with ${random(
          2,
          20
        )} years of teaching experience.`,
        experience_years: random(2, 20),
        hourly_rate: random(25, 50),
        license_number: `DI${random(100000, 999999)}`,
        vehicle_type: pickRandom([...vehicleTypes]), // Convert readonly array to mutable
        location: pickRandom(locations),
        rating: random(3, 5),
        total_reviews: random(0, 50),
      });
    }

    // Create learners
    console.log("Creating learners...");
    for (let i = 0; i < LEARNER_COUNT; i++) {
      const id = crypto.randomUUID();
      const isWoman = Math.random() > 0.5;

      await db.insert(users).values({
        id,
        wallet_address: crypto.randomUUID(),
        name: `Learner ${i + 1}`,
        role: "learner",
        profile_url: isWoman
          ? "/assets/avatar-women-placeholder.png"
          : "/assets/avatar-placeholder.png",
        orb_verified: Math.random() > 0.8 ? 1 : 0,
        device_verified: Math.random() > 0.4 ? 1 : 0,
      });

      await db.insert(learnerProfiles).values({
        id: crypto.randomUUID(),
        user_id: id,
        learning_goals:
          "Looking to pass my test and become a confident driver.",
        preferred_location: pickRandom(locations),
        preferred_schedule: JSON.stringify({
          weekdays: Math.random() > 0.5,
          weekends: Math.random() > 0.5,
          evenings: Math.random() > 0.5,
        }),
        license_type: pickRandom([...licenseTypes]),
        experience_level: pickRandom([...experienceLevels]),
      });
    }

    console.log("✅ Seeding completed!");
    console.log(
      `Created ${INSTRUCTOR_COUNT} instructors and ${LEARNER_COUNT} learners`
    );
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
