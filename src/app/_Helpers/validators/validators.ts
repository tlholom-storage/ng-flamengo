import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirm_password')!.value;
    return pass === confirmPass ? null : { notSamePasswords: true };
  };

  static checkEmails: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let email = group.get('email')!.value;
    let confirmEmail = group.get('confirm_email')!.value;
    return email === confirmEmail ? null : { notSameEmails: true };
  };
}
