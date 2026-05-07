import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Auralis",
  description: "A MiniPay-first agent for shaping text into Celo NFT artifacts.",
  icons: {
    icon: "/auralis-logo.svg",
  },
  other: {
    "talentapp:project_verification":
      "48d992a49bb7ac566bdcabd1c5a5db30f4b6b0a66fabb399a2ed614519d2ed4031dee95b78b40669d9d5ded002c26632a9a6e5d8752e7332d3500b410c8bcfab",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
