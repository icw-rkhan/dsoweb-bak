import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';

import { EducationComponent } from './education.component';
import { EducationMainComponent } from './education-main/education-main.component';

export const ROUTES: Routes = [
    {
        path: 'education',
        canActivate: [AuthGuard],
        component: EducationComponent,
        children: [
            {
                path: '',
                redirectTo: '/posts/type',
                pathMatch: 'full'
            },
            {
                path: 'type',
                component: EducationMainComponent,
            },

            {
                path: 'type/:id',
                component: EducationMainComponent,
            },
            {
                path: 'sponsor/:sponsorId',
                component: EducationMainComponent,
            },
            {
                path: 'sponsor/:sponsorId/:id',
                component: EducationMainComponent,
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class EducationRoutingModule { }
