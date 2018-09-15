import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { EditProfileComponent } from './edit-profile.component';

export const ROUTES: Routes = [
  {
    path: 'edit-profile',
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
