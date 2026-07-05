import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import AuthButton from "@/components/auth/AuthButton";

const inter = Inter({
  variable: "--font-inter",
  subsets:  ["latin"],
  display:  "swap",
  weight:   ["300", "400", "500", "600", "700", "900"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets:  ["latin"],
  display:  "swap",
  weight:   ["700", "800"],
});

export const metadata: Metadata = {
  title:       "Akshaya | Tech × Business Portfolio",
  description:
    "Portfolio of Akshaya — PGP in Management & Technology @ Scaler School of Business. Salesforce Developer. GenAI Explorer.",
  keywords:    ["Akshaya", "Portfolio", "Salesforce", "GenAI", "MBA", "Scaler"],
  openGraph: {
    title:       "Akshaya | Tech × Business Portfolio",
    description: "Salesforce Developer · GenAI Explorer · MBA Candidate at SSB",
    type:        "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ScrollToTop />
        <AuthButton />
        {children}
      </body>
    </html>
  );
}
