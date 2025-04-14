import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { VehicleProvider } from "@/contexts/VehiclesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vehicle Auctions",
  description: "Browse and bid on vehicles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VehicleProvider>{children}</VehicleProvider>
      </body>
    </html>
  );
}
