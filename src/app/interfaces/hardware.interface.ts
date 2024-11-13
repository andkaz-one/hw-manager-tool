  
export interface Equipment {
    id: number;
    model: string;
    brand: string;
    serialNumber: string;
    repair: Repair | null;
    owner: Owner;
}


export interface Repair {
    id: number;
    status: RepairStatus;
    description: string;
    partsReplaced: string[];
    repairDate: Date;
    cost: number;
}

export enum RepairStatus {
    'NEW' = 'new',
    'INPROGRESS' = 'in-progress',
    'COMPLETE' = 'complete',
    'ARCHIVED' = 'archived'
}
  
export interface Owner {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
}
  