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
  title: "Ziad Ayman | Frontend Developer",
  description: "Frontend Developer specializing in React & Next.js. Building web experiences that don't suck.",
  authors: [{ name: "Ziad Ayman" }],
  keywords: ["Frontend Developer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Web Development"],
  openGraph: {
    title: "Ziad Ayman | Frontend Developer",
    description: "Frontend Developer specializing in React & Next.js",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}