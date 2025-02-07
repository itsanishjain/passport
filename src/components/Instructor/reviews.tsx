"use client";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export function ReviewsTab() {
  const reviews = [
    {
      id: 1,
      name: "John D.",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Sarah is an excellent instructor! Very patient and explains everything clearly. Helped me pass my test first time.",
      lessons: 15,
    },
    {
      id: 2,
      name: "Emma S.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Great instructor for nervous learners. Makes you feel comfortable and confident behind the wheel.",
      lessons: 20,
    },
  ];

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="pb-4 border-b last:border-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-100" />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">
                    {review.lessons} lessons taken
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>

            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
