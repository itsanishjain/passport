/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WavesIcon } from "lucide-react";

export default function LoginScreen() {
  const handleInstructorJoin = () => {
    console.log("Joining as instructor");
  };

  const handleLearnerJoin = () => {
    console.log("Joining as learner");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-purple-50 to-white">
      <div className="w-full max-w-md space-y-8">
        {/* Illustration Container */}
        <div className="flex justify-center">
          <img
            src="/assets/splash.webp"
            alt="Login Illustration"
            className="w-48 h-48 object-cover rounded-full shadow-lg"
          />
        </div>

        <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold">
              <WavesIcon className="w-6 h-6" />
              Welcome to Passport
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 pt-2">
              <Button
                onClick={handleInstructorJoin}
                className="w-full h-12 text-base  transition-colors"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
