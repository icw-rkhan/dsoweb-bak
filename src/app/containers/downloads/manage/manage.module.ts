import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared';
import { ManageComponent } from './manage.component';

const routes: Routes = [
    {
        path: '',
        component: ManageComponent
    },
]

@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ManageComponent
    ],
})

export class ManageModule {}