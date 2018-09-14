import { Routes } from '@angular/router';

export const welcomeRoutes: Routes = [
  {
    path: 'welcome',
    loadChildren: 'src/app/containers/auth/welcome/welcome.module#WelcomeModule'
  }
];
