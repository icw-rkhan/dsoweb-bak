import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { ShareModule } from '@ngx-share/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { SharedModule } from '../../shared/shared.module';
import { CareerRoutingModule } from './career.routing';

import { CareerComponent } from './career.component';
import { CareerMainComponent } from './career-main/career-main.component';
import { CareerSearchComponent } from './career-search/career-search.component';
import { CareerProfilesComponent } from './career-profiles/career-profiles.component';
import { CareerJobComponent } from './career-job/career-job.component';
import { CareerDetailComponent } from './career-detail/career-detail.component';
import { CareerReviewModule } from './career-review/career-review.module';
import { CareerAlertModule } from './career-alert/career-alert.module';
import { CareerProfilesModule } from './career-profiles/career-profiles.module';
import { CareerMapComponent } from './career-map/career-map.component';

@NgModule({
  imports: [
    SharedModule,
    CareerAlertModule,
    CareerReviewModule,
    CareerProfilesModule,
    CareerRoutingModule,
    ShareModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCVNk-yni0M9-jJxH9CPxuhupke3y8bPTE',
      libraries: ['places']
    }),
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 35,
      outerStrokeWidth: 5,
      innerStrokeWidth: 5,
      space: -5,
      outerStrokeColor: '#879aa8',
      innerStrokeColor: '#f1f1f1',
      animationDuration: 300,
    }),
  ],
  declarations: [
    CareerComponent,
    CareerMainComponent,
    CareerSearchComponent,
    CareerProfilesComponent,
    CareerJobComponent,
    CareerDetailComponent,
    CareerMapComponent]
})
export class CareerModule { }
