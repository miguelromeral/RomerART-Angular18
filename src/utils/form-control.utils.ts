import { FormGroup } from '@angular/forms';

export function getFormErrors(form: FormGroup): string[] {
  const errores: string[] = [];
  Object.keys(form.controls).forEach(key => {
    const controlErrors = form.get(key)?.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(errorKey => {
        switch (errorKey) {
          case 'required':
            errores.push(`${key} es requerido.`);
            break;
          case 'minlength':
            errores.push(
              `${key} debe tener al menos ${controlErrors['minlength'].requiredLength} caracteres.`
            );
            break;
          case 'email':
            errores.push(`${key} debe ser un email válido.`);
            break;
          case 'min':
            errores.push(
              `${key} debe ser al menos ${controlErrors['min'].min}.`
            );
            break;
          case 'max':
            errores.push(
              `${key} debe ser como mucho ${controlErrors['max'].max}.`
            );
            break;
        }
      });
    }
  });
  return errores;
}
