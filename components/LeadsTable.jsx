"use client";

import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {  DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import { MessageSquare, Phone, Linkedin, MoreHorizontal } from "lucide-react";
const leads = [
  {
    name: "Sarah Johnson",
    role: "VP of Sales",
    initials: "SJ",
    company: "Acme Corporation",
    size: "500-1000",
    industry: "Technology",
    status: "Hot",
    source: "LinkedIn",
    enriched: true,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    initials: "MC",
    company: "TechFlow Inc",
    size: "100-500",
    industry: "Software",
    status: "Warm",
    source: "Apollo",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    initials: "ER",
    company: "Growth Labs",
    size: "50-100",
    industry: "Marketing",
    status: "Cold",
    source: "Manual",
  },
];
const statusClasses = {
  Hot: "bg-red-100 text-red-600",
  Warm: "bg-orange-100 text-orange-600",
  Cold: "bg-blue-100 text-blue-600",
};

export default function LeadsTable() {
  return (
   <main className="w-full">
      {/* DESKTOP TABLE */}
      <div className="hidden sm:block rounded-xl border bg-white">
        <div className="border-b px-4 py-4">
          <h2 className="text-lg font-semibold">Leads</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Industry
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Source
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {leads.map((lead, index) => (
                <TableRow key={index} className="hover:bg-muted/30">
                  <TableCell>
                    <Checkbox />
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">
                      <Avatar className="h-9 w-9 bg-indigo-100">
                        <AvatarFallback className="font-semibold text-indigo-600">
                          {lead.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2 font-medium">
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
                    <p className="font-medium">{lead.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.size}
                    </p>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline">{lead.industry}</Badge>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[lead.status]}`}
                    >
                      {lead.status}
                    </span>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
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
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
        {leads.map((lead, index) => (
          <div key={index} className="rounded-xl border bg-white p-4">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 bg-indigo-100">
                <AvatarFallback className="font-semibold text-indigo-600">
                  {lead.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className="font-medium">{lead.name}</p>
                <p className="text-xs text-muted-foreground">
                  {lead.role}
                </p>
              </div>

              <span
                className={`h-fit rounded-full px-2 py-1 text-xs ${statusClasses[lead.status]}`}
              >
                {lead.status}
              </span>
            </div>

            <div className="mt-3 text-sm">
              <p className="font-medium">{lead.company}</p>
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
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
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
