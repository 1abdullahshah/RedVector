import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RedVector | Precision Vulnerability Triage",
  description: "Automated, aggressive vulnerability triage for professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
