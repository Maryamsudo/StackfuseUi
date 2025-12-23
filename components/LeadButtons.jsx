"use client";

import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export default function LeadButtons() {
  return (
    <div className="px-6 flex items-center justify-end gap-3">
      {/* Export Button */}
      <Button
        variant="outline"
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>

      {/* Add Leads Button */}
      <Button className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Leads
      </Button>
    </div>
  );
}
