import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent
  ],
})
export class ProfileModule { }
