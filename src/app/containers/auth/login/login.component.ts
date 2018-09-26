import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  isShowPassword: boolean;
  is_student: any;
  form: FormGroup;
  isUserAuthenticated: Observable<boolean>;
  isInitialized: Observable<boolean>;
  isUserAuthenticatedEmittedValue: boolean;
  isInitializedEmittedValue: boolean;

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private apiError: ApiErrorService,
              private sharingService: SharingService,
              private linkedInService: LinkedInService,
              private dialog: MatDialog,
              private http: HttpClient) {
    this.sharingService.showLoading̣̣(true);
    this.isShowPassword = false;
  }

  ngOnInit() {
    this.is_student = +localStorage.getItem('is_student');
    this.initForm();
    setTimeout(() => {
      this.sharingService.showLoading̣̣(false);
    });

    this.isUserAuthenticated = this.linkedInService.isUserAuthenticated$;
    this.isInitialized = this.linkedInService.isInitialized$;

    this.linkedInService.isUserAuthenticated$.subscribe({
      next: (state) => {
        this.isUserAuthenticatedEmittedValue = true;
      }
    });

    this.linkedInService.isInitialized$.subscribe({
      next: (state) => {
        this.isInitializedEmittedValue = true;
      }
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
    this.authService.login(this.form.value).subscribe(
      (data: any) => {
        this.sharingService.showLoading̣̣(false);
        if (!data.code) {
          this.authService.loginSuccess(data);
          if (this.is_student) {
            this.router.navigate(['/profile']);
          } else {
            this.router.navigate(['/posts']);
          }
        } else {
          this.apiError.checkError(data.code, this.form.value, 'login');
        }
      }
    );
  }

  onLoginLinkedIn() {
    this.linkedInService.login().subscribe({
      next: (state) => {
        if (state) {
          // this.router.navigate(['/posts']);
          const anonymousToken = this.linkedInService.getSdkIN().ENV.auth.anonymous_token;
          this.getAccessToken(anonymousToken);
        } else {
          this.dialog.open(AlertDialogComponent, {
            width: '300px',
            height: '200px',
            data: {
              title: 'Error',
              body: 'Login error with LinkedIn'
            }
          });
        }
      }
    });
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

    return this.http.post(url, {
      grant_type: 'authorization_code',
      code: authorizationToken,
      redirect_uri: 'http://localhost:4200/',
      client_id: environment.linkedinClientId,
      client_secret: environment.linkedingClientSecret
    }, {
      headers
    }).subscribe(result => {
      console.log(`Access Token: ${authorizationToken}`);
    });
  }

}
