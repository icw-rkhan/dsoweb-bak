import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../../shared';
import { FilterComponent } from './filter.component';

const routes: Routes = [
    {
        path: '',
        component: FilterComponent
    },
]

@NgModule({
    imports: [
        SharedModule,
        FlexLayoutModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        FilterComponent
    ],
})

export class FilterModule {}