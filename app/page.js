import LeadStats from "@/components/LeadStats";
import LeadsTable from "@/components/LeadsTable";

export default function Page() {
  return (
    <div className="space-y-8">
      <LeadStats />
      <LeadsTable />
    </div>
  );
}