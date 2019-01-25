import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'dso-setting-password',
  templateUrl: './setting-password.component.html',
  styleUrls: ['./setting-password.component.scss']
})
export class SettingPasswordComponent implements OnInit {

  form: FormGroup;

  isShowRequirement: boolean;

  constructor(private fb: FormBuilder) {
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

}
