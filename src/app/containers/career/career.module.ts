import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CareerRoutingModule } from './career.routing';

import { CareerComponent } from './career.component';
import { CareerMainComponent } from './career-main/career-main.component';
import { CareerSearchComponent } from './career-search/career-search.component';
import { CareerReviewComponent } from './career-review/career-review.component';
import { CareerProfilesComponent } from './career-profiles/career-profiles.component';
import { CareerOneselfComponent } from './career-oneself/career-oneself.component';

@NgModule({
  imports: [
    SharedModule,
    CareerRoutingModule
  ],
  declarations: [CareerComponent, CareerMainComponent, CareerSearchComponent, CareerReviewComponent, CareerProfilesComponent, CareerOneselfComponent]
})
export class CareerModule { }
