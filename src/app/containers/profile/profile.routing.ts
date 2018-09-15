import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';

export const ROUTES: Routes = [
  {
    path: 'profile',
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
