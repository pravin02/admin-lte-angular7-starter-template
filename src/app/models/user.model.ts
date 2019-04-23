import { UserRole } from './user.role';

export interface User {
    fullName: string;
    email: string;
    password?: string;
    newPassword?: string;
    dateOfBirth?: string;
    mobileNumber?: string;
    address?: string;
    remember?: boolean;
    image?: string;
    role?: UserRole;
}