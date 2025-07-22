export interface User {
    name: string,
    email: string,
    avatar: string,
}

export const ALLOWED_DOMAINS = [
    "getfullsuite.com", "viascari.com", "teetalk.ph", "envieph.com", "baopets.com",
] as const;

export type AllowedDomain = typeof ALLOWED_DOMAINS[number];