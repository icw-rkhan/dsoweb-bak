import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { AuthService, ApiErrorService } from '../../../services/index';

@Component({
  selector: 'dso-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  isError: boolean;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiError: ApiErrorService
  ) {
    this.isError = false;
  }

  ngOnInit() {
    this.initForm();
  }

  get email() { return this.form.get('email'); }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])]
    });
  }

  sendEmail() {
    this.authService.sendEmail(this.form.value).subscribe(
      (data: any) => {
        if (!data.code) {
          //
        } else if (data.code === 1003) {
          this.isError = true;
        }
      }
    );
  }
}
