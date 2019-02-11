export interface User {
    fullName: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    dateOfBirth?: string;
    mobileNumber?: string;
    address?: string;
    remember?: boolean;
    image?: string;
}