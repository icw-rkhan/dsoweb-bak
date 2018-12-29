import { NgModule } from '@angular/core';
import { ShareModule } from '@ngx-share/core';

import { SharedModule } from '../../shared/shared.module';
import { CareerRoutingModule } from './career.routing';

import { CareerComponent } from './career.component';
import { CareerMainComponent } from './career-main/career-main.component';
import { CareerSearchComponent } from './career-search/career-search.component';
import { CareerProfilesComponent } from './career-profiles/career-profiles.component';
import { CareerOneselfComponent } from './career-oneself/career-oneself.component';
import { CareerJobComponent } from './career-job/career-job.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { CareerReviewModule } from './career-review/career-review.module';
import { CareerAlertModule } from './career-alert/career-alert.module';

@NgModule({
  imports: [
    SharedModule,
    CareerAlertModule,
    CareerReviewModule,
    CareerRoutingModule,
    ShareModule.forRoot()
  ],
  declarations: [
    CareerComponent,
    CareerMainComponent,
    CareerSearchComponent,
    CareerProfilesComponent,
    CareerOneselfComponent,
    CareerJobComponent,
    CareerDetailComponent]
})
export class CareerModule { }
