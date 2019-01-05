import { NgModule } from '@angular/core';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { SharedModule } from '../../../shared';
import { CareerProfilesRoutingModule } from './career-profiles.routing';
import { CareerProfileListComponent } from './profile-list/profile-list.component';
import { CareerProfileDetailComponent } from './profile-detail/profile-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CareerProfilesRoutingModule,
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
    CareerProfileListComponent,
    CareerProfileDetailComponent
  ]
})
export class CareerProfilesModule { }
