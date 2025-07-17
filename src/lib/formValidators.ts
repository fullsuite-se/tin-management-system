export const validateTIN = (tin: string): boolean => {
    const tinRegex = /^\d{3}-\d{3}-\d{3}-\d{4}$/
    return tinRegex.test(tin)
}

export const validateIndividualName = (name: string): boolean => {
    const parts = name.split(",").map(part => part.trim());
    return (parts.length === 2 || parts.length === 3) && parts.every(part => part.length > 0);
};