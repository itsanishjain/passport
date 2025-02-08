"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface PayTestButtonProps {
  text?: string;
  amount?: number;
}

export function PayTestButton({
  text = "Pay Now",
  amount = 25,
}: PayTestButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Payment Successful",
      description: `Successfully paid £${amount}`,
      variant: "default",
    });

    setIsLoading(false);
  };

  return (
    <Button onClick={handlePayment} disabled={isLoading} className="w-full">
      {isLoading ? "Processing..." : `${text} - £${amount}`}
    </Button>
  );
}
