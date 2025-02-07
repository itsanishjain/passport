import { sql, relations } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

// Users table - base table for both instructors and learners
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  wallet_address: text("wallet_address").unique(),
  name: text("name"),
  role: text("role", { enum: ["instructor", "learner"] }).notNull(),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Instructor profiles - additional info for instructors
export const instructorProfiles = sqliteTable("instructor_profiles", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .references(() => users.id)
    .notNull(),
  bio: text("bio"),
  experience_years: integer("experience_years"),
  hourly_rate: integer("hourly_rate"),
  license_number: text("license_number"),
  vehicle_type: text("vehicle_type"),
  availability: text("availability"), // JSON string of available time slots
  location: text("location"),
  rating: integer("rating"),
  total_reviews: integer("total_reviews").default(0),
});

// Learner profiles - additional info for learners
export const learnerProfiles = sqliteTable("learner_profiles", {
  id: text("id").primaryKey(),
  user_id: text("user_id")
    .references(() => users.id)
    .notNull(),
  learning_goals: text("learning_goals"),
  preferred_location: text("preferred_location"),
  preferred_schedule: text("preferred_schedule"), // JSON string of preferred times
  license_type: text("license_type"),
  experience_level: text("experience_level", {
    enum: ["beginner", "intermediate", "advanced"],
  }),
});

// Bookings table
export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  instructor_id: text("instructor_id").references(() => users.id),
  learner_id: text("learner_id").references(() => users.id),
  start_time: text("start_time").notNull(),
  end_time: text("end_time").notNull(),
  status: text("status", {
    enum: ["pending", "confirmed", "completed", "cancelled"],
  }).default("pending"),
  location: text("location"),
  notes: text("notes"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

// Reviews table
export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  booking_id: text("booking_id").references(() => bookings.id),
  reviewer_id: text("reviewer_id").references(() => users.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Define relationships
export const usersRelations = relations(users, ({ one }) => ({
  instructorProfile: one(instructorProfiles, {
    fields: [users.id],
    references: [instructorProfiles.user_id],
  }),
  learnerProfile: one(learnerProfiles, {
    fields: [users.id],
    references: [learnerProfiles.user_id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  instructor: one(users, {
    fields: [bookings.instructor_id],
    references: [users.id],
  }),
  learner: one(users, {
    fields: [bookings.learner_id],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  booking: one(bookings, {
    fields: [reviews.booking_id],
    references: [bookings.id],
  }),
  reviewer: one(users, {
    fields: [reviews.reviewer_id],
    references: [users.id],
  }),
}));
