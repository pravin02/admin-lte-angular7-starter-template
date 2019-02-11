import { City } from './city.model';

export interface Company {
    companyName: string;
    registeredNumber: string;
    contactNumber: string;
    alternateContactNumber: string;
    address: string;
    City: City;
    image? : string;
}