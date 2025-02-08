"use client";

import { Home, Calendar, User, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/home", icon: Home },
    { name: "Search", href: "/search", icon: Search },
    { name: "Dashboard", href: "/dashboard", icon: Calendar },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group ${
              pathname === item.href
                ? "text-primary"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
