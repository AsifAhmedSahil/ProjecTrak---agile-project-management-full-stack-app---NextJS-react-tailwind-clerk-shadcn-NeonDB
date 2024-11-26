
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "ProjecTrak",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
        {/* header */}
        <main className="min-h-screen">

        {children}
        </main>
        <footer className="py-12 bg-gray-900">
          <div className=" text-center container mx-auto px-4 ">
            <p>Made by 0 Asif ahmed sahil - 2024</p>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
