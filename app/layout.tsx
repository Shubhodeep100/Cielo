import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";


export const metadata: Metadata = {
  title: "Cielo🌤",
  description: "Generated by create next app",
};

// const poppins = ({
//   subsets: ["latin"],
//   weight: ["400", "500", "700"],
//   style: ["normal", "italic"]
// })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <Navbar/>
        {children}
        </body>
    </html>
  );
}
