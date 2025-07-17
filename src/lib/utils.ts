import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {ALLOWED_DOMAINS, type AllowedDomain} from "../types/user.ts";

interface GoogleJwtPayload {
    name: string;
    email: string;
    picture: string;
}

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

export function isEmailAllowed(email: string): boolean {
    const domain = email.split("@")[1]?.toLowerCase();
    return ALLOWED_DOMAINS.includes(domain as AllowedDomain);
}

export function formatTIN(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 13)
    let formatted = ""
    for (let i = 0; i < digits.length; i++) {
        if (i === 3 || i === 6 || i === 9) formatted += "-"
        formatted += digits[i]
    }
    return formatted
}

export function validateTIN(tin: string): boolean {
    // TIN format: xxx-xxx-xxx-xxxx (TIN with branch code)
    const tinRegex = /^\d{3}-\d{3}-\d{3}-\d{4}$/
    return tinRegex.test(tin)
}

export function parseJwt(token: string): GoogleJwtPayload {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
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