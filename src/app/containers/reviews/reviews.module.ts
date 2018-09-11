import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { ReviewsComponent } from './reviews.component';

import { addRoutes } from './add/add.routing';
import { viewRoutes } from './view/view.routing';

const routes: Routes = [
    {
        path: '',
        component: ReviewsComponent,
        children: [
            ...addRoutes,
            ...viewRoutes
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