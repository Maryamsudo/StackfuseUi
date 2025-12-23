"use client";
import { useState } from "react";
import {LayoutDashboard,Upload,Users,Megaphone,Inbox,Sliders,Settings,ChevronDown,Menu,X,ChevronRight,} from "lucide-react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function SidebarLayout({ children }) {
  const [openLeadSourcing, setOpenLeadSourcing] = useState(true);
  const [activeItem, setActiveItem] = useState("Attach CRM");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tabletHover, setTabletHover] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const SidebarContent = ({ isMini, isMobile }) => {
  const isCollapsed = isMini ? !tabletHover : sidebarCollapsed;
  const showText = isMobile || !isCollapsed;

    return (
      <div
        className={`${inter.className} h-full flex flex-col bg-[#F9FAFB]`}
        onMouseEnter={() => isMini && setTabletHover(true)}
        onMouseLeave={() => isMini && setTabletHover(false)}
      >
        {/* LOGO */}
        <div
          className={`flex items-center gap-3 px-3 py-4 ${
            showText ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center rounded-md bg-gray-900 text-white font-semibold">
              SF
            </div>
            {showText && (
              <span className="text-lg font-semibold text-gray-900">
                Stack Fusion
              </span>
            )}
          </div>

          {!isMini && !isMobile && showText && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-gray-200 rounded transition-colors shrink-0"
            >
              <ChevronRight
                size={18}
                className={`transition-transform duration-300 ${
                  sidebarCollapsed ? "" : "rotate-180"
                }`}
              />
            </button>
          )}
        </div>

        <div className="border-b" />

        {/* NAV */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 text-sm overflow-y-auto">
          {/* DASHBOARD */}
          <div
            onClick={() => {
              setActiveItem("Dashboard");
              setMobileOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer ${
              activeItem === "Dashboard"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            } ${!showText ? "justify-center" : ""}`}
            title={!showText ? "Dashboard" : ""}
          >
            <LayoutDashboard size={20} />
            {showText && "Dashboard"}
          </div>

          {/* LEAD SOURCING */}
          <div>
            <button
              onClick={() => setOpenLeadSourcing(!openLeadSourcing)}
              className={`w-full flex items-center px-3 py-2.5 font-medium text-gray-700 rounded-md hover:bg-gray-100 ${
                !showText ? "justify-center" : "justify-between"
              }`}
              title={!showText ? "Lead Sourcing" : ""}
            >
              <span className="flex items-center gap-3">
                <Upload size={20} />
                {showText && "Lead Sourcing"}
              </span>
              {showText && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openLeadSourcing ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {openLeadSourcing && showText && (
              <div className="ml-6 mt-0.5 space-y-0.5">
                {[
                  { label: "Manual Upload", icon: "/icons/Manualupload.png" },
                  { label: "Attach CRM", icon: "/icons/Crm.png" },
                  { label: "Sales Navigator", icon: "/icons/Sales.png" },
                  { label: "Fetch from Apollo", icon: "/icons/fetch.png" },
                ].map((item) => (
                  <div
                    key={item.label}
                    onClick={() => {
                      setActiveItem(item.label);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
                      activeItem === item.label
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <img src={item.icon} alt={item.label} className="h-4 w-4" />
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* OTHER LINKS */}
          {[
            ["Lead Management", Users],
            ["Campaigns", Megaphone],
            ["Inbox", Inbox],
            ["Optimization", Sliders],
            ["Settings", Settings],
          ].map(([label, Icon]) => (
            <div
              key={label}
              onClick={() => {
                setActiveItem(label);
                setMobileOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer ${
                activeItem === label
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } ${!showText ? "justify-center" : ""}`}
              title={!showText ? label : ""}
            >
              <Icon size={20} />
              {showText && label}
            </div>
          ))}
        </nav>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside
  onClick={() => {
    if (sidebarCollapsed) setSidebarCollapsed(false);
  }}
  className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 bg-[#F9FAFB] z-20 transition-all duration-300 cursor-pointer ${
    sidebarCollapsed ? "lg:w-20 border-r-2" : "lg:w-64 border-r"
  }`}
>
  <SidebarContent />
</aside>


      {/* Tablet Sidebar */}
      <aside
        className={`hidden md:flex lg:hidden md:fixed md:inset-y-0 md:left-0 bg-[#F9FAFB] z-20 transition-all duration-300 ${
          tabletHover ? "md:w-64 border-r" : "md:w-20 border-r-2"
        }`}
      >
        <SidebarContent isMini />
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b flex items-center gap-3 px-4">
        <button onClick={() => setMobileOpen(true)}>
          <Menu size={22} />
        </button>
        <span className="font-semibold">Stack Fusion</span>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#F9FAFB] border-r transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 border-b">
          <button onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <SidebarContent isMobile />
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 pt-14 overflow-y-auto transition-all duration-300 ${
          sidebarCollapsed ? "md:ml-20 lg:ml-20" : "md:ml-20 lg:ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
