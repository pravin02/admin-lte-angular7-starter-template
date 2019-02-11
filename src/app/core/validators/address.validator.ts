import { AbstractControl } from "@angular/forms";

export function addressValidator(control: AbstractControl): { [key: string]: any } | null {
    let value = control.value;    
    if (value === null || value === undefined || value === '')
        return { 'address': { value: 'Please enter address' } };
    else if (!/^[A-Za-z0-9 , . - ' "]+$/.test(value))
        return { 'address': { value: `Special characters not allowed except ' ' & " "` } };
    return null;
}