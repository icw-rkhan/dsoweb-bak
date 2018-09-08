import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

export function emailOrUrlValidator(control: AbstractControl): ValidationErrors | null {
  return ((!CustomValidators.email(control) || !CustomValidators.url(control)) ? null
    : {emailOrUrl: true});
}
