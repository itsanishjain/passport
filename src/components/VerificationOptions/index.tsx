"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";
import { Shield, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VERIFICATION_ACTIONS } from "@/lib/constants";

type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level: VerificationLevel;
};

export function VerificationOptions() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = useCallback(
    async (level: VerificationLevel) => {
      if (!MiniKit.isInstalled()) {
        toast({
          title: "WorldID Not Found",
          description: "Please install WorldID app to verify your identity",
          variant: "destructive",
        });
        return null;
      }

      try {
        setIsLoading(true);

        const verifyPayload: VerifyCommandInput = {
          action: VERIFICATION_ACTIONS.DRIVER,
          signal: "",
          verification_level: level,
        };

        const obj = await MiniKit.commandsAsync.verify(verifyPayload);

        console.log({ obj });

        if (obj.finalPayload.status === "error") {
          throw new Error("Verification failed");
        }

        // Verify the proof in the backend
        const verifyResponse = await fetch(`/api/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            payload: obj.finalPayload as ISuccessResult,
            action: verifyPayload.action,
            signal: verifyPayload.signal,
          }),
        });

        console.log({ verifyResponse });

        const data = await verifyResponse.json();

        console.log({ data });

        if (!verifyResponse.ok) {
          throw new Error("Server verification failed");
        }

        toast({
          title: "Verification Successful",
          description: "Your identity has been verified",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Verification Failed",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Device Verified
          </CardTitle>
          <CardDescription>
            Quick verification using your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>• Basic identity verification</p>
            <p>• +15 points per lesson</p>
            <p>• Instant verification</p>
          </div>
          <Button
            className="w-full"
            onClick={() => handleVerify(VerificationLevel.Device)}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify with Device"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Orb Verified
          </CardTitle>
          <CardDescription>
            Advanced verification using World ID Orb
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>• Enhanced identity verification</p>
            <p>• +25 points per lesson</p>
            <p>• Priority in search results</p>
          </div>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => handleVerify(VerificationLevel.Orb)}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify with Orb"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
