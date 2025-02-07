import "./globals.css";
import { bricolage } from "@/lib/fonts";
import type { Metadata } from "next";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Passport - Driving Instructor App",
  description: "Connect with qualified driving instructors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en">
      <body className={bricolage.className}>
        <NextAuthProvider>
          <ErudaProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <MiniKitProvider>{children}</MiniKitProvider>
              <Toaster />
            </ThemeProvider>
          </ErudaProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
