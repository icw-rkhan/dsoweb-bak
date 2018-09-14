import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { AuthService, ApiErrorService } from '../../../services/index';

@Component({
  selector: 'dso-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  isShowPassword: boolean;
  is_student: any;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private apiError: ApiErrorService
  ) {
    this.isShowPassword = false;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params.is_student) {
          this.is_student = +params.is_student;
        }
        this.initForm();
      }
    );
  }

  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  initForm() {
    this.form = this.fb.group({
      username: ['h1078660929@163.com', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])],
      password: ['1QAZ2WSX', Validators.compose([
        Validators.required
      ])]
    });
  }

  submit() {
    this.authService.login(this.form.value).subscribe(
      (data: any) => {
        if (!data.code) {
          this.authService.loginSuccess(data);
          this.router.navigate(['/features', 'profile']);
        } else {
          this.apiError.checkError(data.code, this.form.value, 'login');
        }
      }
    );
  }
}
