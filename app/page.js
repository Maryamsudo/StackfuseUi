import LeadCard from "@/components/LeadCard";
import LeadsTable from "@/components/LeadsTable";
import LeadSearchFilter from "@/components/LeadSearchFilter";
import LeadHeading from "@/components/LeadHeading";
import LeadButtons from "@/components/LeadButtons";

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
    
      <div className="flex items-center justify-between ">
        <LeadHeading>Lead Management</LeadHeading>
        <LeadButtons />
      </div>

      {/* BELOW CONTENT */}
      <div className=" px-4"> 
      <LeadCard />
      <LeadSearchFilter />
      </div>
      <LeadsTable />

    </div>
  );
}
