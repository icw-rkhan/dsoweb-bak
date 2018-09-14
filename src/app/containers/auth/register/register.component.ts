import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialog } from '@angular/material';

import { AuthService, ApiErrorService } from '../../../services/index';
import { TermPolicyDialogComponent } from '../../../shared/dialogs/term-policy-dialog/term-policy-dialog.component';

@Component({
  selector: 'dso-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  isShowPassword: boolean;
  is_student: number;
  is_linkedin: number;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
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

  showDialog(type: string) {
    this.dialog.open(TermPolicyDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        type: type
      }
    });
  }

  get full_name() { return this.form.get('full_name'); }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

  initForm() {
    this.form = this.fb.group({
      full_name: ['', Validators.compose([
        Validators.required
      ])],
      is_student: [this.is_student],
      is_linkedin: [1],
      username: ['', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  submit() {
    this.authService.register(this.form.value).subscribe(
      (data: any) => {
        if (!data.code) {
          this.authService.loginSuccess(data);
          this.router.navigate(['/features', 'profile']);
        } else {
          this.apiError.checkError(data.code, this.form.value, 'register');
        }
      }
    );
  }
}
