"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Calendar, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { Queries } from "@/lib/queries";
import { motion } from "framer-motion";

type Bookings = NonNullable<Queries["getBookings"]>[number];

export function MyBookings({ bookings }: { bookings: Bookings[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Booking History</h2>
          <span className="text-sm text-muted-foreground">
            ({bookings.length} lessons)
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="space-y-3">
          {bookings.map((booking) => (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              key={booking.id}
              className={`p-3 rounded-lg border ${
                booking.status === "completed"
                  ? "bg-green-50/30"
                  : booking.status === "cancelled"
                  ? "bg-red-50/30"
                  : "bg-yellow-50/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <div>
                    <h3 className="font-medium text-sm">
                      {booking.instructor?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(booking.start_time), "EEEE, MMM dd")}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    booking.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status
                    ? booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)
                    : "Unknown"}
                </span>
              </div>

              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  <span>
                    {format(new Date(booking.start_time), "hh:mm a")} -{" "}
                    {format(new Date(booking.end_time), "hh:mm a")}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  <span>{booking.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
