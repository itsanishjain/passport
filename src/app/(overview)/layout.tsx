"use client";
import { BottomNav } from "@/components/bottom-nav";
export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <BottomNav />
    </div>
  );
}
