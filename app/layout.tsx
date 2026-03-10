import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandesh Shahi — Web Developer & Future Data Scientist",
  description:
    "Portfolio of Sandesh Shahi — a passionate web developer skilled in React, Next.js, and JavaScript, currently exploring Data Science.",
  keywords: [
    "Sandesh Shahi",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Data Science",
    "JavaScript",
  ],
  authors: [{ name: "Sandesh Shahi" }],
  openGraph: {
    title: "Sandesh Shahi — Web Developer",
    description: "Modern portfolio showcasing web development projects and skills.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
