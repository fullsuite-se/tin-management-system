export interface TinData {
    tin: string;
    registeredName: string;
    address1: string;
    address2: string;
    isIndividual: boolean;
    isForeign: boolean;
    createdBy: string;
    createdAt: Date;
    editedBy?: string;
    editedAt?: Date;
}