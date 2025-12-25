import LeadCard from "@/components/LeadCard";
import LeadsTable from "@/components/LeadsTable";
import LeadSearchFilter from "@/components/LeadSearchFilter";
import LeadHeading from "@/components/LeadHeading";
import LeadButtons from "@/components/LeadButtons";

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-grey"> 

      {/* HEADER */}
    <div className="sticky top-0 z-40 bg-white border-b">
    <div className="flex items-center justify-between px-4 sm:px-6">
    <LeadHeading >Lead Management</LeadHeading>
    <LeadButtons />
    </div>
    </div>

   {/* Main CONTENT */}
   <div className=" px-4 flex flex-col gap-4  pb-6 "> 
   <LeadCard />
   <LeadSearchFilter />
   <LeadsTable />
    </div>
    </div>
  );
}
