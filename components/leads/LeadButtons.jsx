"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import leadsDataImport from "@/data/leadstable.json";

export default function LeadButtons() {
  const handleExport = useCallback(() => {
    try {
      const leads = leadsDataImport || [];
      
      if (leads.length === 0) {
        alert("No leads to export.");
        return;
      }

      // Convert to CSV format
      const headers = ["Name", "Role", "Company", "Size", "Industry", "Status", "Source"];
      const csvRows = [
        headers.join(","),
        ...leads.map((lead) =>
          [
            `"${lead.name || ""}"`,
            `"${lead.role || ""}"`,
            `"${lead.company || ""}"`,
            `"${lead.size || ""}"`,
            `"${lead.industry || ""}"`,
            `"${lead.status || ""}"`,
            `"${lead.source || ""}"`,
          ].join(",")
        ),
      ];

      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      
      link.setAttribute("href", url);
      link.setAttribute("download", `leads_export_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting leads:", error);
      alert("Failed to export leads. Please try again.");
    }
  }, []);

  const handleAddLeads = useCallback(() => {
    // Placeholder function - to be connected to modal/API later
    // TODO: Open add leads modal or navigate to add leads page
    alert("Add Leads functionality will be implemented soon.");
    // Future implementation:
    // - Open a modal dialog
    // - Navigate to /leads/add page
    // - Or trigger an API call
  }, []);

  return (
    <div className="px-6 flex items-center justify-end gap-3">
      {/* Export Button */}
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        Export
      </Button>

      {/* Add Leads Button */}
      <Button 
        className="flex items-center gap-2"
        onClick={handleAddLeads}
      >
        <Plus className="h-4 w-4" />
        Add Leads
      </Button>
    </div>
  );
}
