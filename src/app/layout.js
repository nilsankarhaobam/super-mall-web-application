import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Super Mall | Manage Shops & Offers",
  description: "A centralized platform for merchants and shoppers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex grow flex-col`}
      >
        <Navbar />
        {/* Main content expands to fill space between Navbar and Footer */}
        <main className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
