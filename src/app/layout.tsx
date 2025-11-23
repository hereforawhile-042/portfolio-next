import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-next-livid-rho.vercel.app"),
  title:
    "Jeremiah Egemonye | Frontend & Mobile Developer - React, React Native, Next.js",
  description:
    "Jeremiah Egemonye - Result-oriented Frontend and Mobile Developer specializing in React, React Native, Next.js, TypeScript, and modern web technologies. Building accessible, pixel-perfect, and performant web and mobile applications.",
  keywords: [
    "Jeremiah Egemonye",
    "Frontend Developer",
    "Mobile Developer",
    "React Developer",
    "React Native Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Software Engineer",
    "Web Developer",
    "JavaScript Developer",
    "UI Developer",
    "Mobile App Developer",
    "Fullstack Developer",
    "Nigeria Developer",
    "Remote Developer",
    "GSAP",
    "Tailwind CSS",
    "Node.js",
    "GraphQL",
    "AWS",
    "Portfolio",
  ],
  authors: [{ name: "Jeremiah Egemonye" }],
  creator: "Jeremiah Egemonye",
  publisher: "Jeremiah Egemonye",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-next-livid-rho.vercel.app",
    siteName: "Jeremiah Egemonye - Frontend & Mobile Developer",
    title: "Jeremiah Egemonye | Frontend & Mobile Developer",
    description:
      "Result-oriented Frontend and Mobile Developer building accessible, pixel-perfect, and performant web and mobile applications with React, React Native, and Next.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jeremiah Egemonye - Frontend & Mobile Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremiah Egemonye | Frontend & Mobile Developer",
    description:
      "Result-oriented Frontend and Mobile Developer specializing in React, React Native, Next.js, and modern web technologies.",
    creator: "@_jerry0x",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2-ct8bLqtRWkFDsoK25Y1NgBUwiux01JV0hLHYDUWyM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
