import {Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';

import { AuthService } from '../../../services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'dso-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent implements OnInit, AfterViewInit {

  checkIsStudent: boolean;
  signup: boolean;

  device: string;

  @ViewChild('container') container: ElementRef;
  @ViewChild('authContent1') authContent1: ElementRef;
  @ViewChild('authContent2') authContent2: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharingService: SharingService) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/profile']);
    }

    this.container.nativeElement.style.height = `${window.innerHeight}px`;
  }

  ngAfterViewInit() {
    this.device = this.sharingService.getMyDevice();
    if (this.device === 'desktop') {
      const element = this.authContent1.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
    }
  }

  signUpOrLogin(signup: boolean = false) {
    this.signup = signup;

    if (signup === false) {
      localStorage.setItem('is_student', '1');
      this.router.navigate(['/auth', 'login']);
    }
    this.checkIsStudent = true;

    setTimeout(() => {
      if (this.device === 'desktop' && this.authContent2) {
        const element = this.authContent2.nativeElement;
        element.style.maxWidth = environment.fixedWidth;
      }
    }, 0);
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
