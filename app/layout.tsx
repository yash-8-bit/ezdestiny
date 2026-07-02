import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", figtree.variable)}
    >
      <body className="dark">
        {children}
      </body>
    </html>
  );
}



export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true
  }
}