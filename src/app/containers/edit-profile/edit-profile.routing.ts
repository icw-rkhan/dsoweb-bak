import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { EditProfileComponent } from './edit-profile.component';

export const ROUTES: Routes = [
  {
    path: 'edit-profile',
    canActivate: [AuthGuard],
    component: EditProfileComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ]
})
export class EditProfileRoutingModule {
}
