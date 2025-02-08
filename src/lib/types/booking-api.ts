import { z } from "zod";

export const BookingCreateSchema = z.object({
  instructorId: z.string(),
  date: z.date(),
  timeSlot: z.string(),
  duration: z.enum(["1", "1.5", "2"]),
  pickupLocation: z.string().min(1, "Pickup location is required"),
  amount: z.number().min(0),
  status: z
    .enum(["pending", "confirmed", "completed", "cancelled"])
    .default("pending"),
});

export type BookingCreate = z.infer<typeof BookingCreateSchema>;

export const BookingResponseSchema = z.object({
  id: z.string(),
  instructorId: z.string(),
  learnerId: z.string(),
  date: z.string(),
  timeSlot: z.string(),
  duration: z.string(),
  pickupLocation: z.string(),
  amount: z.number(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export type BookingResponse = z.infer<typeof BookingResponseSchema>;
