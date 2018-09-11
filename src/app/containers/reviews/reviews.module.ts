import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { ReviewsComponent } from './reviews.component';

import { addRoutes } from './add/add.routing';

const routes: Routes = [
    {
        path: '',
        component: ReviewsComponent,
        children: [
            ...addRoutes
        ]
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ReviewsComponent
    ],
})

export class ReviewsModule {}