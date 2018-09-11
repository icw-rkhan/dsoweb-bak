import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { DownloadsComponent } from './downloads.component';


const routes: Routes = [
    {
        path: '',
        component: DownloadsComponent,
        children: [
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