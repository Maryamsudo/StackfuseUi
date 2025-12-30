"use client";

import { useState, useEffect, useMemo } from "react";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu,DropdownMenuContent, DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { MessageSquare, Phone, Linkedin, MoreHorizontal, AlertCircle } from "lucide-react";
import { STATUS_CLASSES } from "@/lib/constants";

// Static import - will fail at build time if file doesn't exist
// Runtime validation added in component
import leadsDataImport from "@/data/leadstable.json";

export default function LeadsTable({ filters = { search: "", status: "all", source: "all", industry: "all" } }) {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = leadsDataImport || [];
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format: expected an array");
      }
      if (data.length === 0) {
        setError("No leads data available.");
      } else {
        setLeads(data);
        setError(null);
      }
    } catch (err) {
      console.error("Error processing leads data:", err);
      setError("Failed to load leads data. Please try refreshing the page.");
      setLeads([]);
    }
  }, []);

  // Filter leads based on search and filter criteria
  const filteredLeads = useMemo(() => {
    if (!leads || leads.length === 0) return [];

    return leads.filter((lead) => {
      // Search filter - case-insensitive search in name, company, and role
      const searchLower = (filters.search || "").toLowerCase().trim();
      if (searchLower) {
        const matchesSearch =
          (lead.name || "").toLowerCase().includes(searchLower) ||
          (lead.company || "").toLowerCase().includes(searchLower) ||
          (lead.role || "").toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (filters.status && filters.status !== "all") {
        const leadStatus = (lead.status || "").toLowerCase();
        if (leadStatus !== filters.status.toLowerCase()) return false;
      }

      // Source filter
      if (filters.source && filters.source !== "all") {
        const leadSource = (lead.source || "").toLowerCase();
        if (leadSource !== filters.source.toLowerCase()) return false;
      }

      // Industry filter
      if (filters.industry && filters.industry !== "all") {
        const leadIndustry = (lead.industry || "").toLowerCase();
        if (leadIndustry !== filters.industry.toLowerCase()) return false;
      }

      return true;
    });
  }, [leads, filters.search, filters.status, filters.source, filters.industry]);

  if (error) {
    return (
      <main className="w-full">
        <div className="rounded-xl border bg-white p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Leads</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!leads || leads.length === 0) {
    return (
      <main className="w-full">
        <div className="rounded-xl border bg-white p-8">
          <div className="text-center">
            <p className="text-gray-600">No leads found.</p>
          </div>
        </div>
      </main>
    );
  }

  if (filteredLeads.length === 0) {
    return (
      <main className="w-full">
        <div className="rounded-xl border bg-white p-8">
          <div className="text-center">
            <p className="text-gray-600">No leads match your filters.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full">
      {/* DESKTOP TABLE */}
      <div className="hidden sm:block rounded-xl border bg-white">
        <div className="border-b px-4 py-4">
          <h2 className="text-base font-semibold">Leads</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead className="text-xs font-medium">Lead</TableHead>
                <TableHead className="text-xs font-medium">Company</TableHead>
                <TableHead className="hidden lg:table-cell text-xs font-medium">
                  Industry
                </TableHead>
                <TableHead className="text-xs font-medium">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-xs font-medium">
                  Source
                </TableHead>
                <TableHead className="text-center text-xs font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={`${lead.name}-${lead.company}`} className="hover:bg-muted/30">
                  <TableCell>
                    <Checkbox />
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9 bg-indigo-100">
                        <AvatarFallback className="text-xs font-semibold text-indigo-600">
                          {lead.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {lead.name}
                          {lead.enriched && (
                            <Badge variant="secondary" className="text-xs">
                              Enriched
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {lead.role}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-sm font-medium">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.size}
                    </p>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline" className="text-xs">
                      {lead.industry}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLASSES[lead.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {lead.status}
                    </span>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-sm">
                    {lead.source}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-3">
                      <MessageSquare className="h-4 w-4 cursor-pointer" />
                      <Phone className="h-4 w-4 cursor-pointer" />
                      <Linkedin className="h-4 w-4 cursor-pointer" />

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button>
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-sm">
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sm text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MOBILE CARDS */}
      <div className="sm:hidden space-y-4">
        {filteredLeads.map((lead) => (
          <div key={`${lead.name}-${lead.company}`} className="rounded-xl border bg-white p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-indigo-100">
                <AvatarFallback className="text-sm font-semibold text-indigo-600">
                  {lead.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="text-sm font-medium">{lead.name}</p>
                <p className="text-xs text-muted-foreground">
                  {lead.role}
                </p>
              </div>

              <span
                className={`h-fit rounded-full px-2 py-1 text-xs font-medium ${STATUS_CLASSES[lead.status] || "bg-gray-100 text-gray-600"}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="mt-3">
              <p className="text-sm font-medium">{lead.company}</p>
              <p className="text-xs text-muted-foreground">
                {lead.size} • {lead.industry} • {lead.source}
              </p>
            </div>

            <div className="mt-3 flex justify-between border-t pt-2">
              <div className="flex gap-4">
                <MessageSquare className="h-4 w-4" />
                <Phone className="h-4 w-4" />
                <Linkedin className="h-4 w-4" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-xs">
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs text-red-600">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
