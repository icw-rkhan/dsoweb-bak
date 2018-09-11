import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared';
import { DownloadComponent } from './download.component';

const routes: Routes = [
    {
        path: '',
        component: DownloadComponent
    },
]

@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        DownloadComponent
    ],
})

export class DownloadModule {}