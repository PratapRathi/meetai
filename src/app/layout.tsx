import { TRPCReactProvider } from "@/trpc/client";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meet.AI",
  description: "Your personal AI assistent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Toaster/>
          {children}
          </body>
      </html>
    </TRPCReactProvider>
  );
}
