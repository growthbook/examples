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
      <body className={inter.className}>
        <div className="p-4 max-w-2xl">
          <div className="text-4xl my-4">
            <Link href="/">GrowthBook Next.js Example</Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
