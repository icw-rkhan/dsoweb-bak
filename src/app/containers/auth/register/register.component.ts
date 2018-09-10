import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { ApiService } from '../../../services/api/api.service';

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
    private fb: FormBuilder
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
    console.log(this.form.value);
    this.api.post(['userAccount', 'register'], this.form.value).subscribe(
      (data: any) => {

      }, (error: any) => {
        //
      }, () => {
        //
      }
    );
  }
}
