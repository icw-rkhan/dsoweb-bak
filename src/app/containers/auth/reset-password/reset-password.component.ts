import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { AuthService, ApiErrorService } from '../../../services/index';

@Component({
  selector: 'dso-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private apiError: ApiErrorService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
  }
}
