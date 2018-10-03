import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import {ApiErrorService, AuthService} from '../../../services/index';
import {SharingService} from '../../../services/sharing.service';

@Component({
  selector: 'dso-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  email: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private apiError: ApiErrorService,
              private sharingService: SharingService) {
    this.sharingService.showLoading̣̣(true);
  }

  ngOnInit() {
    this.initForm();
    const queryParams = this.route.snapshot.queryParams;
    if (!queryParams.email) {
      this.router.navigate(['/auth', 'forgot-password']);
    }
    this.email = queryParams.email;
    setTimeout(() => {
      this.sharingService.showLoading̣̣(false);
    });
  }

  get email_token() {
    return this.form.get('email_token');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPass() {
    return this.form.get('confirmPass');
  }

  initForm() {
    this.form = this.fb.group({
      email_token: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      confirmPass: ['', Validators.compose([
        Validators.required
      ])]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(ac: AbstractControl) {
    const pass = ac.get('password').value;
    const confirmPass = ac.get('confirmPass').value;

    return pass === confirmPass ? null : ac.get('confirmPass').setErrors({ notSame: true });
  }

  onResetPwd() {
    this.sharingService.showLoading̣̣(true);
    this.authService.resetPassword({username: this.email, ...this.form.value}).subscribe(
      (data: any) => {
        if (!data.code) {
          this.authService.login({
            username: this.email,
            password: this.form.value.password,
          }).subscribe(
            (loginResponse: any) => {
              this.sharingService.showLoading̣̣(false);
              if (!data.code) {
                this.authService.loginSuccess(loginResponse);
                this.router.navigate(['/posts']);
              }
            }
          )
        } else {
          this.sharingService.showLoading̣̣(false);
          this.apiError.checkError(data.code, this.form.value, 'reset_password');
        }
      }
    )
  }
}
