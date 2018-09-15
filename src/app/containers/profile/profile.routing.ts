import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { ProfileComponent } from './profile.component';

export const ROUTES: Routes = [
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class ProfileRoutingModule {
}
