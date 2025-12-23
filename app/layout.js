import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 md:ml-6 lg:ml-12 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
