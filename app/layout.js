import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Celesphos",
  description: "A perfect website for space researches and space explores.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
