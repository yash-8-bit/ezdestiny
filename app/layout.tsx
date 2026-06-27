import "./globals.css";
import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


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
      <body  className="dark ">
        <TooltipProvider>
        {children}
        </TooltipProvider>
        </body>
    </html>
  );
}
