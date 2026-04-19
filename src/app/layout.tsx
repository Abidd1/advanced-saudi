import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterStrip from "@/components/NewsletterStrip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Advanced Inspection Est. | Industrial Inspection Services",
    template: "%s | Advanced Inspection Est."
  },
  description: "Premier Industrial Inspection and verification services across Saudi Arabia and the Middle East. Specialized in Lifting Equipment, NDT, and Safety Training.",
  keywords: ["Industrial Inspection", "Saudi Arabia", "Lifting Equipment Certification", "NDT Services", "Advanced Inspection"],
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <NewsletterStrip />
        <Footer />
      </body>
    </html>
  );
}
