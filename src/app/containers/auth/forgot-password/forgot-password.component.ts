import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { AuthService, ApiErrorService } from '../../../services/index';

@Component({
  selector: 'dso-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiError: ApiErrorService
  ) { }

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
        console.log(data);
      }
    );
  }
}
