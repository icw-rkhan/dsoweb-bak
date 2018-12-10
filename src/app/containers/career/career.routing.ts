import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';
import { CareerComponent } from './career.component';
import { CareerMainComponent } from './career-main/career-main.component';
import { CareerSearchComponent } from './career-search/career-search.component';
import { CareerOneselfComponent } from './career-oneself/career-oneself.component';
import { CareerReviewComponent } from './career-review/career-review.component';
import { CareerProfilesComponent } from './career-profiles/career-profiles.component';
import { CareerJobComponent } from './career-job/career-job.component';
import { CareerAlertComponent } from './career-alert/career-alert.component';

export const ROUTES: Routes = [
    {
        path: 'career',
        canActivate: [AuthGuard],
        component: CareerComponent,
        children: [
            {
                path: '',
                component: CareerMainComponent,
            },
            {
                path: 'search',
                component: CareerSearchComponent,
            },
            {
                path: 'oneself',
                component: CareerOneselfComponent,
            },
            {
                path: 'review',
                component: CareerReviewComponent,
            },
            {
                path: 'profile',
                component: CareerProfilesComponent
            },
            {
                path: 'myjob',
                component: CareerJobComponent
            },
            {
                path: 'alert',
                component: CareerAlertComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class CareerRoutingModule { }
