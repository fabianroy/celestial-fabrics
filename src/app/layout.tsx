import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celestial Fabrics",
  description: "Because You Deserve to Shine",
  keywords: [
    "Celestial Fabrics",
    "Fabrics",
    "Fashion",
    "Clothing",
    "Apparel",
    "Style",
    "Trendy",
    "Unique Designs",
    "Quality Fabrics",
    "Fashion Trends",
    "Sustainable Fashion",
    "Eco-Friendly Fabrics",
    "Fashion Accessories",
    "Fashion Inspiration",
    "Fashion Blog",
    "Fashion Community",
    "Fashion Tips",
    "Fashion Advice",
    "Fashion Reviews",
    "Fashion News",
    "Fashion Events"
  ],
  authors: [
    {
      name: "Celestial Fabrics",
      url: "https://celestial-server.vercel.app",
    },
  ],
  creator: "Celestial Fabrics",
  publisher: "Celestial Fabrics",
  openGraph: {
    title: "Celestial Fabrics",
    description: "Because You Deserve to Shine",
    url: "https://celestial-server.vercel.app",
    siteName: "Celestial Fabrics",
    locale: "en-US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
