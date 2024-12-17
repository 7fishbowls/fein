import Head from "next/head";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";

export const metadata = {
  title: "Celesphos",
  description: "A perfect website for space researches and space explores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/star.ico"></link>
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
