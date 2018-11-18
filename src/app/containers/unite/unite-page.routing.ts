import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';

import { UniteDownloadComponent } from './unite-download/unite-download.component';
import { UniteBookmarkComponent } from './unite-bookmark/unite-bookmark.component';
import { UniteMainComponent } from './unite-main/unite-main.component';
import { UnitePageComponent } from './unite-page';
import { UniteViewComponent } from './unite-view/unite-view.component';
import { UniteDetailComponent } from './unite-detail/unite-detail.component';
import { UniteThumbnailComponent } from './unite-thumbnail/unite-thumbnail.component';
import { UniteSearchComponent } from './unite-search/unite-search.component';
import { UniteIssueComponent } from './unite-issue/unite-issue.component';

export const ROUTES: Routes = [
    {
        path: 'unite',
        canActivate: [AuthGuard],
        component: UnitePageComponent,
        children: [
            {
                path: '',
                component: UniteMainComponent,
            },
            {
                path: 'all',
                component: UniteMainComponent,
            },
            {
                path: 'type/downloaded',
                component: UniteMainComponent,
            },
            {
                path: 'download/:id',
                component: UniteDownloadComponent,
            },
            {
                path: 'view/:id',
                component: UniteViewComponent,
            },
            {
                path: 'issue/:id',
                component: UniteIssueComponent,
            },
            {
                path: 'search/:id',
                component: UniteSearchComponent
            },
            {
                path: 'detail/:issueId/:id',
                component: UniteDetailComponent
            },
            {
                path: 'bookmark/:id',
                component: UniteBookmarkComponent
            },
            {
                path: 'thumbnail/:id',
                component: UniteThumbnailComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES)
    ]
})
export class UniteRoutingModule { }
