import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { DownloadsComponent } from './downloads.component';

import { downloadRoutes } from './download/download.routing';
import { filterRoutes } from './filter/filter.routing';
import { manageRoutes } from './manage/manage.routing';

const routes: Routes = [
    {
        path: '',
        component: DownloadsComponent,
        children: [
            ...downloadRoutes,
            ...filterRoutes,
            ...manageRoutes
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DownloadsComponent
    ],
})

export class DownloadsModule {}