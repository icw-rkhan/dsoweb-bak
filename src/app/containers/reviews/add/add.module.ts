import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared';
import { AddComponent } from './add.component';

const routes: Routes = [
    {
        path: '',
        component: AddComponent
    },
]

@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AddComponent
    ],
})

export class AddModule {}