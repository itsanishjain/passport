import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

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
      with: {
        instructorProfile: true,
      },
    });
  },
};

export default QUERIES;
export type Queries = {
  [K in keyof typeof QUERIES]: Awaited<ReturnType<(typeof QUERIES)[K]>>;
};
