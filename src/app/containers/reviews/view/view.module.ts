import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared';
import { ViewComponent } from './view.component';

const routes: Routes = [
    {
        path: '',
        component: ViewComponent
    },
]

@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ViewComponent
    ],
})

export class ViewModule {}