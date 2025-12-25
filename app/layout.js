import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50">
        <Sidebar />
    <main className="flex-1  overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
