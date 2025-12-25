import LeadCard from "@/components/leads/LeadCard";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadSearchFilter from "@/components/leads/LeadSearchFilter";
import LeadHeading from "@/components/leads/LeadHeading";
import LeadButtons from "@/components/leads/LeadButtons";

export default function Page() {
  return (
  <div className="flex flex-col h-screen bg-gray-50">

  {/* HEADER */}
  <header className="sticky top-0 z-40 bg-white border-b">
  <div className="flex items-center justify-between px-4 sm:px-6">
  <LeadHeading>Lead Management</LeadHeading>
  <LeadButtons />
  </div>
  </header>

  {/* MAIN CONTENT */}
  <main className="flex flex-col gap-4 px-4 pb-6">
  <LeadCard />
  <LeadSearchFilter />
  <LeadsTable />
  </main>
  </div>
  );
}
