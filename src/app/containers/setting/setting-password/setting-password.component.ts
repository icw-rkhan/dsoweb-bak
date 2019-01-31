import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../../../services';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'dso-setting-password',
  templateUrl: './setting-password.component.html',
  styleUrls: ['./setting-password.component.scss']
})
export class SettingPasswordComponent implements OnInit {

  form: FormGroup;

  isShowRequirement: boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService) {
    this.isShowRequirement = false;
  }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', Validators.compose([
        Validators.required
      ])],
      newPassword: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }

  get newPassword() {
    return this.form.get('newPassword');
  }

  onSubmit() {
    const body = {
      username: this.authService.getUserInfo().user_name,
      password: this.form.value.newPassword,
      old_password: this.form.value.oldPassword
    };

    this.authService.updatePassword(body).subscribe(res => {
      if (res.code === 0) {
        this.clear();

        this.alertService.successAlert('Changed successfully');
      } else {
        this.alertService.errorAlert('Changed failed');
      }
    });
  }

  clear() {
    this.form.reset();
  }

}
