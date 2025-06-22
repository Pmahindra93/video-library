import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '@/components/theme-provider'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Video Library",
  description: "Browse and manage your video collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
