import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../../shared';
import { ReviewsRoutingModule } from './reviews.routing';

import { ReviewsComponent } from './reviews.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
 

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        SharedModule,
        ReviewsRoutingModule,
    ],
    declarations: [
        ReviewsComponent,
        AddComponent,
        ViewComponent
    ],
})

export class ReviewsModule {}