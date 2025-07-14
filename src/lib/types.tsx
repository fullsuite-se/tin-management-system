export interface TINEntry {
    id: string
    tin: string
    registeredName: string
    address1: string
    address2: string
    isIndividual: boolean
    isForeign: boolean
    createdBy: string
    createdAt: Date
    editedBy?: string
    editedAt?: Date
}

export interface User {
    name: string,
    email: string,
    avatar: string,
}

export type ModalState = {
    type: 'add' | 'edit' | 'view' | 'delete' | 'filter' | null;
    entry: TINEntry | null;
};