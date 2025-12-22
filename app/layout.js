import "./globals.css";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <Sidebar />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="pt-14 md:pt-6 px-4 sm:px-6 lg:px-8 max-w-400 mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
