import { mobileNumberValidator } from './mobile-number.validator';
import { addressValidator } from './address.validator';
import { fullNameValidator } from './full-name.validator';
import { confirmPasswordValidator } from './confirm-password.validator';

export class CustomValidators {
    public static readonly mobileNumber = mobileNumberValidator;
    public static readonly address = addressValidator;
    public static readonly fullName = fullNameValidator;
    public static readonly confirmPassword = confirmPasswordValidator;
}