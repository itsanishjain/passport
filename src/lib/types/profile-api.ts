import { z } from "zod";

// Instructor profile schema
export const InstructorProfileSchema = z.object({
  bio: z.string().min(1, "Bio is required"),
  experienceYears: z.number().min(0),
  hourlyRate: z.number().min(0),
  licenseNumber: z.string().min(1, "License number is required"),
  vehicleType: z.enum(["manual", "automatic", "both"]),
  location: z.string().min(1, "Location is required"),
});

export type InstructorProfile = z.infer<typeof InstructorProfileSchema>;

// Learner profile schema
export const LearnerProfileSchema = z.object({
  learningGoals: z.string().min(1, "Learning goals are required"),
  preferredLocation: z.string().min(1, "Preferred location is required"),
  preferredSchedule: z.string().min(1, "Preferred schedule is required"),
  licenseType: z.enum(["provisional", "full"]),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
});

export type LearnerProfile = z.infer<typeof LearnerProfileSchema>;
