import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { TINEntry } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

export function validateTIN(tin: string): boolean {
  // TIN format: xxx-xxx-xxx-xxxx (TIN with branch code)
  const tinRegex = /^\d{3}-\d{3}-\d{3}-\d{4}$/
  return tinRegex.test(tin)
}

export function validateEmailDomain(email: string): boolean {
  const allowedDomains = ["getfullsuite.com", "viascari.com"]
  const domain = email.split("@")[1]?.toLowerCase()
  return allowedDomains.includes(domain)
}

export function validateAddress(address1: string, address2: string): boolean {
  // At least one address field must be filled
  return address1.trim() !== "" || address2.trim() !== ""
}

// Generate mock data matching the design
export function generateMockData(): TINEntry[] {
  const companies = [
    "Philippine British Assurance Company, Inc.",
    "Viascari Pte Ltd.",
    "Leonhard Trinidad Leung",
    "ABC Corporation",
    "XYZ Holdings Inc.",
    "Manila Business Center",
    "Cebu Trading Company",
    "Davao Enterprises Ltd.",
    "Metro Manila Corp.",
    "Island Properties Inc.",
  ]

  const addresses = [
    {
      address1: "52 2F ALMANZA SQUARE BLDG. 490 ALABANG-ZAPOTE RD. ALMANZA UNO",
      address2: "LAS PINAS CITY",
    },
    {
      address1: "RIMANDO AURORA HILL",
      address2: "BAGUIO CITY 2600",
    },
    {
      address1: "123 Ayala Avenue, Makati CBD",
      address2: "Makati City, Metro Manila, 1200",
    },
    {
      address1: "456 EDSA, Ortigas Center",
      address2: "Pasig City, Metro Manila, 1605",
    },
    {
      address1: "789 Bonifacio Drive, BGC",
      address2: "Taguig City, Metro Manila, 1634",
    },
  ]

  const mockEntries: TINEntry[] = []

  for (let i = 1; i <= 50; i++) {
    const isIndividual = Math.random() > 0.7
    const isForeign = Math.random() > 0.8
    const createdDaysAgo = Math.floor(Math.random() * 365)
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - createdDaysAgo)

    const addressIndex = Math.floor(Math.random() * addresses.length)

    mockEntries.push({
      id: i.toString(),
      tin: `${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      registeredName: companies[Math.floor(Math.random() * companies.length)],
      address1: addresses[addressIndex].address1,
      address2: addresses[addressIndex].address2,
      isIndividual,
      isForeign,
      createdBy: "admin@getfullsuite.com",
      createdAt,
      editedBy: Math.random() > 0.7 ? "admin@getfullsuite.com" : undefined,
      editedAt:
          Math.random() > 0.7 ? new Date(createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000) : undefined,
    })
  }

  return mockEntries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}
