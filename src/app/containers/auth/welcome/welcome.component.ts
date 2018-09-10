import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  checkIsStudent: boolean;
  signup: boolean;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  signUpOrLogin(signup: boolean = false) {
    this.signup = signup;
    this.checkIsStudent = true;
  }

  redirect(student: number) {
    const url = this.signup ? ['/auth', 'register'] : ['/auth', 'login'];
    this.router.navigate(url, { queryParams: { student: student } });
  }
}
