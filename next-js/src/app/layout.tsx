import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GrowthBook Next.js Example",
  description: "GrowthBook Next.js Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <h1 className="mb-4">
          <Link href="/">GrowthBook Next.js Example</Link>
        </h1>
        {children}
      </body>
    </html>
  );
}
