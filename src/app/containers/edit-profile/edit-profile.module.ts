import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { EditProfileComponent } from './edit-profile.component';
import { ResidencySearchComponent } from './residency-search/residency-search.component';
import { EditProfileRoutingModule } from './edit-profile.routing';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ResidencyAddComponent } from './residency-add/residency-add.component';
import { ResidencyEditComponent } from './residency-edit/residency-edit.component';
import { EducationSearchComponent } from './education-search/education-search.component';
import { EducationEditComponent } from './education-edit/education-edit.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    EditProfileRoutingModule
  ],
  declarations: [
    EditProfileComponent,
    ResidencySearchComponent,
    ResidencyAddComponent,
    ResidencyEditComponent,
    EducationSearchComponent,
    EducationEditComponent
  ],
})
export class EditProfileModule { }
