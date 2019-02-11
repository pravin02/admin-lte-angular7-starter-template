import { AbstractControl } from "@angular/forms";

export function confirmPasswordValidator(control: AbstractControl): { [key: string]: any } | null {
    let passwordValue = control.get('password').value;
    let confirmPasswordValue = control.get('confirmPassword').value;
    if (passwordValue != confirmPasswordValue)
        return { 'mismatch': { value: confirmPasswordValue } };
    return null;
}