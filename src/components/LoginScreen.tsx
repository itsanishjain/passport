/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WavesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "@/lib/cookies";

export default function LoginScreen() {
  const router = useRouter();

  const handleInstructorJoin = () => {
    setCookie("user_type", "instructor", { days: 365 });
    if (!getCookie("user_id"))
      setCookie("user_id", crypto.randomUUID(), { days: 365 });
    if (!getCookie("wallet_address"))
      setCookie("wallet_address", crypto.randomUUID(), { days: 365 });

    router.push("/onboarding/instructor");
  };

  const handleLearnerJoin = () => {
    setCookie("user_type", "learner", { days: 365 });
    if (!getCookie("user_id"))
      setCookie("user_id", crypto.randomUUID(), { days: 365 });
    if (!getCookie("wallet_address"))
      setCookie("wallet_address", crypto.randomUUID(), { days: 365 });

    router.push("/home");
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
                className="w-full h-12 text-base transition-colors"
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
