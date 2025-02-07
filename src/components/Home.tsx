import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MapPin, Calendar, Star, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-black px-4 pt-8 pb-20">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-5 h-5 text-primary">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-white text-xl font-semibold">passport</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Where to?"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="ghost"
            className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/20"
          >
            Nearby
          </Button>
          <Button
            variant="ghost"
            className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/20"
          >
            Available Now
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-20">
        {/* Featured Instructors */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Top Rated Instructors</h2>
          <Card className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                <Image
                  src="/assets/avatar-placeholder.png"
                  alt="Sam Hart"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Sam Hart</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium">4.9</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>2.5 miles away</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Available today</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="outline">View Profile</Button>
              <Button className="bg-primary hover:bg-primary/90">
                Book Now
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent Searches */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Manual Lessons",
              "Automatic",
              "Weekend Only",
              "Evening Classes",
            ].map((item) => (
              <Button
                key={item}
                variant="outline"
                className="rounded-full text-sm"
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
