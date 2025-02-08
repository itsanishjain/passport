import { db } from "@/lib/db";
import { users, bookings } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";

const QUERIES = {
  user: async (userId: string, userType: string) => {
    return await db.query.users.findFirst({
      with: {
        instructorProfile: userType === "instructor" ? true : undefined,
        learnerProfile: userType === "learner" ? true : undefined,
      },
      where: eq(users.id, userId),
    });
  },
  getInstructors: async () => {
    return await db.query.users.findMany({
      where: eq(users.role, "instructor"),
      with: {
        instructorProfile: true,
      },
    });
  },
  getInstructor: async (instructorId: string) => {
    return await db.query.users.findFirst({
      where: eq(users.id, instructorId),
      with: {
        instructorProfile: true,
      },
    });
  },
  getBookings: async () => {
    return await db.query.bookings.findMany({
      orderBy: desc(bookings.start_time),
      with: {
        instructor: true,
        learner: true,
      },
    });
  },
};

export default QUERIES;
export type Queries = {
  [K in keyof typeof QUERIES]: Awaited<ReturnType<(typeof QUERIES)[K]>>;
};
