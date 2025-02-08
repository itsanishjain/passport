"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  MiniKit,
  tokenToDecimals,
  Tokens,
  PayCommandInput,
} from "@worldcoin/minikit-js";

interface PayTestButtonProps {
  text?: string;
  amount?: number;
  isTest?: boolean;
  onSuccess?: () => void;
}

export function PayTestButton({
  text = "Pay Now",
  amount = 25,
  isTest = false,
  onSuccess,
}: PayTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleRealPayment = async () => {
    if (!MiniKit.isInstalled()) {
      toast({
        title: "Error",
        description: "MiniKit is not installed",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await fetch(`/api/initiate-payment`, {
        method: "POST",
      });

      const { id } = await res.json();

      const payload: PayCommandInput = {
        reference: id,
        to: "0x92c392b5651d7aee13a3c72d52aa8dd521bcf3d5",
        tokens: [
          {
            symbol: Tokens.WLD,
            token_amount: tokenToDecimals(amount, Tokens.WLD).toString(),
          },
        ],
        description: "Payment for lesson booking",
      };

      const sendPaymentResponse = await MiniKit.commandsAsync.pay(payload);
      const response = sendPaymentResponse?.finalPayload;

      if (!response) {
        throw new Error("Payment failed");
      }

      if (response.status === "success") {
        const confirmRes = await fetch(`/api/confirm-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: response }),
        });

        const payment = await confirmRes.json();
        if (payment.success) {
          toast({
            title: "Payment Successful",
            description: `Successfully paid £${amount}`,
            variant: "default",
            className: "bg-green-500 text-white",
          });
          onSuccess?.();
        } else {
          throw new Error("Payment confirmation failed");
        }
      }
    } catch (error) {
      toast({
        title: "Payment Failed",
        description:
          error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestPayment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Test Payment Successful",
      description: `Successfully paid £${amount} (Test Mode)`,
      variant: "default",
      className: "bg-green-500 text-white",
    });
    onSuccess?.();
    setIsLoading(false);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    if (isTest) {
      await handleTestPayment();
    } else {
      await handleRealPayment();
    }
  };

  return (
    <Button onClick={handlePayment} disabled={isLoading} className="w-full">
      {isLoading ? "Processing..." : `${text} - £${amount}`}
    </Button>
  );
}
