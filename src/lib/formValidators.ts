export const validateTIN = (tin: string): null | string => {
    if (tin.trim() === "") {
        return "TIN Number is required"
    }

    const tinRegex = /^\d{3}-\d{3}-\d{3}-\d{4}$/
    return tinRegex.test(tin) ? null : "Must be 13 digits (XXX-XXX-XXX-XXXX)"
}

export const validateName = (name: string, type: string): null | string => {
    if (name.trim() === "") {
        return type === "Company"
            ? "Company name is required"
            : "Full name is required";
    }

    if (type === "Individual") {
        const parts = name.split(",").map(part => part.trim());

        if ((parts.length === 2 || parts.length === 3) && parts.every(part => part.length > 0)) {
            return null;
        }
        return "Incorrect name format"
    }

    return null;
};