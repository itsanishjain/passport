"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookingCreate, BookingCreateSchema } from "@/lib/types/booking-api";
import { PLATFORM_FEE, IS_TEST } from "@/lib/constants";
import { PayTestButton } from "@/components/PayTestButton";
import { PayBlock } from "@/components/Pay";
import { useRouter } from "next/navigation";
import { Queries } from "@/lib/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import superjson from "superjson";

type Instructor = NonNullable<Queries["getInstructor"]>;

export function BookingForm({ instructor }: { instructor: Instructor }) {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookingCreate>({
    resolver: zodResolver(BookingCreateSchema),
    defaultValues: {
      instructorId: instructor.id,
      duration: "1",
      status: "pending",
      amount: (instructor.instructorProfile?.hourly_rate || 0) + PLATFORM_FEE,
    },
  });

  const selectedDate = watch("date");
  const selectedTime = watch("timeSlot");
  const duration = watch("duration");

  const onSubmit = async (data: BookingCreate) => {
    console.log("Original data:", data);
    try {
      // Transform the date string back to Date object
      const bookingData = {
        ...data,
        date: new Date(data.date),
      };

      // Use SuperJSON to properly serialize the data
      const { json, meta } = superjson.serialize(bookingData);

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ json, meta }),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
      }

      toast({
        title: "Booking Successful",
        description: "Your lesson has been booked",
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Booking Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const totalAmount =
    (instructor.instructorProfile?.hourly_rate || 0) + PLATFORM_FEE;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Date Selection */}
      <Card className="p-4">
        <h2 className="font-semibold mb-4">Select Date & Time</h2>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => setValue("date", date || new Date())}
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
        {errors.date && (
          <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
        )}
      </Card>

      {/* Time Slots */}
      <Card className="p-4">
        <h2 className="font-semibold mb-4">Available Time Slots</h2>
        <div className="grid grid-cols-2 gap-2">
          {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
            (time) => (
              <Button
                key={time}
                type="button"
                variant={selectedTime === time ? "default" : "outline"}
                className="justify-start"
                onClick={() => setValue("timeSlot", time)}
              >
                <Clock className="mr-2 h-4 w-4" />
                {time}
              </Button>
            )
          )}
        </div>
        {errors.timeSlot && (
          <p className="text-sm text-red-500 mt-1">{errors.timeSlot.message}</p>
        )}
      </Card>

      {/* Lesson Details */}
      <Card className="p-4">
        <h2 className="font-semibold mb-4">Lesson Details</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Duration</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { label: "1 hour", value: "1" },
                { label: "1.5 hours", value: "1.5" },
                { label: "2 hours", value: "2" },
              ].map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={duration === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() =>
                    setValue("duration", option.value as "1" | "1.5" | "2")
                  }
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {errors.duration && (
              <p className="text-sm text-red-500 mt-1">
                {errors.duration.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-500">Pickup Location</label>
            <Input
              {...register("pickupLocation")}
              placeholder="Enter your address"
              className="mt-2"
            />
            {errors.pickupLocation && (
              <p className="text-sm text-red-500 mt-1">
                {errors.pickupLocation.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Price Summary */}
      <Card className="p-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">
            Lesson ({duration} hour{duration !== "1" ? "s" : ""})
          </span>
          <span>£{instructor.instructorProfile?.hourly_rate}.00</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">Booking fee</span>
          <span>£{PLATFORM_FEE}.00</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>£{totalAmount.toFixed(2)}</span>
        </div>
      </Card>

      {IS_TEST && (
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Confirm Booking"}
        </Button>
      )}
    </form>
  );
}
