import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProjecTrak",
  description: "Project Management App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: shadesOfPurple,
      variables: {
        colorPrimary: "#3b82f6",
        colorBackground: "#1a202c",
        colorInputBackground: "#2D3748",
        colorInputText: "#F3F4F6",
      },
      elements: {
        formButtonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
        card: "bg-gray-800",
        headerTitle: "text-blue-400",
        headerSubtitle: "text-gray-400",
      },
    }}>
      <html lang="en">
        <body className={`${inter.className} animated-dotted-background`}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {/* header */}
            <Header/>
            <main className="min-h-screen">{children}</main>
            <footer className="py-12 bg-gray-900">
              <div className=" text-center container mx-auto px-4 ">
                <p>Made by 0 Asif ahmed sahil - 2024</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
