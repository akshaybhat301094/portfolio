import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VoiceAgentPanel } from "@/components/ui/VoiceAgentPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akshay Bhat | Senior Frontend Architect",
  description: "Professional portfolio and knowledge graph of Akshay Bhat, Senior Frontend Architect specializing in Angular, React, and AI workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <VoiceAgentPanel />
      </body>
    </html>
  );
}
