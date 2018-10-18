import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';

import { SharingService } from '../../../services/sharing.service';
import { ApiErrorService, AuthService } from '../../../services';
import { LinkedInService } from 'angular-linkedin-sdk';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { AlertDialogComponent } from '../../../shared/dialogs/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dso-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  checkIsStudent: boolean;
  isShowPassword: boolean;
  is_student: any;
  form: FormGroup;
  isUserAuthenticated: Observable<boolean>;
  isInitialized: Observable<boolean>;
  isUserAuthenticatedEmittedValue: boolean;
  isInitializedEmittedValue: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private apiError: ApiErrorService,
              private sharingService: SharingService,
              private linkedInService: LinkedInService,
              private dialog: MatDialog,
              private http: HttpClient) {
    this.sharingService.showLoading̣̣(true);
    this.isShowPassword = false;
    this.checkIsStudent = false;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const code = params['code'];  // login with linkedin
      if (code && code !== '') {
        this.getAccessToken(code);
      }
    });
    this.initForm();
    this.is_student = +localStorage.getItem('is_student');
    setTimeout(() => {
      this.sharingService.showLoading̣̣(false);
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  initForm() {
    this.form = this.fb.group({
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
    this.sharingService.showLoading̣̣(true);
    this.form.value.username = this.form.value.username.toLowerCase();
    const subLogin = this.authService.login(this.form.value).subscribe(
      (data: any) => {
        this.sharingService.showLoading̣̣(false);
        if (!data.code) {
          this.authService.loginSuccess(data);
          subLogin.unsubscribe();

          this.router.navigate(['/posts']);
        } else {
          this.apiError.checkError(data.code, this.form.value, 'login');

          subLogin.unsubscribe();
        }
      },
      err => {

        this.sharingService.showLoading̣̣(false);
        subLogin.unsubscribe();
      }
    );
  }

  onLoginLinkedIn() {
    const redirectUri = document.location.href;
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${environment.linkedinClientId}&redirect_uri=${redirectUri}`
    window.location.href = url;
    // this.linkedInService.login().subscribe({
    //   next: (state) => {
    //     if (state) {
    //       // this.router.navigate(['/posts']);
    //       const anonymousToken = this.linkedInService.getSdkIN().ENV.auth.anonymous_token;
    //       this.getAccessToken(anonymousToken);
    //     } else {
    //       this.dialog.open(AlertDialogComponent, {
    //         width: '300px',
    //         height: '200px',
    //         data: {
    //           title: 'Error',
    //           body: 'Login error with LinkedIn'
    //         }
    //       });
    //     }
    //   }
    // });
  }

  logoutLinkedIn() {
    this.linkedInService.logout().subscribe({
      next: () => {
        console.log('Logout emitted.');
      },
      complete: () => {
        console.log('Logout completed.');
      }
    });
  }

  private getAccessToken(authorizationToken: string) {
    const url = `https://www.linkedin.com/oauth/v2/accessToken`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(url, {
      headers,
      params: {
        grant_type: 'authorization_code',
        code: authorizationToken,
        redirect_uri: document.location.origin,
        client_id: environment.linkedinClientId,
        client_secret: environment.linkedingClientSecret
      }
    }).subscribe(result => {
      console.log(result);
    });
  }

  signUp() {
    this.checkIsStudent = true;
  }

  redirect(is_student: string) {
    localStorage.setItem('is_student', is_student);
    this.router.navigate(['/auth', 'register']);
  }

}
