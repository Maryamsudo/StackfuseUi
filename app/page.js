import LeadCard from "@/components/LeadCard";
import LeadsTable from "@/components/LeadsTable";

export default function Page() {
  return (
    <div className="space-y-8">
      <LeadCard />
      <LeadsTable />
    </div>
  );
}