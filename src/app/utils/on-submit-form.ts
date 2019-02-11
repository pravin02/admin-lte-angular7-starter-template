import { FormGroup } from '@angular/forms';

export function onSubmitFormGroup(formGroup: FormGroup) {
    if (formGroup.invalid) {
        Object.keys(formGroup.controls).forEach(field => { // {1}
            const control = formGroup.get(field);            // {2}
            control.markAsTouched({ onlySelf: true });       // {3}
        });
        return;

    }
}