import { VehiclesProvider } from "@/contexts/VehiclesContext";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <VehiclesProvider>{children}</VehiclesProvider>
      </body>
    </html>
  );
}
