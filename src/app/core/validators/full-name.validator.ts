import { AbstractControl } from '@angular/forms';

export function fullNameValidator(control: AbstractControl): { [key: string]: any } | null {
    let value = control.value;
    if (value == undefined || value == null || value == '')
        return { 'fullname': { value: 'Please enter full name' } };
    else if (!/^[A-Za-z ]+$/.test(value))
        return { 'fullname': { value: 'Special characters not allowed except space' } };
    return null;
}