import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPSCora AI — Your AI-Powered UPSC Preparation Companion",
  description: "Prepare smarter with AI-powered UPSC Prelims, Mains, notes, tests and answer evaluation.",
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}