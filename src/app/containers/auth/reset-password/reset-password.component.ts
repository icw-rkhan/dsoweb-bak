import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ApiErrorService, AuthService} from '../../../services/index';
import {SharingService} from '../../../services/sharing.service';

@Component({
  selector: 'dso-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
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
  }
}
