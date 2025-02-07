"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export function AvailabilityTab() {
  const timeSlots = {
    morning: ["09:00", "10:00", "11:00"],
    afternoon: ["13:00", "14:00", "15:00", "16:00"],
    evening: ["17:00", "18:00", "19:00"],
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 flex justify-center items-center">
        <Calendar mode="single" className="rounded-md border" />
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Available Time Slots</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Morning</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.morning.map((time) => (
                <Button key={time} variant="outline" className="justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 mb-2">Afternoon</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.afternoon.map((time) => (
                <Button key={time} variant="outline" className="justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-500 mb-2">Evening</h4>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.evening.map((time) => (
                <Button key={time} variant="outline" className="justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
