import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static ValidatePasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirm_password')!.value;
    return pass === confirmPass ? null : { notSamePasswords: true };
  };

  static ValidateEmails: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let email = group.get('email')!.value;
    let confirmEmail = group.get('confirm_email')!.value;
    return email === confirmEmail ? null : { notSameEmails: true };
  };

  static ValidateFirstName(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control.root || !control.parent) {
        return null;
      }
      const regex = /^[a-zA-Z -]{1,15}$/;
      const first_name = control.value;
      if (!regex.test(first_name)) {
        return { invalidFirstName: true };
      }
      return null;

    }
  }

  static ValidateLastName(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control.root || !control.parent) {
        return null;
      }
      const regex = /^[a-zA-Z -]{1,40}$/;
      const last_name = control.value;
      if (!regex.test(last_name)) {
        return { invalidLastName: true };
      }
      return null;

    }
  }

  static ValidateMobileNumber(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      if (!control.root || !control.parent) {
        return null;
      }
      const regex = /^[0][0-9]{9}$/;
      const number = control.value;
      if (!regex.test(number)) {
        return { invalidMobileNumber: true };
      }
      return null;

    }
  }
}
