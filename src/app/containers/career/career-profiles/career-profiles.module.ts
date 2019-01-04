import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared';
import { CareerProfilesRoutingModule } from './career-profiles.routing';
import { CareerProfileListComponent } from './profile-list/profile-list.component';
import { CareerProfileDetailComponent } from './profile-detail/profile-detail.component';

@NgModule({
  imports: [
    SharedModule,
    CareerProfilesRoutingModule
  ],
  declarations: [
    CareerProfileListComponent,
    CareerProfileDetailComponent
  ]
})
export class CareerProfilesModule { }
