import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
  title: "StackFuse - Lead Management",
  description: "Manage and track your leads efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50">
        <Sidebar>{children}</Sidebar>
         <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
