// Lead Status Constants
export const LEAD_STATUS = {
  HOT: "Hot",
  WARM: "Warm",
  COLD: "Cold",
};

// Status filter values (lowercase for form inputs)
export const STATUS_FILTER_VALUES = {
  ALL: "all",
  HOT: "hot",
  WARM: "warm",
  COLD: "cold",
};

// Status CSS classes mapping
export const STATUS_CLASSES = {
  [LEAD_STATUS.HOT]: "bg-red-100 text-red-600",
  [LEAD_STATUS.WARM]: "bg-orange-100 text-orange-600",
  [LEAD_STATUS.COLD]: "bg-blue-100 text-blue-600",
};

// Lead Source Constants
export const LEAD_SOURCE = {
  LINKEDIN: "LinkedIn",
  APOLLO: "Apollo",
  MANUAL: "Manual",
};

// Source filter values (lowercase for form inputs)
export const SOURCE_FILTER_VALUES = {
  ALL: "all",
  LINKEDIN: "linkedin",
  APOLLO: "apollo",
  MANUAL: "manual",
};

// Industry Constants
export const INDUSTRY = {
  TECHNOLOGY: "Technology",
  SOFTWARE: "Software",
  MARKETING: "Marketing",
  FINANCE: "Finance",
};

// Industry filter values (lowercase for form inputs)
export const INDUSTRY_FILTER_VALUES = {
  ALL: "all",
  TECHNOLOGY: "technology",
  SOFTWARE: "software",
  MARKETING: "marketing",
  FINANCE: "finance",
};

// Status options for dropdowns
export const STATUS_OPTIONS = [
  { value: STATUS_FILTER_VALUES.ALL, label: "All Status" },
  { value: STATUS_FILTER_VALUES.HOT, label: LEAD_STATUS.HOT },
  { value: STATUS_FILTER_VALUES.WARM, label: LEAD_STATUS.WARM },
  { value: STATUS_FILTER_VALUES.COLD, label: LEAD_STATUS.COLD },
];

// Source options for dropdowns
export const SOURCE_OPTIONS = [
  { value: SOURCE_FILTER_VALUES.ALL, label: "All Sources" },
  { value: SOURCE_FILTER_VALUES.LINKEDIN, label: LEAD_SOURCE.LINKEDIN },
  { value: SOURCE_FILTER_VALUES.APOLLO, label: LEAD_SOURCE.APOLLO },
  { value: SOURCE_FILTER_VALUES.MANUAL, label: LEAD_SOURCE.MANUAL },
];

// Industry options for dropdowns
export const INDUSTRY_OPTIONS = [
  { value: INDUSTRY_FILTER_VALUES.ALL, label: "All Industries" },
  { value: INDUSTRY_FILTER_VALUES.TECHNOLOGY, label: INDUSTRY.TECHNOLOGY },
  { value: INDUSTRY_FILTER_VALUES.SOFTWARE, label: INDUSTRY.SOFTWARE },
  { value: INDUSTRY_FILTER_VALUES.MARKETING, label: INDUSTRY.MARKETING },
  { value: INDUSTRY_FILTER_VALUES.FINANCE, label: INDUSTRY.FINANCE },
];

