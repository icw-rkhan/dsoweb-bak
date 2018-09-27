import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {Router} from '@angular/router';

import {AuthService} from '../../../services/index';
import {SharingService} from '../../../services/sharing.service';

@Component({
  selector: 'dso-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  isError: boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private sharingService: SharingService) {
    this.sharingService.showLoading̣̣(true);
    this.isError = false;
  }

  ngOnInit() {
    this.initForm();
    setTimeout(() => {
      this.sharingService.showLoading̣̣(false);
    });
  }

  get email() {
    return this.form.get('email');
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        CustomValidators.email
      ])]
    });
  }

  sendEmail() {
    this.sharingService.showLoading̣̣(true);
    this.authService.sendEmail(this.form.value).subscribe(
      (data: any) => {
        if (!data.code) {
          this.router.navigate(['/auth', 'reset-password']);
        } else if (data.code === 1003) {
          this.isError = true;
        }
        this.sharingService.showLoading̣̣(false);
      }
    );
  }
}
