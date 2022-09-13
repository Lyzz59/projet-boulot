import { Role } from 'src/app/auth/models/Role';
import { RoleUser } from './RoleUser';
export interface User{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
    isActive: boolean;
}