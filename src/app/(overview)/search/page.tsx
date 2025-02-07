import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, Star, Filter, Clock } from "lucide-react";
import Image from "next/image";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Header */}
      <div className="bg-primary px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Input
            placeholder="Find instructors near you"
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
          />
          <Button
            variant="ghost"
            className="bg-white/10 border border-white/20"
          >
            <Filter className="h-4 w-4 text-white" />
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Manual", "Automatic", "Weekends", "Evenings", "Under £30/h"].map(
            (filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                className="bg-white/10 text-white whitespace-nowrap border border-white/20"
              >
                {filter}
              </Button>
            )
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">12 Instructors Available</h2>
          <Button variant="ghost" size="sm">
            Sort by: Rating
          </Button>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden">
                  <Image
                    src={`/instructor.jpg`}
                    alt="Instructor"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Sarah Wilson</h3>
                      <p className="text-sm text-gray-500">
                        ADI Certified • 8 years exp.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-medium">4.9</span>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Birmingham City Centre</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>£35/hour • Manual & Automatic</span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Link href={`/instructor/${i}`} className="flex-1">
                      <Button className="w-full" variant="outline">
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/booking/${i}`} className="flex-1">
                      <Button className="flex-1">Book Lesson</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
