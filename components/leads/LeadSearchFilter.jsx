"use client";

import { useState, useCallback, useMemo } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { STATUS_OPTIONS, SOURCE_OPTIONS, INDUSTRY_OPTIONS } from "@/lib/constants";
import { sanitizeInput } from "@/lib/utils";

export default function LeadSearchFilter({ onFilterChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedIndustry, setSelectedIndustry] = useState("all");

  const handleFilterChange = useCallback((updates = {}) => {
    if (onFilterChange) {
      onFilterChange({
        search: updates.search !== undefined ? updates.search : searchQuery,
        status: updates.status !== undefined ? updates.status : selectedStatus,
        source: updates.source !== undefined ? updates.source : selectedSource,
        industry: updates.industry !== undefined ? updates.industry : selectedIndustry,
      });
    }
  }, [onFilterChange, searchQuery, selectedStatus, selectedSource, selectedIndustry]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedStatus("all");
    setSelectedSource("all");
    setSelectedIndustry("all");
    if (onFilterChange) {
      onFilterChange({
        search: "",
        status: "all",
        source: "all",
        industry: "all",
      });
    }
  }, [onFilterChange]);

  const handleSearchChange = useCallback((e) => {
    const rawValue = e.target.value;
    // Sanitize input before using it
    const sanitizedValue = sanitizeInput(rawValue, 100);
    setSearchQuery(sanitizedValue);
    handleFilterChange({ search: sanitizedValue });
  }, [handleFilterChange]);

  const handleStatusChange = useCallback((e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    handleFilterChange({ status: value });
  }, [handleFilterChange]);

  const handleSourceChange = useCallback((e) => {
    const value = e.target.value;
    setSelectedSource(value);
    handleFilterChange({ source: value });
  }, [handleFilterChange]);

  const handleIndustryChange = useCallback((e) => {
    const value = e.target.value;
    setSelectedIndustry(value);
    handleFilterChange({ industry: value });
  }, [handleFilterChange]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    handleFilterChange({ search: "" });
  }, [handleFilterChange]);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  const activeFiltersCount = useMemo(
    () =>
      (selectedStatus !== "all" ? 1 : 0) +
      (selectedSource !== "all" ? 1 : 0) +
      (selectedIndustry !== "all" ? 1 : 0),
    [selectedStatus, selectedSource, selectedIndustry]
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      {/* Search and Filter Toggle Row */}
     <div className="flex flex-col sm:flex-row sm:justify-between gap-3">

        {/* Search Input */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, company, or email..."
            value={searchQuery}
            onChange={handleSearchChange}
            maxLength={100}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={toggleFilters}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors relative"
        >
          <Filter size={18} />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
            <select
              value={selectedSource}
              onChange={handleSourceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SOURCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select
              value={selectedIndustry}
              onChange={handleIndustryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {INDUSTRY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={activeFiltersCount === 0 && !searchQuery}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
