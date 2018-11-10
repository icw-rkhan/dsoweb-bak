import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';

import { UniteDownloadComponent } from './unite-download/unite-download.component';
import { UniteBookmarkComponent } from './unite-bookmark/unite-bookmark.component';
import { UniteMainComponent } from './unite-main/unite-main.component';
import { UnitePageComponent } from './unite-page';
import { UniteViewComponent } from './unite-view/unite-view.component';
import { UniteDetailComponent } from './unite-detail/unite-detail.component';
import { UniteSearchComponent } from './unite-search/unite-search.component';
import { UniteShareComponent } from './unite-share/unite-share.component';
import { UniteThumbnailComponent } from './unite-thumbnail/unite-thumbnail.component';

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
                path: 'detail/:id',
                component: UniteDetailComponent
            },
            {
                path: 'bookmark',
                component: UniteBookmarkComponent
            },
            {
                path: 'search',
                component: UniteSearchComponent
            },
            {
                path: 'share',
                component: UniteShareComponent
            },
            {
                path: 'thumbnails',
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
