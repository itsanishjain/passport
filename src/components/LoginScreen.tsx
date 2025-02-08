/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WavesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "@/lib/cookies";
import { UserCreate } from "@/lib/types/user-api";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { SignOut } from "./SignOut";

export default function LoginScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (userType: "instructor" | "learner") => {
    const userId = getCookie("user_id") || crypto.randomUUID();
    const walletAddress = getCookie("wallet_address") || crypto.randomUUID();

    if (!getCookie("user_id") || !getCookie("wallet_address")) {
      // Set cookies first
      setCookie("user_id", userId, { days: 365 });
      setCookie("wallet_address", walletAddress, { days: 365 });

      try {
        // Call API to create user
        const userData: UserCreate = {
          userId,
          walletAddress,
          userType,
        };

        setIsLoading(true);

        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast({
          title: "Error",
          description: "Failed to create user. Please try again.",
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    }
    return true;
  };

  const handleInstructorJoin = async () => {
    if (!getCookie("user_type")) {
      setCookie("user_type", "instructor", { days: 365 });
    }

    const success = await createUser("instructor");
    if (success) {
      router.push("/onboarding/instructor");
    }
  };

  const handleLearnerJoin = async () => {
    if (!getCookie("user_type")) {
      setCookie("user_type", "learner", { days: 365 });
    }

    const success = await createUser("learner");
    if (success) {
      router.push("/home");
    }
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
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join as Instructor"}
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleLearnerJoin}
                variant="secondary"
                className="w-full h-12 text-base"
              >
                {isLoading ? "Joining..." : "Join as Learner"}
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* <SignOut /> */}
      </div>
    </div>
  );
}
