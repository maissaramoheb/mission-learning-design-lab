import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mission Learning Design Lab",
  description:
    "A UN Peacekeeping Training-of-Trainers activity for applying behaviourist, social cognitive, and constructivist learning theory."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
