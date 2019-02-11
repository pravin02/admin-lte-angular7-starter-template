import { AbstractControl } from "@angular/forms";

export function mobileNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    let value = control.value;
    if (value == undefined || value == null || value == '')
        return { 'mobilenumber': { value: 'Please enter mobile number' } };
    else if (value.length != 10)
        return { 'mobilenumber': { value: 'Mobile number must be 10 digit' } };
    else if (!/^[0-9]*$/.test(value))
        return { 'mobilenumber': { value: 'Mobile number must be digits only' } };
    return null;
}