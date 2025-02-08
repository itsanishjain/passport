import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, GraduationCap, Book, Star } from "lucide-react";
import Image from "next/image";
import QUERIES from "@/lib/queries";

export default async function StudentDashboard() {
  const bookings = await QUERIES.getBookings();
  console.log("bookings:", bookings);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}

      <div className="bg-primary px-4 pt-6 pb-8">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-xl font-semibold">Welcome back, Alex</h1>
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
              <p className="text-2xl font-semibold">12</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Milestone</p>
              <p className="text-2xl font-semibold">20h</p>
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
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Pickup: Home Address</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button variant="outline">Reschedule</Button>
            <Button>Get Ready</Button>
          </div>
        </Card>

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
