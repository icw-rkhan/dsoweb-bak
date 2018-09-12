import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialog } from '@angular/material';

import { ApiService } from '../../../services/api/api.service';
import { TermPolicyDialogComponent } from '../../../shared/dialogs/term-policy-dialog/term-policy-dialog.component';

@Component({
  selector: 'dso-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  isShowPassword: boolean;
  is_student: any;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    private dialog: MatDialog
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

  initForm() {
    this.form = this.fb.group({
      full_name: ['', Validators.compose([
        Validators.required
      ])],
      is_student: [this.is_student],
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
    this.api.post(['userAccount', 'register'], Object.assign({}, this.form.value, { is_linkedin: 0 })).subscribe(
      (data: any) => {
        //
      }, (error: any) => {
        //
      }, () => {
        //
      }
    );
  }
}
