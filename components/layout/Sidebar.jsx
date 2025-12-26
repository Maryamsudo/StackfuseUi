"use client";

import { useState, useCallback } from "react";
import {
  LayoutDashboard,
  Upload,
  Users,
  Megaphone,
  Inbox,
  Sliders,
  Settings,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
export default function Sidebar({ children }) {
  const [openLeadSourcing, setOpenLeadSourcing] = useState(false);
  const [activeItem, setActiveItem] = useState("Attach CRM");
  const [tabletHover, setTabletHover] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCloseMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const SidebarContent = ({ isMini = false, isMobile = false }) => {
    return (
      <div
        className="h-full flex flex-col bg-[#F9FAFB]"
        onMouseEnter={() => isMini && setTabletHover(true)}
        onMouseLeave={() => isMini && setTabletHover(false)}
      >
        {/* LOGO */}
       <div className="h-14 flex items-center px-4 text-lg font-semibold text-gray-900">
      {!isMini || tabletHover ? "Stack Fusion" : "🖥"}
    </div>

   <div className="border-b" />


        {/* NAV */}
        <nav className="flex-1 px-1 py-4 space-y-1 text-sm overflow-y-auto">
          {/* DASHBOARD */}
          <div
            onClick={() => {
              setActiveItem("Dashboard");
              setMobileOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
              activeItem === "Dashboard"
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard size={16} />
            {(!isMini || tabletHover || isMobile) && "Dashboard"}
          </div>

          {/* LEAD SOURCING */}
          <div>
            <button
              onClick={() => setOpenLeadSourcing(!openLeadSourcing)}
              className="w-full flex items-center justify-between px-3 py-2 font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <span className="flex items-center gap-3">
                <Upload size={16} />
                {(!isMini || tabletHover || isMobile) && "Lead Sourcing"}
              </span>
              {(!isMini || tabletHover || isMobile) && (
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    openLeadSourcing ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {openLeadSourcing && (!isMini || tabletHover || isMobile) && (
              <div className="ml-6 mt-1 space-y-1">
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
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
                activeItem === label
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={16} />
              {(!isMini || tabletHover || isMobile) && label}
            </div>
          ))}
        </nav>
      </div>
    );
  };

  return (
  <div className="relative h-screen bg-gray-50"> 
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 border-r z-20">
        <SidebarContent />
      </aside>


      {/* Tablet Sidebar */}
      <aside
        className="hidden md:flex lg:hidden md:fixed md:inset-y-0 md:left-0 md:w-20 border-r bg-[#F9FAFB] z-20 transition-all duration-300"
      >
        <SidebarContent isMini />
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b flex items-center gap-3 px-4">
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          className="p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu size={22} />
        </button>
        <span className="font-semibold">Stack Fusion</span>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={handleCloseMobile}
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          role="presentation"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-[#F9FAFB] border-r transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="complementary"
      >
        <div className="flex justify-end p-4 border-b">
          <button
            onClick={handleCloseMobile}
            aria-label="Close navigation menu"
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
        <SidebarContent isMobile />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-20 lg:ml-64 pt-14 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}