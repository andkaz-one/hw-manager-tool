export interface IUser {
    id?: string | number | null;
    name: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    active?: boolean; 
}