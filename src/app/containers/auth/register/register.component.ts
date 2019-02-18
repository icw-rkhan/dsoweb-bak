import {Component, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {CustomValidators} from 'ngx-custom-validators';
import {MatDialog} from '@angular/material';

import {TermPolicyDialogComponent} from '../../../shared/dialogs/term-policy-dialog/term-policy-dialog.component';
import {AuthService, ApiErrorService} from '../../../services/index';
import {SharingService} from '../../../services/sharing.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isShowPassword: boolean;
  isShowRequirement: boolean;
  is_student: number;
  is_linkedin: number;
  form: FormGroup;

  @ViewChild('registerContent') registerContent: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiError: ApiErrorService,
    private sharingService: SharingService) {
      this.sharingService.showLoading(true);
      this.isShowPassword = false;
      this.isShowRequirement = false;
  }

  ngOnInit() {
    this.is_student = +localStorage.getItem('is_student');
    this.initForm();
    setTimeout(() => {
      this.sharingService.showLoading(false);
    });

    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      this.registerContent.nativeElement.style.maxWidth = environment.fixedWidth;
    }
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

  get full_name() {
    return this.form.get('full_name');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

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
    this.sharingService.showLoading(true);
    this.form.value.username = this.form.value.username.toLowerCase();
    const subRegister = this.authService.register(this.form.value).subscribe(
      (data: any) => {
        this.sharingService.showLoading(false);
        if (!data.code) {
          this.authService.loginSuccess(data);

          subRegister.unsubscribe();
          this.router.navigate(['/posts']);
        } else {
          this.apiError.checkError(data.code, this.form.value, 'register');
        }
      },
      err => {
        this.sharingService.showLoading(false);
        subRegister.unsubscribe();
      }
    );
  }
}
