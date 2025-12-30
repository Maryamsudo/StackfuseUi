import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes user input to prevent XSS attacks and validate input
 * @param {string} input - The input string to sanitize
 * @param {number} maxLength - Maximum allowed length (default: 100)
 * @returns {string} - Sanitized input string
 */
export function sanitizeInput(input, maxLength = 100) {
  if (typeof input !== "string") {
    return "";
  }

  // Trim whitespace
  let sanitized = input.trim();

  // Remove HTML tags to prevent XSS
  sanitized = sanitized.replace(/<[^>]*>/g, "");

  // Remove potentially dangerous characters
  sanitized = sanitized.replace(/[<>\"']/g, "");

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}