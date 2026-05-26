import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Salons Assured Kenya Ltd",
  description:
    "Beauty industry recruitment, salon staffing, spa staffing, barbershop recruitment, training, consulting, business systems, and growth support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}