import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, Book, Star } from "lucide-react";
import Image from "next/image";
import QUERIES from "@/lib/queries";
import { BookingStats } from "@/components/dashboard/BookingStats";
import { db } from "@/lib/db";
import { bookings } from "@/drizzle/schema";
import { sql } from "drizzle-orm";
import { format, subDays } from "date-fns";

async function getLearningStats() {
  // Get bookings for the last 14 days
  const startDate = subDays(new Date(), 14);

  const stats = await db
    .select({
      date: sql<string>`date(start_time)`,
      hours: sql<number>`sum(
        round(
          (julianday(end_time) - julianday(start_time)) * 24,
          1
        )
      )`,
    })
    .from(bookings)
    .where(sql`start_time >= ${startDate.toISOString()}`)
    .groupBy(sql`date(start_time)`)
    .orderBy(sql`date(start_time)`);

  // Format the dates and ensure we have entries for all days
  const formattedStats = Array.from({ length: 14 }, (_, i) => {
    const date = format(subDays(new Date(), i), "MMM dd");
    const stat = stats.find((s) => format(new Date(s.date), "MMM dd") === date);
    return {
      date,
      hours: Number(stat?.hours || 0),
      target: 2, // Target hours per day
    };
  }).reverse();

  return formattedStats;
}

export default async function StudentDashboard() {
  const bookings = await QUERIES.getBookings();
  const learningHours = await getLearningStats();

  // Calculate total hours
  const totalHours = learningHours.reduce((sum, day) => sum + day.hours, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}

      <div className="bg-primary px-4 pt-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-xl font-semibold">
              Welcome back, {bookings[0].learner?.name}
            </h1>
            <p className="text-sm opacity-90">
              Your learning journey continues
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mt-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Learning Progress</h2>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Hours Completed</p>
              <p className="text-2xl font-semibold">{totalHours}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Milestone</p>
              <p className="text-2xl font-semibold">
                {Math.ceil(totalHours / 10) * 10}h
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-4">
        {/* Upcoming Lesson */}
        <Card className="p-4 mb-6">
          <h2 className="font-semibold mb-4">Next Lesson</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src={
                  bookings[0].instructor?.profile_url ??
                  "/assets/avatar-women-placeholder.png"
                }
                alt="Sarah Wilson"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{bookings[0].instructor?.name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  {format(new Date(bookings[0].start_time), "MMM dd, hh:mm a")}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />

                <span>Pickup: {bookings[0].location}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button variant="outline">Reschedule</Button>
            <Button>Get Ready</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          <BookingStats learningHours={learningHours} />
        </div>

        {/* Learning Resources */}
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Learning Resources</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4">
              <Book className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-semibold">Theory Test</h3>
              <p className="text-sm text-gray-500">Practice questions</p>
            </Card>
            <Card className="p-4">
              <Star className="w-6 h-6 mb-2 text-primary" />
              <h3 className="font-semibold">Progress Log</h3>
              <p className="text-sm text-gray-500">Track your skills</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
