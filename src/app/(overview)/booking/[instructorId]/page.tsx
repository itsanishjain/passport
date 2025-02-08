import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock } from "lucide-react";
import Image from "next/image";
import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";

export default function BookingPage({
  params,
}: {
  params: { instructorId: string };
}) {
  const instructorId = params.instructorId;
  console.log(instructorId);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Instructor Summary */}
      <SignIn />

      <div className="bg-primary px-4 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src="/assets/avatar-women-placeholder.png"
              alt="Sarah Wilson"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="font-semibold">Book Lesson with Sarah</h1>
            <p className="text-sm opacity-90">£35/hour • Manual</p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="px-4 py-6">
        <div className="space-y-6">
          {/* Date Selection */}
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Select Date & Time</h2>
            <div className="flex justify-center items-center">
              <Calendar mode="single" className="rounded-md border" />
            </div>
          </Card>

          {/* Time Slots */}
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-2 gap-2">
              {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
                (time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className="justify-start"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </Button>
                )
              )}
            </div>
          </Card>

          {/* Lesson Details */}
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Lesson Details</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Duration</label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["1 hour", "1.5 hours", "2 hours"].map((duration) => (
                    <Button key={duration} variant="outline" size="sm">
                      {duration}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">Pickup Location</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="w-full mt-2 p-2 rounded-md border"
                />
              </div>
            </div>
          </Card>

          {/* Price Summary */}
          <Card className="p-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Lesson (1 hour)</span>
              <span>£35.00</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Booking fee</span>
              <span>£2.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>£37.00</span>
            </div>
          </Card>

          <Button className="w-full" size="lg">
            Confirm Booking
          </Button>
          <PayBlock />
        </div>
      </div>
    </div>
  );
}
