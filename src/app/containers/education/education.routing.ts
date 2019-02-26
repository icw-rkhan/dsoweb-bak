import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';

import { EducationComponent } from './education.component';
import { EducationMainComponent } from './education-main/education-main.component';
import { EducationSearchComponent } from './education-search/education-search.component';
import { EducationSponsorComponent } from './education-sponsor/education-sponsor.component';
import { EducationCoursesComponent } from './education-courses/education-courses.component';
import { EducationBookmarksComponent } from './education-bookmarks/education-bookmarks.component';
import { EducationDownloadsComponent } from './education-downloads/education-downloads.component';

export const ROUTES: Routes = [
    {
        path: 'education',
        canActivate: [AuthGuard],
        component: EducationComponent,
        children: [
            {
                path: '',
                redirectTo: '/education/type',
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
                component: EducationSponsorComponent,
            },
            {
                path: 'search',
                component: EducationSearchComponent,
            },
            {
                path: 'bookmarks',
                component: EducationBookmarksComponent,
            },
            {
                path: 'downloads',
                component: EducationDownloadsComponent,
            },{
                path: 'courses',
                component: EducationCoursesComponent,
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class EducationRoutingModule { }
