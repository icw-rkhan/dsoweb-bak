import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-root',
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="push">
        <dso-sidebar></dso-sidebar>
      </mat-sidenav>
      <mat-sidenav-content class="sidenav-content">
        <dso-toolbar (toggleMenu)="sidenav.toggle()"></dso-toolbar>
        <ng-progress></ng-progress>
        <div class="main-container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .sidenav-content {
      display: flex;
      flex-direction: column;
    }
    .main-container {
      background: white;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  `]
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}
