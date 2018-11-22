import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../../services/auth/auth-guard';

import { UnitePageComponent } from './unite-page';
import { UniteMainComponent } from './unite-main/unite-main.component';
import { UniteViewComponent } from './unite-view/unite-view.component';
import { UniteDetailComponent } from './unite-detail/unite-detail.component';
import { UniteBookmarkComponent } from './unite-bookmark/unite-bookmark.component';
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
                path: 'view/:id',
                component: UniteViewComponent,
            },
            {
                path: 'detail/:id',
                component: UniteDetailComponent
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
