import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Clock } from "lucide-react";
import Image from "next/image";
import { PayBlock } from "@/components/Pay";
import { IS_TEST, PLATFORM_FEE } from "@/lib/constants";
import { PayTestButton } from "@/components/PayTestButton";
import QUERIES from "@/lib/queries";
import { BookingForm } from "@/components/BookingForm";

export default async function BookingPage({
  params,
}: {
  params: { instructorId: string };
}) {
  const instructorId = params.instructorId;
  const instructor = await QUERIES.getInstructor(instructorId);

  if (!instructor) {
    return <div>Instructor not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Instructor Summary */}
      <div className="bg-primary px-4 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={instructor.profile_url || "/assets/avatar-placeholder.png"}
              alt={instructor.name || "Instructor"}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="text-white">
            <h1 className="font-semibold">
              Book Lesson with {instructor.name}
            </h1>
            <p className="text-sm opacity-90">
              £{instructor.instructorProfile?.hourly_rate}/hour •{" "}
              {instructor.instructorProfile?.vehicle_type}
            </p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="px-4 py-6">
        <BookingForm instructor={instructor} />
      </div>
    </div>
  );
}
