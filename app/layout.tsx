import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wunan’s Portfolio — Designer",
  description: "Wunan's independent design portfolio: visual identity, art direction and digital experiences.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
