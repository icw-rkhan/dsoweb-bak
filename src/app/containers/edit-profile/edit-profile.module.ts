import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { EditProfileComponent } from './edit-profile.component';
import { EditProfileRoutingModule } from './edit-profile.routing';

@NgModule({
  imports: [
    SharedModule,
    EditProfileRoutingModule
  ],
  declarations: [
    EditProfileComponent
  ],
})
export class EditProfileModule { }
