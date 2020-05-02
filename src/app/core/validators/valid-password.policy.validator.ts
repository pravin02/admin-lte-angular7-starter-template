import { AbstractControl } from '@angular/forms';

// Regex Creation Guide for password policy
//  (?=.*?[a-z])              // should contain at least one lower case
//  (?=.*?[A-Z])              // should contain at least one upper case
//  (?=.*?[0-9])              // should contain at least one digit
//  (?=.*?[#?!@$%^&*-])       // should contain at least one special characters
//  {8,}                      // should contain at least 8 from the mentioned characters

export function ValidatePasswordPolicy(control: AbstractControl) {
    if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(control.value)) {
        var i = control.value.length;
        let isBackslashExists = false;
        console.log(control.value);
        while (i--) {
            if (control.value.charAt(i) == '\\') {
                isBackslashExists = true;
                console.log(control.value.charAt(i));
                break;
            }
        }
        if (isBackslashExists)
            return { 'wrong': { value: 'Please enter valid password' } };
        else return null;
    }
    return { 'wrong': { value: 'Please enter valid password' } };
}
