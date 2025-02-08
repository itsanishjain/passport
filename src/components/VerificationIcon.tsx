import { Smartphone, CircleCheck } from "lucide-react";

export function VerificationIcon({ type }: { type: "device" | "orb" }) {
  if (type === "device") {
    return (
      <div className="flex items-center gap-1">
        <Smartphone className="w-4 h-4 text-blue-500" />
        <span className="text-xs text-blue-500">Device Verified</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <CircleCheck className="w-4 h-4 text-amber-500" />
      <span className="text-xs text-amber-500">World ID Verified</span>
    </div>
  );
}
