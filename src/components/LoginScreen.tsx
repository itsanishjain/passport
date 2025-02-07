"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginScreen() {
  const handleInstructorJoin = () => {
    console.log("Joining as instructor");
  };

  const handleLearnerJoin = () => {
    console.log("Joining as learner");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            welcome to passport
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleInstructorJoin}
            className="w-full h-12 text-base bg-primary hover:bg-primary/90"
          >
            Join as Instructor
          </Button>
          <Button
            onClick={handleLearnerJoin}
            variant="secondary"
            className="w-full h-12 text-base"
          >
            Join as Learner
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
