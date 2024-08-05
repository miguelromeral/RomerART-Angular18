import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function notValidValueValidator(
  notAllowed: string | number
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === notAllowed ? { notValidValue: true } : null;
  };
}
