import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import {ApiErrorService, AuthService} from '../../../services/index';
import {SharingService} from '../../../services/sharing.service';

@Component({
  selector: 'dso-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private apiError: ApiErrorService,
              private sharingService: SharingService) {
    this.sharingService.showLoading̣̣(true);
  }

  ngOnInit() {
    this.initForm();
    setTimeout(() => {
      this.sharingService.showLoading̣̣(false);
    });
  }

  initForm() {
    this.form = this.fb.group({
      old_password: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      confirmPass: ['']
    }, { Validators: this.checkPasswords });
  }

  checkPasswords() {
    const pass = this.form.controls.password.value;
    const confirmPass = this.form.controls.confirmPass.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  onResetPwd() {
    this.sharingService.showLoading̣̣(true);
    this.router.navigate(['/auth', 'login']);
  }
}
