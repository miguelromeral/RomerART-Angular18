import { FormGroup } from '@angular/forms';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';

export function getFormErrors(
  form: FormGroup,
  suffixError: string,
  pipe: CustomTranslatePipe
): string[] {
  const errores: string[] = [];
  Object.keys(form.controls).forEach(key => {
    const controlErrors = form.get(key)?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(errorKey => {
        switch (errorKey) {
          case 'required':
            errores.push(pipe.transform(`${suffixError}.REQUIRED`, { key }));
            break;
          case 'minlength':
            errores.push(
              pipe.transform(`${suffixError}.REQUIRED`, {
                key,
                value: controlErrors['minlength'].requiredLength,
              })
            );
            break;
          case 'min':
            errores.push(
              pipe.transform(`${suffixError}.MIN`, {
                key,
                value: controlErrors['min'].min,
              })
            );
            break;
          case 'max':
            errores.push(
              pipe.transform(`${suffixError}.MAX`, {
                key,
                value: controlErrors['max'].max,
              })
            );
            break;
        }
      });
    }
  });
  return errores;
}
