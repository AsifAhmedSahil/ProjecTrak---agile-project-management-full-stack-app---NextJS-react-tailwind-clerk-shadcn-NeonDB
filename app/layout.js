import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { shadesOfPurple } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import ClerkClientProvider from "@/components/ClerkClientProvider";




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProjecTrak",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <>
    <ClerkClientProvider >
      <html lang="en">
        <body className={`${inter.className} animated-dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark" >
            {/* header */}
            <Header/>
            <main className="min-h-screen">{children}</main>
            <Toaster/>
            <footer className="py-12 bg-gray-900">
              <div className=" text-center container mx-auto px-4 ">
                <p>Made by &copy; Asif ahmed sahil - 2024</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkClientProvider>
    </>
  );
}
