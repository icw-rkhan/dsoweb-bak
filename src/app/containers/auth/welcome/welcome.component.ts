import {Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { container } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'dso-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit {

  checkIsStudent: boolean;
  signup: boolean;

  @ViewChild('container') container: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profile']);
    }

    this.container.nativeElement.style.height = `${window.innerHeight}px`;
  }

  signUpOrLogin(signup: boolean = false) {
    this.signup = signup;

    if (signup === false) {
      localStorage.setItem('is_student', '1');
      this.router.navigate(['/auth', 'login']);
    }
    this.checkIsStudent = true;
  }

  redirect(is_student: string) {
    localStorage.setItem('is_student', is_student);
    const url = this.signup ? ['/auth', 'register'] : ['/auth', 'login'];
    this.router.navigate(url);
  }

  @HostListener('window:resize', [])
  onResize() {
    this.container.nativeElement.style.height = `${window.innerHeight}px`;
  }
}
