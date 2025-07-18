export interface TINEntry {
    id?: string
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

export type ModalState = {
    type: 'add' | 'edit' | 'view' | 'delete' | 'filter' | 'export' | null;
    entry: TINEntry | null;
};