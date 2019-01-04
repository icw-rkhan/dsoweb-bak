import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../../services/auth/auth-guard';
import { CareerProfilesComponent } from './career-profiles.component';
import { CareerProfileListComponent } from './profile-list/profile-list.component';
import { CareerProfileDetailComponent } from './profile-detail/profile-detail.component';

export const ROUTES: Routes = [
    {
        path: 'career/dso-profile',
        canActivate: [AuthGuard],
        component: CareerProfilesComponent,
        children: [
            {
                path: '',
                component: CareerProfileListComponent
            },
            {
                path: 'detail/:id',
                component: CareerProfileDetailComponent
            },
        ]
    },
    {
        path: 'career/dso-profile/:type',
        canActivate: [AuthGuard],
        component: CareerProfilesComponent,
        children: [
            {
                path: '',
                component: CareerProfileListComponent
            },
        ]
    },
];

@NgModule({
  imports: [
      RouterModule.forChild(ROUTES)
  ]
})

export class CareerProfilesRoutingModule { }
